import {initialState, reducer} from './reducer';
import {ActionHideError, ActionReceive, ActionRequest} from './actions';
import {givenBirth} from '../domain/birth.fake';
import {FetchError} from './state';

describe('reducer', () => {
  describe('request', () => {
    it('toggles loading', () => {
      const {loading} = reducer({...initialState, loading: false}, new ActionRequest());

      expect(loading).toBe(true);
    });

    it('hides error', () => {
      const {error} = reducer({...initialState, error: {text: 'error', show: true}}, new ActionRequest());

      expect(error.show).toBe(false);
      expect(error.text).toBeNull();
    });
  });

  describe('receive', () => {
    test('data', () => {
      const list = [givenBirth()];
      const state = reducer({...initialState, loading: true, list: [], error: {text: null, show: false}}, new ActionReceive({
        error: null,
        list
      }));

      expect(state.list).toEqual(list);
      const error: FetchError = {text: null, show: false};
      expect(state.error).toEqual(error);
      expect(state.loading).toBe(false);
    });

    test('error', () => {
      const state = reducer({...initialState, loading: true, list: [], error: {text: null, show: false}}, new ActionReceive({
        error: 'error',
        list: null,
      }));

      expect(state.list).toEqual([]);
      const error: FetchError = {text: 'error', show: true};
      expect(state.error).toEqual(error);
      expect(state.loading).toBe(false);
    });
  });

  test('hide error', () => {
    const {error} = reducer({...initialState, error: {text: 'error', show: true}}, new ActionHideError());

    expect(error.text).toBeNull();
    expect(error.show).toBe(false);
  });
});