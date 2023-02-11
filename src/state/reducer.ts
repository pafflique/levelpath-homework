import {Action, ActionReceive, ActionType} from './actions';
import {State} from './state';
import {BirthsOnThisDayListModel} from '../domain/model';

const model = new BirthsOnThisDayListModel(new Date(), ({year}) => year);

export const initialState: State = model.toState();

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case ActionType.Request:
      return model.request().toState();
    case ActionType.Receive:
      const {error, list} = (action as ActionReceive).payload;

      return model.receive(error, list).toState();
    case ActionType.HideError:
      return model.hideError().toState();
    default:
      throw new Error(`No such action ${JSON.stringify(action)}`);
  }
}