import { Request, Response } from 'express';
import { Body, Controller, Post, Req, Res } from 'routing-controllers';
import { Inject } from 'typedi';
import { ChatBotDelegate } from '../delegates/chat-bot.delegate';
import { TwilioService } from '../service/twilio-service';
import { ErrorHandler } from '../utils/error.handler';
import { ResponseUtility } from '../utils/response.utility';

@Controller('/chat-bot-service/api/v1')
export class ChatBotController {

    constructor(
        @Inject('chat.bot.delegate') private chatBotDelegate: ChatBotDelegate,
        @Inject('twilio.service') private twilioService: TwilioService,
    ) { }

    @Post('/hook')
    async hook(@Req() req: Request, @Res() res: Response, @Body() body: any) {
        try {
            // Get From, To and Body info from the request body.
            const { To: from, From: to, Body: receivedMessage } = body;

            // Get the result based on the received message from the user.
            const message: string = await this.chatBotDelegate.getResult(receivedMessage);

            // Reply back to the user using twilio service.
            return this.twilioService
                .sendMessage(from, to, message)
                .then(() => res.status(200).end())
                .catch(() => res.status(500).end());
        } catch (error) {
            return res.send(ResponseUtility.generateResponse(false, ErrorHandler.handle(error)));
        }
    }
}