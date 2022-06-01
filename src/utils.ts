import { Sprite } from 'pixi.js';
export function rndNum(min = 0, max = 10) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomArbitrary(min = 0, max = 100) {
  return Math.random() * (max - min) + min;
}

export function getRndHex() {
  const chs = '0123456789abcdef'
  const rem = new Array(6).fill(0).map(() => chs[rndNum(0, chs.length - 1)])
  return Number('0x' + rem.join(''));
}

export function loop(to: number, callback: (ind: number) => void) {
  for (let index = 0; index < to; index++) {
    callback(index);
  }
}

export function spritesIntersect(sp1: Sprite, sp2: Sprite) {
  const a = sp1.getBounds();
  const b = sp2.getBounds();
  const rightmostLeft = a.left < b.left ? b.left : a.left;
  const leftmostRight = a.right > b.right ? b.right : a.right;

  if (leftmostRight <= rightmostLeft) {
    return false;
  }

  const bottommostTop = a.top < b.top ? b.top : a.top;
  const topmostBottom = a.bottom > b.bottom ? b.bottom : a.bottom;

  return topmostBottom > bottommostTop;
}

export const pointSpriteTowardsDest = (sp: Sprite, dest: { x: number, y: number }) => {
  const goingRight = dest.x > sp.x;
  if (goingRight) {
    const currentScale = sp.scale.x;
    sp.scale.x = Math.abs(currentScale);
  } else {
    const currentScale = sp.scale.x;
    sp.scale.x = -Math.abs(currentScale);
  }
  sp.rotation = 0
  if (dest.y > sp.y) {
    // going down
    if (goingRight) {
      sp.rotation += 0.1
    } else {
      sp.rotation -= 0.1
    }
  } else if (dest.y < sp.y) {
    if (goingRight) {
      sp.rotation -= 0.1
    } else {
      sp.rotation += 0.1
    }
  }

}

