import {Birth, BirthsOnThisDayRepository, ThisDay} from '../domain/birth';

export class BirthsOnThisDayRepositoryFake implements BirthsOnThisDayRepository {
  error?: Error;
  data: Birth[] = [];

  getListForThisDay(thisDay: ThisDay): Promise<Birth[]> {
    if (this.error) throw this.error;
    return Promise.resolve(this.data);
  }
}