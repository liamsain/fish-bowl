import { rndNum } from '../utils';
import Tween from '@tweenjs/tween.js'
import { IState, EventType } from './types';

export const createPatrolState: () => IState = function () {
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
  const orientate = () => {
    const goingRight = dest.x > entity.x;
    if (goingRight) {
      const currentScale = entity.scale.x;
      entity.scale.x = Math.abs(currentScale);
    } else {
      const currentScale = entity.scale.x;
      entity.scale.x = -Math.abs(currentScale);
    }
    entity.rotation = 0
    if (dest.y > entity.y) {
      // going down
      if (goingRight) {
        entity.rotation += 0.1
      } else {
        entity.rotation -= 0.1
      }
    } else if (dest.y < entity.y) {
      if (goingRight) {
        entity.rotation -= 0.1
      } else {
        entity.rotation += 0.1
      }
    }

  }

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
        orientate();
        tween.to(dest, rndNum(minDuration, maxDuration));
        tween.start();
      });
    },
    onEvent(ev: EventType) {
    },
    enter(e: any) {
      entity = e;
      tween = new Tween.Tween({ x: entity.x, y: entity.y })
      tween.easing(easing)
      orientate();
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