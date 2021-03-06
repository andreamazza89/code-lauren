var _ = require("underscore");

var util = module.exports = {
  pp: function(str) {
    console.log(JSON.stringify(str, null, 2));
  },

  stripAst: function(obj) {
    if (typeof obj === "object") {
      delete obj.l;
      delete obj.s;
      delete obj.e;
      delete obj.text;
      delete obj.tail;
      Object.keys(obj).forEach(function(k) { util.stripAst(obj[k]) });
    }

    return obj
  },

  stripBc: function(bc) {
    bc.forEach(function(instruction) {
      delete instruction.ast;
      delete instruction.annotate;
      if (instruction[0] === "push_lambda") {
        instruction[1] = instruction[1].toObject();
        delete instruction[1].type;
        delete instruction[1].parameters;
        delete instruction[1].annotate;
        util.stripBc(instruction[1].bc);
      }
    });

    return bc;
  },

  copyException: function(from, to) {
    to.stack = from.stack;
    to.message = from.message;
    for (var i in from) {
      to[i] = from[i];
    }

    return to;
  },

  defaultObj: function(keys, def) {
    return keys.reduce(function(o, p) {
      o[p] = (def instanceof Function ? def() : def);
      return o;
    }, {});
  },

  getNodeAt: function(node, keys) {
    var nextKey = keys[0];
    if (keys.length === 0) {
      return node;
    } else if (_.isArray(node) && nextKey in node) {
      return util.getNodeAt(node[nextKey], _.rest(keys));
    } else if (_.isObject(node) && node.t === nextKey) {
      return util.getNodeAt(node.c, _.rest(keys));
    } else {
      throw "Couldn't find node with key " + nextKey;
    }
  },

  mapCat: function(list, fn) {
    return list.reduce(function (acc, x) {
      return acc.concat(fn(x));
    }, []);
  },

  findIndex: function(arr, predicate) {
    for (var i = 0; i < arr.length; i++) {
      if (predicate(arr[i])) {
        return i;
      }
    }
  },

  inc: function(v) {
    return v + 1;
  }
};
