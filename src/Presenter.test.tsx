import React, {useReducer} from 'react';
import {fireEvent, getByRole, getByText, render, screen, waitFor} from '@testing-library/react';
import Presenter from './Presenter';
import {BirthsOnThisDayRepositoryFake} from './repository/births-on-this-day.repository.fake';
import {Action, ActionHideError, ActionReceive, ActionRequest} from './state/actions';
import {State} from './state/state';
import {Birth} from './domain/birth';
import {initialState} from './state/reducer';
import {givenBirth} from './domain/birth.fake';

let repository: BirthsOnThisDayRepositoryFake;
const spyAction = jest.fn();

beforeEach(() => {
  repository = new BirthsOnThisDayRepositoryFake();
});

function Wrapper({repository, initialState}: { repository: BirthsOnThisDayRepositoryFake, initialState: State }) {
  const [state, dispatch] = useReducer((prevState: State, action: Action) => {
    spyAction(action);
    return prevState;
  }, initialState);

  return (
    <Presenter state={state} dispatch={dispatch} repository={repository}/>
  );
}

describe('fetch', () => {
  let list: Birth[];

  beforeEach(() => {
    list = [givenBirth()];
    repository.data = list;
  });

  test('request', async () => {
    render(<Wrapper repository={repository} initialState={initialState}/>);
    fireEvent.click(screen.getByText(/fetch/i))

    await waitFor(() => {
      expect(spyAction).toHaveBeenLastCalledWith(new ActionRequest());
    });
  });

  describe('receive', () => {
    test('ok', async () => {
      render(<Wrapper repository={repository} initialState={initialState}/>);
      fireEvent.click(screen.getByText(/fetch/i));

      await waitFor(() => {
        expect(spyAction).toHaveBeenLastCalledWith(new ActionReceive({list, error: null}));
      });
    });

    test('error', async () => {
      repository.error = new Error('error');
      render(<Wrapper repository={repository} initialState={initialState}/>);
      fireEvent.click(screen.getByText(/fetch/i));

      await waitFor(() => {
        expect(spyAction).toHaveBeenLastCalledWith(new ActionReceive({list: null, error: 'error'}));
      });
    });
  });

  describe('error dialog', () => {
    test('hide', async () => {
      render(<Wrapper repository={repository} initialState={{...initialState, error: {text: 'error', show: true}}}/>);
      const dialog = screen.getByRole('dialog');
      getByText(dialog, /error occurred/i);
      fireEvent.click(getByRole(dialog, 'button'));

      await waitFor(() => {
        expect(spyAction).toHaveBeenLastCalledWith(new ActionHideError());
      });
    });
  });
});



