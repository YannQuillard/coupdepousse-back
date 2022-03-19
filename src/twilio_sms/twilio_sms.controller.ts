import { Controller, Get } from "@nestjs/common";
import { TwilioServices } from "./twilio_sms.service";

@Controller(`Twilio`)
export class TwilioController {
    constructor(private readonly twilioServices: TwilioServices) {}

    @Get()
    getTwilio(): string {
        return this.twilioServices.sendSms();
    }
}