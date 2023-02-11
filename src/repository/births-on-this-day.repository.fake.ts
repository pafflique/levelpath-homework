import {Birth, BirthsOnThisDayRepository, ThisDay} from '../domain/birth';

export class BirthsOnThisDayRepositoryFake implements BirthsOnThisDayRepository {
  data: Birth[] = [];

  getListForThisDay(thisDay: ThisDay): Promise<Birth[]> {
    return Promise.resolve(this.data);
  }
}