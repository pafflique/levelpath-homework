import * as R from 'ramda';
import {Birth, BirthsOnThisDayRepository, ThisDay} from '../domain/birth';

interface BirthDTO {
  text: string;
  year: number;
}

interface BirthsDTO {
  births: BirthDTO[];
}

const padDate = (value: number) => value.toString(10).padStart(2, '0');

export class BirthsOnThisDayRepositoryImpl implements BirthsOnThisDayRepository {
  private static nextId = 0;

  async getListForThisDay({day, month}: ThisDay): Promise<Birth[]> {
    const response = await fetch(`https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/births/${padDate(month)}/${padDate(day)}`);
    const {births}: BirthsDTO = await response.json();

    return R.map(({text, year}) => ({id: BirthsOnThisDayRepositoryImpl.nextId++, year, who: text}), births);
  }
}