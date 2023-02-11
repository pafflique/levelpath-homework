import {Birth} from '../domain/birth';

export abstract class Action {
  public abstract type: ActionType
}

export enum ActionType {
  Request,
  Receive,
  HideError,
}

export class ActionRequest extends Action {
  public type = ActionType.Request;
}

export class ActionHideError extends Action {
  public type = ActionType.HideError;
}

export class ActionReceive extends Action {
  public type = ActionType.Receive;

  constructor(public payload: ReceivePayload) {
    super();
  }
}

interface ReceivePayload {
  error: string | null;
  list: Birth[] | null;
}