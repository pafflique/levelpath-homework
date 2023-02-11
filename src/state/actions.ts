import {Birth} from '../domain/birth';

export interface Action {
  type: ActionType;
}

export enum ActionType {
  Request,
  Receive,
  HideError,
}

export interface ActionReceive extends Action {
  payload: {
    error: string | null;
    list: Birth[] | null;
  };
}