import {Action, ActionHideError, ActionReceive, ActionRequest} from './state/actions';
import {BirthsOnThisDayRepository} from './domain/birth';
import View from './view/View';
import {State} from './state/state';

interface PresenterProps {
  repository: BirthsOnThisDayRepository;
  state: State;
  dispatch: (action: Action) => void;
}

function Presenter({repository, state, dispatch}: PresenterProps) {
  const {loading, error, list, today} = state;
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
