import {Action, ActionHideError, ActionReceive, ActionRequest} from './actions';
import {State} from './state';
import {BirthsOnThisDayListModel} from '../domain/model';

const model = new BirthsOnThisDayListModel(new Date(), ({year}) => year);

export const initialState: State = model.toState();

export const reducer = (state: State, action: Action) => {
  switch (action.constructor) {
    case ActionRequest:
      return model.request().toState();
    case ActionReceive:
      const {error, list} = (action as ActionReceive).payload;

      return model.receive(error, list).toState();
    case ActionHideError:
      return model.hideError().toState();
    default:
      throw new Error(`No such action ${JSON.stringify(action)}`);
  }
}