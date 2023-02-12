import * as R from 'ramda';
import {Birth, BirthsOnThisDayRepository, ThisDay} from '../domain/birth';

export interface BirthDTO {
  text: string;
  year: number;
}

export interface BirthsDTO {
  births: BirthDTO[];
}

const padDate = (value: number) => value.toString(10).padStart(2, '0');

export class BirthsOnThisDayRepositoryImpl implements BirthsOnThisDayRepository {
  private static nextId = 0;

  async getListForThisDay({day, month}: ThisDay): Promise<Birth[]> {
    const response = await fetch(`${BASE}${PATH}/${padDate(month)}/${padDate(day)}`);
    const {births}: BirthsDTO = await response.json();

    return R.map(({text, year}) => ({id: BirthsOnThisDayRepositoryImpl.nextId++, year, who: text}), births);
  }
}

export const BASE = `https://api.wikimedia.org`;
export const PATH = `/feed/v1/wikipedia/en/onthisday/births`;