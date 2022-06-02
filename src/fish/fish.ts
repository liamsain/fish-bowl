import { Sprite, Graphics, Application, Container} from 'pixi.js';
import { createFishMachine } from './machine';
import { getRndHex, getRandomArbitrary, rndNum, loop } from '../utils';
import { IFish, FishSprite } from './types';

export const createLoadsOfFish = (app: Application, count = 10): IFish[] => {
  const result: IFish[] = []
  loop(count,() => {
    result.push(createFish(app))
  });
  return result
}
export const createFish = (app: Application): IFish => {
  const gr = new Graphics();
  const col = 0xffffff * Math.random() //getRndHex();
  // draw tail
  const path = [570, 250, 470, 200, 490, 250, 470, 310];
  gr.lineStyle(2, 0x171717, 1);
  gr.beginFill(col, 1);
  gr.drawPolygon(path);
  gr.endFill();

  // draw body
  gr.lineStyle(2, 0x171717, 1);
  gr.beginFill(col, 1);
  gr.drawEllipse(600, 250, 80, 50);
  gr.endFill();

  // draw eye
  gr.lineStyle(6, 0xdcdae3, 1);
  gr.beginFill(0x050112, 1);
  gr.drawCircle(640, 230, 7);
  gr.endFill();


  const texture = app.renderer.generateTexture(gr);

  const sp = new FishSprite(texture);
  sp.x = rndNum(-1000, 2800);
  sp.y = rndNum(-1000, 2000);
  sp.scale.set(getRandomArbitrary(0.15, 0.75));
  sp.anchor.set(0.5, 0.5)
  sp.interactive = true;
  sp.on('pointerdown', ev => {
    console.log('you point da fish');
  });

  app.stage.addChild(sp);
  const m = createFishMachine(sp);
  return { sprite: sp, machine: m }
}
