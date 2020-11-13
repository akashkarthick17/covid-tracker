import fs from 'fs';
import { CovidAPI } from '../service/covid-api.service';

export class SchedulerUtility {

  public static async collectActiveCasesByCountry() {
    const covidAPI: CovidAPI = new CovidAPI();
    const summary = await covidAPI.getSummary();
    const { Countries: countries } = summary;
    const activeCasesByCountries = { countries: [] };
    countries.forEach(country => {
      const { CountryCode, Country, TotalConfirmed, TotalDeaths, TotalRecovered } = country;
      const activeCasesByCountry = {
        countryCode: CountryCode,
        country: Country,
        activeCases: TotalConfirmed - (TotalDeaths + TotalRecovered),
      }
      activeCasesByCountries.countries.push(activeCasesByCountry);
    });

    fs.writeFileSync(__dirname + '/../../storage/active-cases-by-country.json', JSON.stringify(activeCasesByCountries));
  }
}