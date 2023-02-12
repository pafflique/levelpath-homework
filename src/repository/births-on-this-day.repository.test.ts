import {BASE, BirthDTO, BirthsDTO, BirthsOnThisDayRepositoryImpl, PATH} from './births-on-this-day.repository';
import {faker} from '@faker-js/faker';
import * as R from 'ramda';
import {rest,} from 'msw'
import {setupServer, SetupServerApi} from 'msw/node';

let server: SetupServerApi;

export const mock = (url: string) => {
  server = setupServer(
    rest.get(url, (req, res, ctx) => {
      return res(
        ctx.json(givenBirthsDTO())
      )
    }),
  );
  server.listen();
};


const givenBirthDTO = (overrides?: Partial<BirthDTO>): BirthDTO => {
  return {
    year: faker.datatype.number({min: 2000, max: 2023}),
    text: faker.name.fullName(),
    ...overrides,
  }
}


const givenBirthsDTO = (overrides?: Partial<BirthsDTO>): BirthsDTO => {
  return {
    births: R.times(() => givenBirthDTO(), faker.datatype.number({min: 1, max: 10})),
    ...overrides,
  }
}

describe('BirthsOnThisDayRepositoryImpl', function () {
  let sut: BirthsOnThisDayRepositoryImpl;

  beforeEach(function () {
    sut = new BirthsOnThisDayRepositoryImpl();
  });

  afterEach(() => {
    server.close();
  })

  describe('padding', function () {
    test('needed', async function () {
      mock(`${BASE}${PATH}/01/01`);
      await sut.getListForThisDay({day: 1, month: 1});
    });

    test('not needed', async function () {
      mock(`${BASE}${PATH}/10/10`);
      await sut.getListForThisDay({day: 10, month: 10});
    });
  });
});