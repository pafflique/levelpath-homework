import {Birth, ThisDay} from '../domain/birth';

export interface FetchError {
  text: string | null;
  show: boolean;
}

export interface State {
  today: ThisDay;
  list: Birth[];
  loading: boolean;
  error: FetchError;
}

