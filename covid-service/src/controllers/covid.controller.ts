import { Request, Response } from 'express';
import { Body, Controller, Get, Param, Req, Res } from 'routing-controllers';
import { Inject } from 'typedi';
import { CovidDelegate } from '../delegates/covid.delegate';

@Controller('/covid-service/api/v1')
export class CovidController {

    constructor(@Inject('covid.delegate') private covidDelegate: CovidDelegate) { }

    @Get('/total/active')
    async getTotalActiveCases(@Req() req: Request, @Res() res: Response, @Body() body: any) {
        try {
            const activeCases = await this.covidDelegate.getTotalActiveCases();
            return res.send({ activeCases });
        } catch (error) {
            return res.sendStatus(500);
        }
    }
    @Get('/:countryCode/active')
    async getActiveCasesByCountryCode(@Req() req: Request, @Res() res: Response, @Body() body: any, @Param('countryCode') countryCode: string) {
        try {
            const activeCases = await this.covidDelegate.getActiveCasesByCountryCode(countryCode);
            return res.send({ activeCases });
        } catch (error) {
            return res.sendStatus(500);
        }
    }

    @Get('/total/deaths')
    async getTotalDeaths(@Req() req: Request, @Res() res: Response, @Body() body: any) {
        try {
            const deaths = await this.covidDelegate.getTotalDeaths();
            return res.send({ deaths });
        } catch (error) {
            return res.sendStatus(500);
        }
    }

    @Get('/:countryCode/deaths')
    async getDeathsByCountryCode(@Req() req: Request, @Res() res: Response, @Body() body: any, @Param('countryCode') countryCode: string) {
        try {
            const deaths = await this.covidDelegate.getDeathsByCountryCode(countryCode);
            return res.send({ deaths });
        } catch (error) {
            return res.sendStatus(500);
        }
    }
}