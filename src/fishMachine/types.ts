import { Sprite } from 'pixi.js'

export enum EventType { FoodAvailable, Killed, Attacked, Mated, Birth }

export interface IState {
  update: (dt: number) => void;
  onEvent: (ev: EventType) => StateType | void;
  enter: (sp: Sprite, val: any) => StateType | void;
  exit: () => void;
}

export enum StateType { Patrol, ChasingFood, LookingforMate, Mating, LookingForFight, Fighting, Dead, Birthing }