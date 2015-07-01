var vm = require("../src/lang/vm");

var player;
var p;
var paused = false;

function setupPlayer() {
  if (player !== undefined) { return; }

  (function tick(lastEventLoopYield) {
    while(true) {
      if (p !== undefined && !paused && !vm.isComplete(p)) {
        player.stepForwards(1);
      }

      if (isTimeToYieldToEventLoop(lastEventLoopYield)) {
        requestAnimationFrame(() => tick(new Date().getTime()));
        break;
      }
    }
  })(new Date().getTime());

  player = {
    isPaused: function() {
      return paused;
    },

    togglePause: function() {
      paused = !paused;
    },

    pause: function() {
      paused = true;
    },

    unpause: function() {
      paused = false;
    },

    getProgram: function() {
      return p;
    },

    stepForwards: function(stepCount) {
      stepCount = stepCount || 1;

      for (var i = 0; i < stepCount; i++) {
        try {
          p = vm.step(p);
        } catch (e) {
          if (e instanceof vm.RuntimeError) {
            console.log(e.message, e.stack);
          } else {
            console.log(e.stack);
          }
        }
      }
    },

    stepBackwards: function() {
      console.log("nothing yet");
    },

    setProgram: function(newP) {
      p = newP;
    }
  };

  return player;
};

function isTimeToYieldToEventLoop(lastYield) {
  return new Date().getTime() - lastYield > 8;
};

setupPlayer.setupPlayer = setupPlayer;
module.exports = setupPlayer;
