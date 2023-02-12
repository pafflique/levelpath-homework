import {State} from '../state/state';
import {Birth, ThisDay} from './birth';
import * as R from 'ramda';

export class BirthsOnThisDayListModel {
  private list: Birth[] = [];
  private loading = false;
  private errorText: string | null = null;
  private errorShow = false;
  private readonly today: ThisDay;

  constructor(today: Date, private sortFn: (value: Birth) => R.Ord) {
    this.today = {day: today.getDate(), month: today.getMonth() + 1};
  }

  request(): this {
    this.hideError();
    this.loading = true;

    return this;
  }

  receive(error: string | null, list: Birth[] | null): this {
    if (error !== null) {
      this.updateList([]);
      this.showError(error);
    }
    if (list !== null) this.updateList(list);
    this.loading = false;

    return this;
  }

  private updateList(list: Birth[]): void {
    this.list = R.sortBy(this.sortFn, list);
  }

  showError(error: string): void {
    this.errorText = error;
    this.errorShow = true;
  }

  hideError(): this {
    this.errorText = null;
    this.errorShow = false;

    return this;
  }

  toState(): State {
    return {
      list: this.list,
      loading: this.loading,
      error: {text: this.errorText, show: this.errorShow},
      today: this.today,
    };
  }
}