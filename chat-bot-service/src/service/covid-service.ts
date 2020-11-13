import fetch from 'node-fetch';
import { Service } from 'typedi';
import { ActiveCases } from '../models/active-cases.model';
import { Deaths } from '../models/deaths.model';

@Service('covid.service')
export class CovidService {
  private url = process.env.COVID_SERVICE_URL + '/covid-service';

  async getTotalActiveCases(): Promise<number> {
    return fetch(`${this.url}/api/v1/total/active`)
      .then<ActiveCases>(res => res.json())
      .then<number>((res: ActiveCases) => {
        const { activeCases } = res;
        if (activeCases) {
          return activeCases;
        } else {
          throw Error('Invalid country code');
        }
      });
  }

  async getTotalDeaths(): Promise<number> {
    return fetch(`${this.url}/api/v1/total/deaths`)
      .then<Deaths>(res => res.json())
      .then<number>((res: Deaths) => {
        const { deaths } = res;
        if (deaths) {
          return deaths;
        } else {
          throw Error('Invalid country code');
        }
      });
  }

  async getTotalActiveCasesByCountryCode(countryCode: string): Promise<number> {
    return fetch(`${this.url}/api/v1/${countryCode}/active`)
      .then<ActiveCases>(res => res.json())
      .then<number>((res: ActiveCases) => {
        const { activeCases } = res;
        if (activeCases) {
          return activeCases;
        } else {
          throw Error('Invalid country code');
        }
      });
  }
  async getTotalDeathsByCountryCode(countryCode: string): Promise<number> {
    return fetch(`${this.url}/api/v1/${countryCode}/deaths`)
      .then<Deaths>(res => res.json())
      .then<number>((res: Deaths) => {
        const { deaths } = res;
        if (deaths) {
          return deaths;
        } else {
          throw Error('Invalid country code');
        }
      });
  }
}