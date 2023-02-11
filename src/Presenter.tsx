import {useReducer} from 'react';
import {initialState, reducer} from './state/reducer';
import {ActionReceive, ActionType} from './state/actions';
import {BirthsOnThisDayRepository} from './domain/birth';
import View from './view/View';

interface PresenterProps {
  repository: BirthsOnThisDayRepository;
}

function Presenter({repository}: PresenterProps) {
  const [{loading, error, list, today}, dispatch] = useReducer(reducer, initialState);

  async function fetch() {
    dispatch({type: ActionType.Request});
    try {
      const list = await repository.getListForThisDay(today);
      dispatch({type: ActionType.Receive, payload: {list, error: null}} as ActionReceive);
    } catch (e) {
      const error = e instanceof Error ? e.message : 'Something went wrong.';
      dispatch({type: ActionType.Receive, payload: {list: null, error}} as ActionReceive);
    }
  }

  return (
    <View list={list} loading={loading} error={error} fetch={fetch}
          close={() => dispatch({type: ActionType.HideError})}></View>
  );
}

export default Presenter;
