import { createPatrolState } from './patrol';
import { createChasingFoodState } from './chasingFood';
import { StateType, EventType, IState } from './types';
import * as Pixi from 'pixi.js';

export interface IFishMachine {
  current(): IState;
  update(dt: number): void;
  change(stateType: StateType, val: any): void;
  onEvent(ev: EventType): void;
}

export const createFishMachine: (sp: Pixi.Sprite) => IFishMachine = function (sprite: Pixi.Sprite) {
  const patrol = createPatrolState();
  const chasingFood = createChasingFoodState();
  const states = [
    {
      type: StateType.Patrol,
      state: patrol
    },
    {
      type: StateType.ChasingFood,
      state: chasingFood
    }
  ];
  let state = patrol;
  state.enter(sprite);
  return {
    current() {
      return state;
    },
    update(dt: number) {
      state.update(dt)
    },
    change(stateType: StateType, val: any) {
      const next = states.find(x => x.type === stateType);
      if (next) {
        state.exit();
        state = next.state;
        // possibly give the state the change and onEvent functions
        state.enter(val);
      }
    },
    onEvent(ev: EventType) {
      const next = state.onEvent(ev);
      if (next) {
        this.change(next, null);
      }
    }
  };
}