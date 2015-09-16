var _ = require("underscore");
var im = require("immutable");

var util = require("../util");
var standardLibrary = require("./standard-library");
var setupEnv = require("../env");
var addScope = require("./scope");
var langUtil = require("./lang-util");
var checkArgs = require("./check-args");

function stepPush(ins, p) {
  // TODO: when have lists and objects in lang, will need to detect them and use immutablejs

  return p.set("stack", p.get("stack").unshift({ v: ins[1], ast: ins.ast }));
};

function stepPushLambda(ins, p) {
  var lambda = ins[1];

  // once created, will have this id for rest of program, so done need
  // immutable data
  lambda.closureScope = currentCallFrame(p).get("scope"); // an id into the p.scopes object

  return p.set("stack", p.get("stack").unshift({ v: lambda, ast: ins.ast }));
};

function stepPop(ins, p) {
  throwIfUninvokedStackFunctions(p);
  return p.set("stack", p.get("stack").shift());
};

function stepReturn(ins, p) {
  throwIfUninvokedStackFunctions(p);
  var callStack = p.get("callStack");
  return p
    .deleteIn(["scopes", callStack.last().get("scope")])
    .set("callStack", callStack.pop());
};

var ARG_START = ["ARG_START"];
function stepArgStart(ins, p) {
  return p.set("stack", p.get("stack").push({ v: ARG_START }));
};

function stepGetEnv(ins, p) {
  var scopes = p.get("scopes");
  var currentScope = currentCallFrame(p).get("scope");
  var key = ins[1];

  if (!addScope.hasScopedBinding(scopes, currentScope, key)) {
    throw new langUtil.RuntimeError("Never heard of " + ins[1], ins.ast);
  } else {
    var value = addScope.getScopedBinding(scopes, currentScope, key);
    return p.set("stack", p.get("stack").push({ v: value, ast: ins.ast }));
  }
};

function stepSetEnv(ins, p) {
  var v = p.get("stack").peek().v;
  var currentScopeId = currentCallFrame(p).get("scope");
  return p.set("stack", p.get("stack").shift())
    .set("scopes",
         addScope.setGlobalBinding(p.get("scopes"), currentScopeId, ins[1], v));
};

function stepInvoke(ins, p, noSideEffects) {
  var fnStackItem = p.get("stack").peek();
  p = p.set("stack", p.get("stack").shift());
  var fnObj = fnStackItem.v;

  if (langUtil.isFunction(fnObj)) {
    var pAndArgContainers = popTopArgsOnStack(p);
    var p = pAndArgContainers[0];
    var argContainers = pAndArgContainers[1];
    var argValues = argContainers.map(function(c) { return c.v; });

    if (langUtil.isLambda(fnObj)) {
      checkArgs.checkLambdaArity(fnStackItem, argContainers, ins.ast);
      p = addScope(p, im.Map(_.object(fnObj.parameters, argValues)), fnObj.closureScope);

      var tailIndex = tailCallIndex(p.get("callStack"), fnObj);
      if (tailIndex !== undefined) { // if tail position exprs all way to recursive call then tco
        return p
          .set("callStack", p.get("callStack").slice(0, tailIndex + 1))
          .setIn(["callStack", -1, "scope"], addScope.lastScopeId(p))
          .setIn(["callStack", -1, "bcPointer"], 0);
      } else {
        return pushCallFrame(p, fnObj.bc, 0, addScope.lastScopeId(p), ins[2]);
      }
    } else if (langUtil.isBuiltin(fnObj)) {
      if (noSideEffects !== langUtil.NO_SIDE_EFFECTS ||
          !langUtil.isSideEffecting(fnObj)) {

        if (langUtil.isInternalStateFn(fnObj)) {
          var fn = fnObj.get("fn");
          var meta = new langUtil.Meta(ins.ast, fnObj.get("state"));
          var result = fn.apply(null, [meta].concat(argValues));
          var fnName = fnStackItem.ast.c;

          return p.set("stack", p.get("stack").unshift({ v: result.v, ast: ins.ast }))
            .setIn(["scopes", 0, "bindings", fnName, "state"], result.state);
        } else {
          var fn = fnObj;
          var meta = new langUtil.Meta(ins.ast);
          var result = fn.apply(null, [meta].concat(argValues));
          return p.set("stack", p.get("stack").unshift({ v: result, ast: ins.ast }));
        }
      } else {
        return p;
      }
    }
  } else {
    throw new langUtil.RuntimeError("This is not an action", fnStackItem.ast);
  }
};

function tailCallIndex(callStack, fn) {
  var recursiveIndex = previousRecursionCallFrameIndex(callStack, fn);
  if (recursiveIndex !== undefined) {
    var calls = callStack.slice(recursiveIndex);
    if (calls.size === calls.filter(function(c) { return c.get("tail") === true; }).size) {
      return recursiveIndex;
    }
  }
};

function previousRecursionCallFrameIndex(callStack, fn) {
  for (var i = callStack.size - 1; i >= 0; i--) {
    if (callStack.getIn([i, "bc"]) === fn.bc) {
      return i;
    }
  }
};

function stepIfNotTrueJump(ins, p) {
  var boolToTest = p.get("stack").peek().v;
  p = p.set("stack", p.get("stack").shift());

  if (boolToTest !== true) {
    return p.updateIn(["callStack", -1, "bcPointer"],
                      function(bcPointer) { return bcPointer + ins[1] });
  } else {
    return p;
  }
};

function stepJump(ins, p) {
  return p.updateIn(["callStack", -1, "bcPointer"],
                    function(bcPointer) { return bcPointer + ins[1] });
};

function step(p, noSideEffects) {
  var currentFrame = currentCallFrame(p);
  if (currentFrame === undefined) {
    return p;
  } else {
    var bcPointer = currentFrame.get("bcPointer");
    var ins = currentFrame.get("bc")[bcPointer];

    p = p.setIn(["callStack", -1, "bcPointer"], bcPointer + 1)
      .set("currentInstruction", ins);

    try {
      if (ins[0] === "push") {
        return stepPush(ins, p);
      } else if (ins[0] === "push_lambda") {
        return stepPushLambda(ins, p);
      } else if (ins[0] === "pop") {
        return stepPop(ins, p);
      } else if (ins[0] === "get_env") {
        return stepGetEnv(ins, p);
      } else if (ins[0] === "set_env") {
        return stepSetEnv(ins, p);
      } else if (ins[0] === "invoke") {
        return stepInvoke(ins, p, noSideEffects);
      } else if (ins[0] === "if_not_true_jump") {
        return stepIfNotTrueJump(ins, p);
      } else if (ins[0] === "jump") {
        return stepJump(ins, p);
      } else if (ins[0] === "return") {
        return stepReturn(ins, p);
      } else if (ins[0] === "arg_start") {
        return stepArgStart(ins, p);
      } else {
        throw new langUtil.RuntimeError("I don't know how to run this instruction: " + ins,
                                        ins.ast);
      }
    } catch (e) {
      if (e instanceof langUtil.RuntimeError) {
        p = p.set("exception", e);
      } else {
        maybePrintError(e);
      }

      return p;
    }
  }
};

function maybePrintError(e) {
  if (typeof(window) === "undefined" || window.location.href.indexOf("localhost:") !== -1) {
    console.log(e.stack);
  }
};

function complete(p) {
  while (!isComplete(p) && !isCrashed(p)) {
    p = step(p);
  }

  return p;
};

function currentCallFrame(p) {
  return p.get("callStack").last();
};

function isComplete(p) {
  var callFrame = currentCallFrame(p);
  return callFrame === undefined ||
    callFrame.get("bcPointer") === callFrame.get("bc").length;
};

function isCrashed(p) {
  return p.get("exception") !== undefined;
};

function initProgramState(code, bc, builtinBindings) {
  builtinBindings = builtinBindings || standardLibrary();

  var bcPointer = 0;
  var topScopeId = 1;

  var p = im.Map({
    exception: undefined,
    code: code,
    currentInstruction: undefined,
    stack: im.Stack(),
    callStack: im.List(), // can't be a stack because too much editing of head
    scopes: im.List()
  });

  p = addScope(p, builtinBindings);
  p = addScope(p, im.Map(), 0);
  p = pushCallFrame(p, bc, bcPointer, topScopeId);
  return p;
};

function pushCallFrame(p, bc, bcPointer, scopeId, tail) {
  return p.set("callStack",
               p.get("callStack").push(im.Map({
                 bc: bc, bcPointer: bcPointer, scope: scopeId, tail: tail
               })));
};

function initProgramStateAndComplete(code, bc, env) {
  return complete(initProgramState(code, bc, env));
};

function throwIfUninvokedStackFunctions(p) {
  var unrunFn = p.get("stack").find(o => langUtil.isFunction(o.v));
  if (unrunFn !== undefined) {
    throw new langUtil.RuntimeError("This is an action. Type " +
                                    p.get("code").slice(unrunFn.ast.s, unrunFn.ast.e) +
                                    "() to run it.",
                                    unrunFn.ast);
  }
};

function popTopArgsOnStack(p) {
  var stack = p.get("stack");

  var args = [];
  var element = stack.peek();
  while (element !== undefined && element.v !== ARG_START) {
    stack = stack.shift();
    args.push(element);
    element = stack.peek();
  }

  stack = stack.shift();

  return [
    p.set("stack", stack),
    args.reverse()
  ];
};

initProgramStateAndComplete.initProgramStateAndComplete = initProgramStateAndComplete;
initProgramStateAndComplete.initProgramState = initProgramState;
initProgramStateAndComplete.step = step;
initProgramStateAndComplete.complete = complete;
initProgramStateAndComplete.isComplete = isComplete;
initProgramStateAndComplete.isCrashed = isCrashed;

module.exports = initProgramStateAndComplete;
