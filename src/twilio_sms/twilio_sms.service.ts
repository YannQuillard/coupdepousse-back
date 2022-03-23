import { Inject, Injectable, Logger } from "@nestjs/common";
import { sendSms } from "./func/send_sms";
import { UsersService } from "src/users/users.service";

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

    checkNbr(phoneNbr: string) {
        if(this.userServices.findOneByPhone("8336702") !== undefined) {
            Logger.log(`J'ai retrouver le num : ${phoneNbr} dans la base de données`);
            return true
        } else {
            Logger.log(`Je n'ai pas retrouver le num : ${phoneNbr} dans la base de données`);
            return false
        }

    }
}