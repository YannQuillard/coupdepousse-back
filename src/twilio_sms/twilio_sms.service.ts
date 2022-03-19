import { Injectable } from "@nestjs/common";
import { sendSms } from "./func/send_sms";

@Injectable()
export class TwilioServices {
    getTwilio(): string {
        return `I'm twilio ! 🐞`;
    }

    sendSms(): string {
        return sendSms();
    }
}