import 'reflect-metadata';
import { Inject, Service } from 'typedi';
import { CovidService } from '../service/covid-service';
import { MessageUtility } from '../utils/message-utility';

@Service('chat.bot.delegate')
export class ChatBotDelegate {

    constructor(@Inject('covid.service') private covidService: CovidService) { }

    public async getResult(receivedMessage: string): Promise<string> {
        const { key, countryCode } = MessageUtility.getKeyAndCountryCode(receivedMessage);

        let sendBody = '';

        try {
            if (key && countryCode) {
                const isTotal = countryCode.toLowerCase() === 'total';
                if (key.toLowerCase() === 'cases') {
                    if (isTotal) {
                        const activeCases: number = await this.covidService.getTotalActiveCases();
                        sendBody = MessageUtility.totalActiveCasesMessage(activeCases);
                    } else {
                        const activeCases: number = await this.covidService.getTotalActiveCasesByCountryCode(countryCode);
                        sendBody = MessageUtility.totalActiveCasesByCountryMessage(countryCode, activeCases);
                    }
                } else if (key.toLowerCase() === 'deaths') {
                    if (isTotal) {
                        const deaths: number = await this.covidService.getTotalDeaths();
                        sendBody = MessageUtility.totalDeathsMessage(deaths);
                    } else {
                        const deaths: number = await this.covidService.getTotalDeathsByCountryCode(countryCode);
                        sendBody = MessageUtility.totalDeathsByCountry(countryCode, deaths);
                    }
                } else {
                    sendBody = MessageUtility.invalidQueryMessage();
                }
            } else {
                sendBody = MessageUtility.invalidQueryMessage();
            }
        } catch (e) {
            sendBody = MessageUtility.invalidQueryMessage();
        }

        return sendBody;
    }
}