import { createPatrolState } from './patrol';
import { createChasingFoodState } from './chasingFood';
import { StateType, EventType, FishSprite } from './types';

const hungerRate = 0.01;

export const createFishMachine = function (sprite: FishSprite) {
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
    function onEvent(ev: EventType, data: any = null) {
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
      if (sprite.health > 0) {
        sprite.health -= hungerRate;
      }
      state.update(dt)
    },
    onEvent
  };
}