import './style.css'
import * as Pixi from 'pixi.js';
import { BlurFilter } from '@pixi/filter-blur';
import { createFishMachine } from './fishMachine/machine';
import { StateType, EventType, IFishMachine } from './fishMachine/types';
import { getRndHex, getRandomArbitrary, loop, rndNum } from './utils';

let width = 1200;
let height = 800;
const food = [];
const container = new Pixi.Container();

let app = new Pixi.Application({ width, height, backgroundColor: 100000, antialias: true });
app.resize()
document.body.appendChild(app.view);
app.stage.addChild(container);

const listen = (listenerType: string, callback: any) => {
  window.addEventListener(listenerType, callback);
  window.addEventListener('unload', () => { window.removeEventListener(listenerType, callback) });
  callback();
};
listen('resize', () => {
  width = window.innerWidth;
  height = window.innerHeight;
  app.renderer.resize(width, height);
});

app.stage.interactive = true;

const makeFood = (x: number, y: number): Pixi.Sprite => {
  const graphics = new Pixi.Graphics();
  graphics.lineStyle(0); 
  graphics.beginFill(0xedcc11, 1);
  graphics.drawCircle(100, 250, 10);
  graphics.endFill();
  const texture = app.renderer.generateTexture(graphics);
  const sp = new Pixi.Sprite(texture);
  sp.x = x;
  sp.y = y;
  sp.anchor.set(0.5, 0.5)
  // app.stage.addChild(sp);
  return sp;
}

app.view.onclick = (ev) => {
  console.log(ev);
  const foodBit = makeFood(ev.clientX, ev.clientY);
  food.push(foodBit);
}
interface IFish {
    sprite: Pixi.Sprite;
    stateMachine: IFishMachine
}
const createFish = (app: Pixi.Application): IFish => {
  const gr = new Pixi.Graphics();
  const col = getRndHex();
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


  // gr.lineStyle(0);
  const texture = app.renderer.generateTexture(gr);
  const sp = new Pixi.Sprite(texture);
  sp.x = rndNum(-1000, 2800);
  sp.y = rndNum(-1000, 2000);
  sp.scale.set(getRandomArbitrary(0.2, 0.65));
  sp.anchor.set(0.5, 0.5)
  sp.interactive = true;
  sp.on('pointerdown', () => {
    console.log('you clicked a fish!', sp);
  });
  app.stage.addChild(sp);
  const m = createFishMachine(sp);
  container.addChild(sp);

// Blurs whatever is rendered by the container
  // container.filters = [new BlurFilter(0.8)]

  return { sprite: sp, stateMachine: m }
}

const fishies: IFish[] = [
];
loop(250, () => {
  fishies.push(createFish(app))
});
// app.ticker.maxFPS = 1;



let elapsed = 0.0;
app.ticker.add(gameLoop)

function gameLoop(dt: number) {
  elapsed += dt;
  for (let i = 0; i < fishies.length; i++) {
    const fish = fishies[i];
    fish.stateMachine.update(dt)
  }
}



