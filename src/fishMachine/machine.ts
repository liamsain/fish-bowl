import { createPatrolState } from './patrol';
import { createChasingFoodState } from './chasingFood';
import { StateType, EventType, IState } from './types';
import * as Pixi from 'pixi.js';

export interface IFishMachine {
  current(): IState;
  update(dt: number): void;
  change(stateType: StateType, val: any): void;
  onEvent(ev: EventType, data: any): void;
}

export const createFishMachine: (sp: Pixi.Sprite) => IFishMachine = function (sprite: Pixi.Sprite) {
  const patrol = createPatrolState(change);
  const chasingFood = createChasingFoodState(change);
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
  function change(stateType: StateType, val: any) {
    const next = states.find(x => x.type === stateType);
    if (next) {
      state.exit();
      state = next.state;
      state.enter(sprite, val);
    }
  };
    function onEvent(ev: EventType, data: any) {
      const next = state.onEvent(ev);
      if (next) {
        change(next, data);
      }
    }

  state.enter(sprite, null);
  return {
    current() {
      return state;
    },
    change,
    update(dt: number) {
      state.update(dt)
    },
    onEvent
  };
}