import { rndNum, pointSpriteTowardsDest } from '../utils';
import Tween from '@tweenjs/tween.js'
import { IState, EventType, StateType } from './types';
import { Sprite } from 'pixi.js';

export const createPatrolState = 
function (changeState: (st: StateType, data: any) => void) {
  let entity: any = null;
  const minX = 50;
  const minY = 50;
  let maxX = 1800;
  let maxY = 950;
  const minDuration = 1000;
  const maxDuration = 15000;
  let elapsed = 0.0;
  let dest: any = { x: rndNum(minX, maxX), y: rndNum(minY, maxY) };
  let tween = new Tween.Tween({ x: 0, y: 0 })
  const easing = Tween.Easing.Sinusoidal.Out;
  const initTween = () => {
    dest = { x: rndNum(minX, maxX), y: rndNum(minY, maxY) };
    tween = new Tween.Tween({ x: entity.x, y: entity.y })
    tween.easing(easing)
    pointSpriteTowardsDest(entity, dest);
    tween.to(dest, rndNum(minDuration, maxDuration));
    tween.start();
  }
  const setMaxVals = () => {
    maxX = window.innerWidth - 40;
    maxY = window.innerHeight - 40;
  }
  setMaxVals();

  return {
    update(dt: number) {
      elapsed += dt;
      tween.update();
      tween.onUpdate(val => {
        entity.x = val.x;
        entity.y = val.y;
      })
      tween.onComplete(() => {
        initTween();
      });
    },
    onEvent(ev: EventType) : StateType|void {
      if (ev === EventType.FoodAvailable) {
        return StateType.ChasingFood
      } else if (ev === EventType.ScreenResize) {
        setMaxVals();
        tween.stop();
        initTween();
      }
    },
    enter(sp: Sprite, data: any = null) {
      entity = sp;
      initTween();
    },
    exit() {
      entity.rotation = 0
      tween.stop();
      entity = null;
      elapsed = 0.0;
    }
  }

}