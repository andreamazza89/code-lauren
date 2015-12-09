var _ = require("underscore");
var langUtil = require("./lang-util");
var util = require("../util");
var chk = require("./check-args");
var im = require("immutable");

var createStandardLibrary = module.exports = function () {
  var lib = im.Map({
    add: function(meta, a, b) {
      chk(arguments,
          chk.num("a number to add to"),
          chk.num("a number to add"));
      return parseFloat(a) + parseFloat(b);
    },

    subtract: function(meta, a, b) {
      chk(arguments,
          chk.num("a number to subtract from"),
          chk.num("a number to subtract"));

      return parseFloat(a) - parseFloat(b);
    },

    multiply: function(meta, a, b) {
      chk(arguments,
          chk.num("a number to multiply"),
          chk.num("a number to multiply by"));

      return parseFloat(a) * parseFloat(b);
    },

    divide: function(meta, a, b) {
      chk(arguments,
          chk.num("a number to divide"),
          chk.num("a number to divide by"));

      return parseFloat(a) / parseFloat(b);
    },

    positive: function(meta, a) {
      chk(arguments,
          chk.num("a number make positive"));

      return Math.abs(parseFloat(a));
    },

    distance: function(meta, x1, y1, x2, y2) {
      chk(arguments,
          chk.num("a distance from the left for the first point"),
          chk.num("a distance from the top for the first point"),
          chk.num("a distance from the left for the second point"),
          chk.num("a distance from the top for the second point"));

      x1 = parseFloat(x1);
      y1 = parseFloat(y1);
      x2 = parseFloat(x2);
      y2 = parseFloat(y2);

      var x = Math.abs(x1 - x2);
      var y = Math.abs(y1 - y2);
      return Math.sqrt((x * x) + (y * y));
    },

    "square-root": function(meta, n) {
      chk(arguments,
          chk.num("a number to get the square root of"));

      return Math.sqrt(n);
    },

    modulus: function(meta, a, b) {
      chk(arguments,
          chk.num("a number to divide"),
          chk.num("a number to divide by"));

      return parseFloat(a) % parseFloat(b);
    },

    sine: function(meta, x) {
      chk(arguments,
          chk.num("an angle to get the sine of"));

      return Math.sin(lib.get("radians")(meta, parseFloat(x)));
    },

    cosine: function(meta, x) {
      chk(arguments,
          chk.num("an angle to get the cosine of"));

      return Math.cos(lib.get("radians")(meta, parseFloat(x)));
    },

    tangent: function(meta, x) {
      chk(arguments,
          chk.num("an angle to get the tangent of"));

      return Math.tan(lib.get("radians")(meta, parseFloat(x)));
    },

    radians: function(meta, x) {
      chk(arguments,
          chk.num("an angle to convert to radians"));

      return 0.01745 * parseFloat(x);
    },

    degrees: function(meta, x) {
      chk(arguments,
          chk.num("a number to convert from radians to degrees"));

      return parseFloat(x) / 0.01745;
    },

    "new-dictionary": function(meta) {
      var args = _.rest(arguments);
      return _.object(_.filter(args, function(_, i) { return i % 2 === 0; }),
                      _.filter(args, function(_, i) { return i % 2 === 1; }));
    },

    "less-than": function(meta, a, b) {
      chk(arguments,
          chk.num("a number"),
          chk.num("a number to compare"));

      return parseFloat(a) < parseFloat(b);
    },

    "more-than": function(meta, a, b) {
      chk(arguments,
          chk.num("a number"),
          chk.num("a number to compare"));

      return parseFloat(a) > parseFloat(b);
    },

    equal: function(meta, a, b) {
      chk(arguments,
          chk.num("a number"),
          chk.num("a number to compare"));

      return a == b;
    },

    opposite: function(meta, o) {
      chk(arguments,
          chk.numOrBoolean("a number or true or false"));

      if (_.isBoolean(o)) {
        return !o;
      } else if (_.isNumber(o)) {
        return -o;
      }
    },

    "random-number": function(meta, a, b) {
      chk(arguments,
          chk.num("a lowest possible random number"),
          [chk.num("a highest possible random number"),
           chk.range(a,
                     undefined,
                     "the highest possible random number.  Should be equal to or higher than " +
                       a +
                       ", the lowest possible number you gave.")]);
      console.log(Math.floor(Math.random() * (b - a)) + a)
      return Math.round(Math.random() * (b - a)) + a;
    },

    set: function(meta, dict, key, value) {
      dict[key] = value;
      return dict;
    },

    get: function(meta, dict, key) {
      return dict[key];
    },

    print: langUtil.setSideEffecting(
      function(meta, itemToPrint) {
        chk(arguments,
            chk.any("something to print"));

        console.log(itemToPrint);
        return itemToPrint + "\n";
      }),

    counted: langUtil.createInternalStateFn(im.Map(), function(meta, target) {
      chk(arguments,
          [chk.num("a number to count to that is more than 0"),
           chk.range(1, undefined, "a number to count that is more than 0")]);

      if (meta.state.get(meta.ast.s) === undefined) {
        meta.state = meta.state.set(meta.ast.s, im.Map({ count: 0, target: parseInt(target) }));
      }

      meta.state = meta.state.updateIn([meta.ast.s, "count"], util.inc);

      if (meta.state.getIn([meta.ast.s, "count"]) === meta.state.getIn([meta.ast.s, "target"])) {
        meta.state = meta.state.setIn([meta.ast.s, "count"], 0);
        return { v: true, state: meta.state };
      } else {
        return { v: false, state: meta.state };
      }
    })
  });

  return lib;
};
