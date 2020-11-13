import { Request, Response } from 'express';
import { Controller, Get, Req, Res } from 'routing-controllers';
import { ResponseUtility } from '../utils/response.utility';

@Controller('/covid-service')
export class TestController {

    @Get('/health')
    async health(@Req() req: Request, @Res() res: Response) {
        return res.send(ResponseUtility.generateResponse(true, {message: 'The service is up and running.'}));
    }
}