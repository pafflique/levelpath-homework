import {faker} from '@faker-js/faker';
import {Birth} from './birth';

export const givenBirth = (overrides?: Partial<Birth>): Birth => {
  return {
    id: faker.datatype.number(),
    year: faker.datatype.number({min: 2000, max: 2023}),
    who: faker.name.fullName(),
    ...overrides,
  }
}