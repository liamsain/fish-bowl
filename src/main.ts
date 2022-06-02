import './style.css'
import { Sprite, Application, Graphics, Text, Texture, Container} from 'pixi.js';
import { EventType } from './fish/types';
import { createLoadsOfFish, createFish } from './fish/fish';

let width = 1200;
let height = 800;
const food = [];

let app = new Application({ width, height,  antialias: true });
document.body.appendChild(app.view);
const cont = new Container();

let bg = new Sprite(Texture.WHITE);
bg.width = app.screen.width;
bg.height = app.screen.height;
bg.tint = 100000;
bg.interactive = true;
bg.on('pointerdown', ev => {
  const foodBit = makeFood(ev.data.global.x, ev.data.global.y);
  food.push(foodBit);
});
app.stage.addChild(bg)

const fishies = createLoadsOfFish(app, 25);

const listen = (listenerType: string, callback: any) => {
  window.addEventListener(listenerType, callback);
  window.addEventListener('unload', () => { window.removeEventListener(listenerType, callback) });
  callback();
};

listen('resize', () => {
  width = window.innerWidth;
  height = window.innerHeight;
  app.renderer.resize(width, height);
  bg.width = app.screen.width;
  bg.height = app.screen.height;
  fishies.forEach(x => {
    x.machine.onEvent(EventType.ScreenResize);
  });
});
app.resize()

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
    x.machine.onEvent(EventType.FoodAvailable, sp);
  });
  return sp;
}


let elapsed = 0.0;
app.ticker.add(gameLoop)

function gameLoop(dt: number) {
  elapsed += dt;
  for (let i = 0; i < fishies.length; i++) {
    const fish = fishies[i];
    fish.machine.update(dt)
  }
}



