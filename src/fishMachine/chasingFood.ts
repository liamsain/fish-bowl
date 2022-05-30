import { IState, EventType } from './types';
import { rndNum } from '../utils';
import Tween from '@tweenjs/tween.js'
interface IEnterArg {
  foodLocation: {x: number, y: number};
  entity: any;
}
export const createChasingFoodState: () => IState = function () {
  let foodLocation = {x: 0, y: 0};
  let entity: any = null;
  let tween = new Tween.Tween({ x: 0, y: 0 })
  const easing = Tween.Easing.Sinusoidal.Out;

  return {
    update(dt: number) {
      tween.update();
      tween.onUpdate(val => {
        entity.x = val.x;
        entity.y = val.y;
      })
      tween.onComplete(() => {
        // exit state
      });

    },
    onEvent(ev: EventType) {

    },
    enter(arg: IEnterArg) {
      foodLocation = arg.foodLocation;
      tween = new Tween.Tween(foodLocation)
      tween.easing(easing)
      const duration = rndNum(1000, 3000)
      tween.to(foodLocation, duration);
      entity = arg.entity;
      tween.start();
    },
    exit() {

    }
  };
}