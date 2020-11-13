import 'reflect-metadata';
import { Inject, Service } from 'typedi';
import { CovidAPI } from '../service/covid-api.service';

@Service('covid.delegate')
export class CovidDelegate {

    constructor(@Inject('covid.api') private covidAPI: CovidAPI) { }

    async getTotalActiveCases() {
        try {
            return this.covidAPI.getTotalActiveCases();
        } catch (error) {
            throw error;
        }
    }

    async getActiveCasesByCountryCode(countryCode: string) {
        try {
            return this.covidAPI.getTotalActiveCasesByCountryCode(countryCode);
        } catch (error) {
            throw error;
        }
    }

    async getTotalDeaths() {
        try {
            return this.covidAPI.getTotalDeaths();
        } catch (error) {
            throw error;
        }
    }

    async getDeathsByCountryCode(countryCode: string) {
        try {
            return this.covidAPI.getTotalDeathsByCountryCode(countryCode);
        } catch (error) {
            throw error;
        }
    }
}