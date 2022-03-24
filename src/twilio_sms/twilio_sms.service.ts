import { Inject, Injectable, Logger } from "@nestjs/common";
import { sendSms } from "./func/send_sms";
import {User} from '../users/user.model'
import { UsersService } from "src/users/users.service";
import { twiml } from "twilio";
import { create } from "domain";

const MessagingResponse = require('twilio').twiml.MessagingResponse;

@Injectable()
export class TwilioServices {
    @Inject(UsersService)
    private readonly userServices : UsersService
    getTwilio(): string {
        return `I'm twilio ! 🐞`;
    }

    sendSms(phoneNbr: string): string {
        return sendSms(phoneNbr);
    }
}