import { Controller, Get, Header, HttpCode, Post, Logger, Body, Res, Req } from "@nestjs/common";
import { send } from "process";
import { TwilioServices } from "./twilio_sms.service";

const MessagingResponse = require('twilio').twiml.MessagingResponse;

@Controller(`Twilio`)
export class TwilioController {
    constructor(private readonly twilioServices: TwilioServices) {}

    @Get()
    getTwilio(): string {
        return this.twilioServices.getTwilio();
    }

    @Get(`send`)
    sendSms(): any {
        return this.twilioServices.sendSms('+23456543');
    }

    @Post('sms')
    @HttpCode(200)
    @Header('Content-Type', 'text/xml')
    recSms(@Body() test, @Res() res, @Req() req): any {
        const twiml = new MessagingResponse(); 
        if (this.twilioServices.checkNbr(req.body.From)) {
            twiml.message(`Merci Yann tu as aussi une grosse ${req.body.From}`);
        } else {
            twiml.message(`T'es une merde ${req.body.From} car c'est ta première fois`);
        }
        Logger.log(twiml);
        Logger.log('receive msg = ',  test);
        res.end(twiml.toString())
    }
    
}