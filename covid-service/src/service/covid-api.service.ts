import fs from 'fs';
import fetch from 'node-fetch';
import { Service } from 'typedi';
import { WorldTotal } from '../models/active-cases.model';
import { Summary } from '../models/summary.model';

@Service('covid.api')
export class CovidAPI {

  private url = process.env.COVID_API_URL;

  async getTotalActiveCases(): Promise<number> {
    return fetch(`${this.url}/world/total`)
      .then<WorldTotal>(res => res.json())
      .then<number>((res: WorldTotal) => {
        return res.TotalConfirmed - (res.TotalDeaths + res.TotalRecovered);
      });
  }

  async getTotalDeaths(): Promise<number> {
    return fetch(`${this.url}/world/total`)
      .then<WorldTotal>(res => res.json())
      .then<number>((res: WorldTotal) => {
        return res.TotalDeaths;
      });
  }

  async getTotalActiveCasesByCountryCode(countryCode: string): Promise<number> {
    const rawData = fs.readFileSync(__dirname + '/../../storage/active-cases-by-country.json');
    try {
      const { countries } = JSON.parse(rawData.toString());
      const country = countries.find(country => country.countryCode === countryCode);
      return country.activeCases;
    } catch (e) {
      throw e;
    }
  }
  async getTotalDeathsByCountryCode(countryCode: string): Promise<number> {
    return fetch(`${this.url}/summary`)
      .then<Summary>(res => res.json())
      .then<number>((res: Summary) => {
        const { Countries: countries } = res;
        const country = countries.find(country => country.CountryCode === countryCode);
        if (country) {
          return country.TotalDeaths;
        } else {
          throw Error('Invalid Country Code');
        }
      });
  }

  async getSummary(): Promise<Summary> {
    console.log(this.url);
    return fetch(`${this.url}/summary`)
      .then<Summary>(res => res.json());
  }
}