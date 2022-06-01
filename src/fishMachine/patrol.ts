import { rndNum, pointSpriteTowardsDest } from '../utils';
import Tween from '@tweenjs/tween.js'
import { IState, EventType, StateType } from './types';
import { Sprite } from 'pixi.js';

export const createPatrolState = 
function (changeState: (st: StateType, data: any) => void) {
  let entity: any = null;
  const minX = 50;
  const minY = 50;
  const maxX = 1800;
  const maxY = 950;
  const minDuration = 4000;
  const maxDuration = 20000;
  let elapsed = 0.0;
  let dest: any = { x: rndNum(minX, maxX), y: rndNum(minY, maxY) };
  let tween = new Tween.Tween({ x: 0, y: 0 })
  const easing = Tween.Easing.Sinusoidal.Out;

  return {
    update(dt: number) {
      elapsed += dt;
      tween.update();
      tween.onUpdate(val => {
        entity.x = val.x;
        entity.y = val.y;
      })
      tween.onComplete(() => {
        dest = { x: rndNum(minX, maxX), y: rndNum(minY, maxY) };
        tween = new Tween.Tween({ x: entity.x, y: entity.y })
        tween.easing(easing)
        pointSpriteTowardsDest(entity, dest);
        tween.to(dest, rndNum(minDuration, maxDuration));
        tween.start();
      });
    },
    onEvent(ev: EventType) : StateType|void {
      if (ev === EventType.FoodAvailable) {
        return StateType.ChasingFood
      }
    },
    enter(sp: Sprite, data: any = null) {
      entity = sp;
      tween = new Tween.Tween({ x: entity.x, y: entity.y })
      tween.easing(easing)
      pointSpriteTowardsDest(sp, dest);
      const duration = rndNum(3000, 25000)
      tween.to(dest, duration);
      tween.start();
    },
    exit() {
      entity.rotation = 0
      tween.stop();
      entity = null;
      elapsed = 0.0;
    }
  }

}