export enum StateType { Patrol, ChasingFood }
export enum EventType { FoodAvailable }
export interface IState {
  update: (dt: number) => void;
  onEvent: (ev: EventType) => StateType | void;
  enter: (val: any) => StateType | void;
  exit: () => void;
}