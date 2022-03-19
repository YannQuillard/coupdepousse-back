import { Controller, Get } from "@nestjs/common";
import { send } from "process";
import { TwilioServices } from "./twilio_sms.service";

@Controller(`Twilio`)
export class TwilioController {
    constructor(private readonly twilioServices: TwilioServices) {}

    @Get()
    getTwilio(): string {
        return this.twilioServices.getTwilio();
    }

    @Get(`send`)
    sendSms(): any {
        return this.twilioServices.sendSms();
    }
}