export {}
/* 
================
  An abstract state machine is a software component that defines a finite set of states:
  - One state is defined as the initial state. 
    When a machine starts to execute, it automatically enters this state.
  - Each state can define actions that occur when a machine enters or exits that state. 
    Actions will typically have side effects.
  - Each state can define events that trigger a transition.
  - A transition defines how a machine would react to the event, 
    by exiting one state and entering another state.
  - A transition can define actions that occur when the transition happens.
    Actions will typically have side effects.

  When “running” a state machine, this abstract state machine is executed.  
  The first thing that happens is that the state machine enters the “initial state”.
  Then, events are passed to the machine as soon as they happen.  
  
  When an event happens:
  - The event is checked against the current state’s transitions.
  - If a transition matches the event, that transition “happens”.
  - By virtue of a transition “happening”, states are exited, and entered and the relevant actions are performed
  - The machine immediately is in the new state, ready to process the next event.
=================
*/

/*
// Finite state machine from youtube:
export const machine = {
  state: "Idle",
  transitions: {
    Idle: {
      drink: function(beverage, second) {
        if (beverage.type == "alcohol") {
          this.changeState("DRUNK");
        } 
      }
    },
    Patrol: {
      drink: function(beverage) {
        if (beverage.type == "alcohol") {
          this.changeState("REALLYDRUNK");
        } else {
          this.changeState("SOBER");
        }
      }
    },
    REALLYDRUNK: {
      drink: function(beverage) {
        console.log("current state", this.state);
        console.log("\tdrinking ", beverage.type);
        if (beverage.type == "alcohol") {
          let dice = Math.floor(Math.random() * 2); // 0 or 1
          if (dice) {
            this.dispatch("throwup", {});
          } else {
            this.dispatch("passout", {});
          }
        } else {
          this.changeState("DRUNK");
        }
      },
      passout: function() {
        console.log("\tPassing out. zzzzzzzzz");
        this.changeState("ASLEEP");
      },
      throwup: function() {
        console.log("\tBlaaaaaaaaaaa....When did I eat that?");
        this.dispatch("passout", {});
      }
    },
  },
  dispatch(actionName, ...payload) {
    const actions = this.transitions[this.state];
    const action = this.transitions[this.state][actionName];

    if (action) {
      action.apply(machine, ...payload);
    } else {
      //action is not valid for current state
    }
  },
  changeState(newState) {
    //validate that newState actually exists
    this.state = newState;
  },
  update() {

  }
};

let Jeff = Object.create(machine, {
  name: {
    writable: false,
    enumerable: true,
    value: "Jeff"
  }
});

// Jeff.dispatch("drink", [{ type: "alcohol" }]);
// Jeff.dispatch("drink", [{ type: "alcohol" }]);
// Jeff.dispatch("drink", [{ type: "alcohol" }]);
// Jeff.dispatch("wake");
// Jeff.dispatch("openeyes");
// Jeff.dispatch("drink", [{ type: "water" }]);
Jeff.dispatch("eat");
console.log(Jeff.state);
*/

