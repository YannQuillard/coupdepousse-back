import { Controller, Get, Header, HttpCode, Post } from "@nestjs/common";
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
    recSms(): any {
        const twiml = new MessagingResponse();
        twiml.message('HELLO WORLD 2')
    }
    
}