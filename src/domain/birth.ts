export interface Birth {
  id: number;
  year: number;
  who: string;
}

export interface ThisDay {
  day: number;
  month: number;
}

export interface BirthsOnThisDayRepository {
  getListForThisDay(thisDay: ThisDay): Promise<Birth[]>;
}

