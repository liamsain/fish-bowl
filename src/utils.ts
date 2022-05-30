import * as Pixi from 'pixi.js';
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

export function loop(to:number, callback: (ind: number) => void) {
  for (let index = 0; index < to; index++) {
    callback(index);
  }
}

export function spritesIntersect(a: Pixi.Sprite, b: Pixi.Sprite) {
  const aBox = a.getBounds();
  const bBox = b.getBounds();
  return aBox.x + aBox.width > bBox.x &&
    aBox.x < bBox.x + bBox.width &&
    aBox.y + aBox.height > bBox.y &&
    aBox.y< bBox.y + bBox.height;
}
