export enum StateType { Patrol, ChasingFood }
import { Sprite } from 'pixi.js'

export enum EventType { FoodAvailable }
export interface IState {
  update: (dt: number) => void;
  onEvent: (ev: EventType) => StateType | void;
  enter: (sp: Sprite, val: any) => StateType | void;
  exit: () => void;
}