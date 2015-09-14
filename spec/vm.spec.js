var p = require("../src/lang/parser");
var c = require("../src/lang/compiler");
var v = require("../src/lang/vm");

var util = require("../src/util");

describe("vm", function() {
  describe("top level", function() {
    it("should return undefined from an empty program", function() {
      var code = "";
      expect(v(code, c(p(code))).getIn(["stack", -1]).v).toBeUndefined();
    });

    it("should return 1 from a program containing just 1", function() {
      var code = "1";
      expect(v(code, c(p(code))).getIn(["stack", -1]).v).toEqual(1);
    });

    it("should return 2 from a program containing 1 and 2", function() {
      var code = "1\n2";
      expect(v(code, c(p(code))).getIn(["stack", -1]).v).toEqual(2);
    });
  });

  describe("lambda invocation", function() {
    it("should return undefined from invoked empty lambda", function() {
      var code = "{}()";
      expect(v(code, c(p(code))).getIn(["stack", -1]).v).toBeUndefined();
    });

    it("should be able to pass args to lambda", function() {
      var code = "{ ?a ?b \n a }(1 2)";
      expect(v(code, c(p(code))).getIn(["stack", -1]).v).toEqual(1);

      var code = "{ ?a ?b \n b }(1 2)";
      expect(v(code, c(p(code))).getIn(["stack", -1]).v).toEqual(2);
    });

    it("should be able to access closed over var", function() {
      var code = "a: 1 \n { a }()";
      expect(v(code, c(p(code))).getIn(["stack", -1]).v).toEqual(1);
    });

    it("should use new value for closed over var that changes after closure creation", function() {
      var code = "a: 1 \n b:{ a } \n a: 2 \n b()";
      expect(v(code, c(p(code))).getIn(["stack", -1]).v).toEqual(2);
    });
  });

  describe("uninvoked functions in a do", function() {
    it("should complain about returned uninvoked lambda/builtin", function() {
      var code = "a: {}\n a";
      expect(v(code, c(p(code))).get("exception").message)
        .toEqual("This is an action. Type a() to run it.");

      var code = "print";
      expect(v(code, c(p(code))).get("exception").message)
        .toEqual("This is an action. Type print() to run it.");
    });

    it("should complain about uninvoked lambda/builtin part way through do", function() {
      var code = "a: {}\n a \n 1";
      expect(v(code, c(p(code))).get("exception").message)
        .toEqual("This is an action. Type a() to run it.");

      var code = "print \n 1";
      expect(v(code, c(p(code))).get("exception").message)
        .toEqual("This is an action. Type print() to run it.");
    });
  });

  describe("builtin function invocation", function() {
    it("should run built in function with args", function() {
      var code = "print(1)";
      expect(v(code, c(p(code))).getIn(["stack", -1]).v).toEqual("1\n");
    });
  });

  describe("label lookup", function() {
    it("should get label assigned in current scope", function() {
      var code = "a: 1 \n a";
      expect(v(code, c(p(code))).getIn(["stack", -1]).v).toEqual(1);
    });

    it("should reassign label reassigned in current scope", function() {
      var code = "a: 1 \n a: 2\n a";
      expect(v(code, c(p(code))).getIn(["stack", -1]).v).toEqual(2);
    });

    it("should get label assigned inside lambda", function() {
      var code = "{ a: 1 \n a }()";
      expect(v(code, c(p(code))).getIn(["stack", -1]).v).toEqual(1);
    });

    it("should get label assigned in higher scope", function() {
      var code = "a: 1 \n { a }()";
      expect(v(code, c(p(code))).getIn(["stack", -1]).v).toEqual(1);
    });

    it("should change value in inner scope", function() {
      var code = "a: 1 \n { a: 2 \n a }()";
      expect(v(code, c(p(code))).getIn(["stack", -1]).v).toEqual(2);
    });

    it("should change value in outer scope if changed in inner scope", function() {
      var code = "a: 1 \n { a: 2 }() \n a";
      expect(v(code, c(p(code))).getIn(["stack", -1]).v).toEqual(2);
    });

    it("should allow independent outer scope val if created after inner scope val", function() {
      var code = "{ a: 2 }() \n a: 1 \n a";
      expect(v(code, c(p(code))).getIn(["stack", -1]).v).toEqual(1);
    });
  });

  describe("assignment", function() {
    it("should assign literal to env at top level", function() {
      var code = "a: 1 \n a";
      expect(v(code, c(p(code))).getIn(["stack", -1]).v).toEqual(1);
    });

    it("should assign lambda to env at top level", function() {
      var code = "a: { 1 }";
      var ps = v.initProgramState(code, c(p(code)));
      ps = v.step(ps);
      ps = v.step(ps);

      // console.log(ps.getIn(["scopes", ps.getIn(["callStack", 0, "scope"])]));
      var binding = ps.getIn(["scopes", ps.getIn(["callStack", 0, "scope"]), "bindings", "a"]);
      expect(util.stripBc(binding.bc)).toEqual([["push", 1],
                                                ["return"]]);
      expect(binding.parameters).toBeDefined();
    });
  });

  describe("forever", function() {
    it("should run for a long time", function() {
      var code = "n: 1 \n forever { n: add(n 1) \n if equal(n 100) { blowup() } }";
      expect(v(code, c(p(code))).get("exception").message)
        .toEqual("Never heard of blowup");
    });

    it("shouldn't leave return stack val to be hoovered up by next forever invoke", function() {
      var code = "stop: false \n forever { if stop { blowup } else { stop: true } \n 1 }";
      expect(v(code, c(p(code))).get("exception").message).toEqual("Never heard of blowup");
    });

    it("regression: calling fn before assignment should not abort execution", function() {
      // the wrong value was getting popped off the stack during the assignment
      // (the first stack val, rather than the top) which meant the assignment
      // was failing

      // x doesn't increase in this test

      var code = 'x: 0 \n forever { \n print("hi") \n x: 1 \n print(x) }';

      var ps = v.initProgramState(code, c(p(code)));

      for (var i = 0; i < 21; i++) {
        ps = v.step(ps);
      }

      expect(ps.get("currentInstruction")[0]).toEqual("return");
      expect(ps.getIn(["scopes",
                       ps.getIn(["callStack", 0, "scope"]),
                       "bindings",
                       "x"])).toEqual(1);

      for (var i = 0; i < 18; i++) {
        ps = v.step(ps);
      }

      expect(ps.get("currentInstruction")[0]).toEqual("return");
      expect(ps.getIn(["scopes",
                       ps.getIn(["callStack", 0, "scope"]),
                       "bindings",
                       "x"])).toEqual(1);
    });

    it("regression: calling fn before assignment should not abort execution", function() {
      // the wrong value was getting popped off the stack during the assignment
      // (the first stack val, rather than the top) which meant the assignment
      // was failing

      // x goes up in this test

      var code = 'x: 0 \n forever { \n print("hi") \n x: add(x 1) \n print(x) }';

      var ps = v.initProgramState(code, c(p(code)));

      for (var i = 0; i < 25; i++) {
        ps = v.step(ps);
      }

      expect(ps.get("currentInstruction")[0]).toEqual("return");
      expect(ps.getIn(["scopes",
                       ps.getIn(["callStack", 0, "scope"]),
                       "bindings",
                       "x"])).toEqual(1);


      for (var i = 0; i < 22; i++) {
        ps = v.step(ps);
      }

      expect(ps.get("currentInstruction")[0]).toEqual("return");
      expect(ps.getIn(["scopes",
                       ps.getIn(["callStack", 0, "scope"]),
                       "bindings",
                       "x"])).toEqual(2);
    });
  });

  describe("conditionals", function() {
    it("should return first branch if true", function() {
      var code = "if true { 1 }";
      expect(v(code, c(p(code))).getIn(["stack", -1]).v).toEqual(1);
    });

    it("should return else if if is true", function() {
      var code = "if false { 1 } else { 2 }";
      expect(v(code, c(p(code))).getIn(["stack", -1]).v).toEqual(2);
    });

    it("should return undefined if false and no second branch", function() {
      var code = "if false { 1 }";
      expect(v(code, c(p(code))).getIn(["stack", -1])).toBeUndefined();
    });

    it("should allow s-expression in branch", function() {
      var code = 'if true { print("hi") }';
      expect(v(code, c(p(code))).getIn(["stack", -1]).v).toEqual("hi\n");
    });

    it("should return else if branch if condition true and if condition false", function() {
      var code = "if false { 1 } elseif true { 2 }";
      expect(v(code, c(p(code))).getIn(["stack", -1]).v).toEqual(2);
    });

    it("should return if branch if condition true and else if condition true", function() {
      var code = "if true { 1 } elseif true { 2 }";
      expect(v(code, c(p(code))).getIn(["stack", -1]).v).toEqual(1);
    });

    it("should return else branch if if and if else conditions false", function() {
      var code = "if false { 1 } elseif false { 2 } else { 3 }";
      expect(v(code, c(p(code))).getIn(["stack", -1]).v).toEqual(3);
    });

    it("should return second else branch if true and prev conditions false", function() {
      var code = "if false { 1 } elseif false { 2 } elseif true { 3 }";
      expect(v(code, c(p(code))).getIn(["stack", -1]).v).toEqual(3);
    });

    it("should not return else if previous condition is true", function() {
      var code = "if false { 1 } elseif true { 2 } else { 3 }";
      expect(v(code, c(p(code))).getIn(["stack", -1]).v).toEqual(2);
    });

    it("should be able to run nested conditionals", function() {
      var code = "if true { if true { 1 } else { 2 } }";
      expect(v(code, c(p(code))).getIn(["stack", -1]).v).toEqual(1);

      var code = "if true { if false { 1 } else { 2 } }";
      expect(v(code, c(p(code))).getIn(["stack", -1]).v).toEqual(2);

      var code = "if false { if false { 1 } else { 2 } } else { 3 }";
      expect(v(code, c(p(code))).getIn(["stack", -1]).v).toEqual(3);
    });
  });

  describe("arity", function() {
    describe("lambda", function() {
      it("should not complain when right number of args passed", function() {
        var code = 'none: { 1 } \n none()';
        expect(v(code, c(p(code))).getIn(["stack", -1]).v).toEqual(1);

        var code = 'one: { ?a a } \n one("a")';
        expect(v(code, c(p(code))).getIn(["stack", -1]).v).toEqual("a");

        var code = 'many: { ?a ?b ?c ?d ?e ?f ?g ?h h } \n many("a" "b" "c" "d" "e" "f" "g" "h")';
        expect(v(code, c(p(code))).getIn(["stack", -1]).v).toEqual("h");
      });

      it("should complain if passed too few args", function() {
        var code = 'one: { ?a } \n one()';
        expect(v(code, c(p(code))).get("exception").message).toEqual('Missing a "a"');

        var code = 'one: { ?a ?b ?c } \n one("a")';
        expect(v(code, c(p(code))).get("exception").message).toEqual('Missing a "b"');
      });

      it("should mark end of arg list if passed too few args", function() {
        var code = 'one: { ?a ?b ?c } \n one("a")';
        var ps = v(code, c(p(code)))
        var e = ps.get("exception");
        expect(e.s).toEqual(27);
        expect(e.e).toEqual(27);
      });

      it("should mark all extra args if passed too many args", function() {
        var code = 'one: { ?a ?b } \n one("a" "b" "c" "d")';
        var ps = v(code, c(p(code)))
        var e = ps.get("exception");
        expect(e.s).toEqual(29);
        expect(e.e).toEqual(36);
      });

      it("should complain if fn passed too many args", function() {
        var code = 'one: { } \n one(1)';
        expect(v(code, c(p(code))).get("exception").message).toEqual('"one" does not need this');

        var code = 'one: { ?a } \n one(1 2 3)';
        expect(v(code, c(p(code))).get("exception").message).toEqual('"one" does not need these');
      });
    });

    describe("builtin", function() {
      it("should complain when too many args passed", function() {
        var code = 'add(1 2 3 4)';
        expect(v(code, c(p(code))).get("exception").message).toEqual('"add" does not need these');
      });

      it("should mark end of arg list when arg missing", function() {
        var code = 'add()';
        var ps = v(code, c(p(code)));
        var e = ps.get("exception");
        expect(e.s).toEqual(4);
        expect(e.e).toEqual(4);
      });

      it("should mark all extra args when too many passed", function() {
        var code = 'add(1 2 3 4)';
        var ps = v(code, c(p(code)))
        var e = ps.get("exception");
        expect(e.s).toEqual(8);
        expect(e.e).toEqual(11);
      });
    });
  });
});
