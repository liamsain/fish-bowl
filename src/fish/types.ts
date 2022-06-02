import { Sprite } from 'pixi.js'

export enum EventType { FoodAvailable, Killed, Attacked, Mated, Birth, ScreenResize }

export interface IState {
  update: (dt: number) => void;
  onEvent: (ev: EventType) => StateType | void;
  enter: (sp: Sprite, val: any) => StateType | void;
  exit: () => void;
}

export enum StateType { Patrol, ChasingFood, LookingforMate, Mating, LookingForFight, Fighting, Dead, Birthing }

export interface IFish {
  machine: IFishMachine;
  sprite: FishSprite;
}
export class FishSprite extends Sprite {
  health = 100;
  constructor(config: any) {
    super(config);
  }
}
export interface IFishMachine {
  current(): IState;
  update(dt: number): void;
  change(stateType: StateType, val: any): void;
  onEvent(ev: EventType, data?: any): void;
}