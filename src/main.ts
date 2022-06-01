import './style.css'
import { Sprite, Application, Graphics, Text } from 'pixi.js';
import { createFishMachine, IFishMachine } from './fishMachine/machine';
import { EventType } from './fishMachine/types';
import { getRndHex, getRandomArbitrary, loop, rndNum } from './utils';

interface IFish {
    sprite: Sprite;
    stateMachine: IFishMachine
}

const fishies: IFish[] = []
const fishCount = 20;

let width = 1200;
let height = 800;
const food = [];

let app = new Application({ width, height, backgroundColor: 100000, antialias: true });
app.resize()
document.body.appendChild(app.view);

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

const makeFood = (x: number, y: number): Sprite => {
  const graphics = new Graphics();
  graphics.lineStyle(0); 
  graphics.beginFill(0xedcc11, 1);
  graphics.drawCircle(100, 250, 5);
  graphics.endFill();
  const texture = app.renderer.generateTexture(graphics);
  const sp = new Sprite(texture);
  sp.x = x;
  sp.y = y;
  sp.anchor.set(0.5, 0.5)
  app.stage.addChild(sp);
  fishies.forEach(x => {
    x.stateMachine.onEvent(EventType.FoodAvailable, sp);
  });
  return sp;
}

app.view.onclick = (ev) => {
  console.log('view click');
  const foodBit = makeFood(ev.clientX, ev.clientY);
  food.push(foodBit);
}

const createFish = (app: Application): IFish => {
  const gr = new Graphics();
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


  const texture = app.renderer.generateTexture(gr);
  const sp = new Sprite(texture);
  sp.x = rndNum(-1000, 2800);
  sp.y = rndNum(-1000, 2000);
  sp.scale.set(getRandomArbitrary(0.2, 0.65));
  sp.anchor.set(0.5, 0.5)
  sp.interactive = true;
  sp.on('pointerdown', ev => {
  });

  app.stage.addChild(sp);
  const m = createFishMachine(sp);

  return { sprite: sp, stateMachine: m }
}

loop(fishCount, () => {
  fishies.push(createFish(app))
});


let elapsed = 0.0;
app.ticker.add(gameLoop)

function gameLoop(dt: number) {
  elapsed += dt;
  for (let i = 0; i < fishies.length; i++) {
    const fish = fishies[i];
    fish.stateMachine.update(dt)
  }
}



