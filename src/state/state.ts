import {Birth, ThisDay} from '../domain/birth';

export interface State {
  today: ThisDay;
  list: Birth[];
  loading: boolean;
  error: {
    text: string | null;
    show: boolean;
  };
}

