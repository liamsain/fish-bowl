import { IState, EventType, StateType } from './types';
import { rndNum, pointSpriteTowardsDest } from '../utils';
import {Sprite } from 'pixi.js';
import Tween from '@tweenjs/tween.js'
import { spritesIntersect } from '../utils';

export const createChasingFoodState = 
function (changeState: (st: StateType, data: any) => void) {
  let foodSprite: Sprite|null = null;
  let entity: Sprite|null = null;
  let tween = new Tween.Tween({ x: 0, y: 0 })
  const easing = Tween.Easing.Cubic.Out;

  return {
    update(dt: number) {
      tween.update();
      tween.onUpdate(val => {
        if (entity) {
          entity.x = val.x;
          entity.y = val.y;
        }
        if (entity && foodSprite && !foodSprite.destroyed) {
          if (spritesIntersect(entity, foodSprite)) {
            foodSprite.destroy();
            tween.stop();
            changeState(StateType.Patrol, null);
          }
        }
      })
      tween.onComplete(() => {
        changeState(StateType.Patrol, null);
      });

    },
    onEvent(ev: EventType) {

    },
    enter(sp: Sprite, foodSp: Sprite) {
      foodSprite = foodSp;
      tween = new Tween.Tween({x: sp.x, y: sp.y})
      pointSpriteTowardsDest(sp, {x: foodSprite.x, y: foodSprite.y});
      tween.easing(easing)
      const duration = rndNum(1000, 3000)
      tween.to({x: foodSprite.x, y: foodSprite.y}, duration);
      entity = sp;
      tween.start();
    },
    exit() {

    }
  };
}