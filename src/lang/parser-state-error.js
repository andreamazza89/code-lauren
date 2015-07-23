var peg = require("pegjs");
var fs = require("fs");
var _ = require("underscore");

var examples = JSON.parse(fs.readFileSync(__dirname + "/examples.json", "utf8")).examples;

var pegParseTrace = peg.buildParser(fs.readFileSync(__dirname + "/grammar.pegjs", "utf8"),
                                    { cache: true, trace: true }).parse;

var pegParseNoTrace = peg.buildParser(fs.readFileSync(__dirname + "/grammar.pegjs", "utf8"),
                                      { cache: true }).parse;

function parserStateError(code) {
  for (var i = 0; i < examples.length; i++) {
    if (isMatchingExample(examples[i], code)) {
      return examples[i].message;
    }
  }
};

function isMatchingExample(example, code) {
  if (!isMatchingNextInput(example, code)) {
    return false;
  } else {
    var codeStack = codeToFailedParseStack(code);
    if (example.stack.length > codeStack.length) {
      return false;
    } else {
      return _.isEqual(example.stack, _.last(codeStack, example.stack.length));
    }
  }
};

function isMatchingNextInput(example, code) {
  return nextInput(code).match(example.nextInput) !== null;
};

function nextInput(code) {
  try {
    pegParseNoTrace(code);
  } catch (e) {
    return code.slice(e.offset);
  }

  throw "Looking for failed token but code parsed";
};

function eventsToTree(evs, node) {
  function createNode(ev, parent) {
    return { rule: ev.rule, i: ev.offset, type: ev.type, parent: parent, children: [] };
  };

  if (evs.length === 0) {
    return node;
  } else if (node === undefined) {
    node = createNode({ rule: "HOLDER", offset: "-", type: "-" });
    eventsToTree(evs, node);
    return node;
  } else if (evs[0].type === "rule.enter") {
    var child = createNode(evs[0], node);
    node.children.push(child);
    return eventsToTree(evs.slice(1), child);
  } else if (evs[0].type === "rule.fail" || evs[0].type === "rule.match") {
    node.parent.children.push(createNode(evs[0], node));
    return eventsToTree(evs.slice(1), node.parent);
  }
};

function codeToFailedParseStack(code) {
  var eventGatherer = createEventGathererTracer();
  try {
    pegParseTrace(code, { tracer: eventGatherer });
  } catch(e) {
    var tree = eventsToTree(eventGatherer.getEvents());
    var match = deepestMatch(tree);

    // start from parent cause match is a rule.match with rule.enter as its parent
    return _.pluck(parentChain(match.parent), "rule");
  }
};

function parentChain(node) {
  if (node === undefined) {
    return [];
  } else {
    return parentChain(node.parent).concat(node);
  }
};

function deepestMatch(node, deepest) {
  for (var i = 0; i < node.children.length; i++) {
    if (node.type === "rule.enter" &&
        (deepest === undefined || node.children[i].i > deepest.i)) {
      deepest = node.children[i];
    }

    deepest = deepestMatch(node.children[i], deepest);
  }

  return deepest;
};

function eventTypeSymbol(ev) {
  if (ev.type === "rule.enter") {
    return ">";
  } else if (ev.type === "rule.fail") {
    return "x";
  } else if (ev.type === "rule.match") {
    return "<";
  } else {
    return "-";
  }
};

function printTree(node, depth) {
  if (depth === undefined) {
    return printTree(node, 1);
  } else {
    console.log(Array(depth).join(" "), eventTypeSymbol(node), node.rule, node.i);
    for (var i = 0; i < node.children.length; i++) {
      printTree(node.children[i], depth + 1);
    }
  }
};

function createEventGathererTracer() {
  return {
    events: [],

    trace: function(ev) {
      this.events.push(ev);
    },

    getEvents: function() {
      return this.events;
    }
  };
};

parserStateError.codeToFailedParseStack = codeToFailedParseStack;
module.exports = parserStateError;
