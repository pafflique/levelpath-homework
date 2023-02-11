import {useReducer} from 'react';
import {initialState, reducer} from './state/reducer';
import {ActionHideError, ActionReceive, ActionRequest} from './state/actions';
import {BirthsOnThisDayRepository} from './domain/birth';
import View from './view/View';

interface PresenterProps {
  repository: BirthsOnThisDayRepository;
}

function Presenter({repository}: PresenterProps) {
  const [{loading, error, list, today}, dispatch] = useReducer(reducer, initialState);

  async function fetch() {
    dispatch(new ActionRequest());
    try {
      const list = await repository.getListForThisDay(today);
      dispatch(new ActionReceive({list, error: null}));
    } catch (e) {
      const error = e instanceof Error ? e.message : 'Something went wrong.';
      dispatch(new ActionReceive({list: null, error}));
    }
  }

  return (
    <View list={list} loading={loading} error={error} fetch={fetch}
          close={() => dispatch(new ActionHideError())}></View>
  );
}

export default Presenter;
