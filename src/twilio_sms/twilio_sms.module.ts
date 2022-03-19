import { Module } from "@nestjs/common";
import { TwilioController } from "./twilio_sms.controller";
import { TwilioServices } from "./twilio_sms.service";

@Module({
    controllers: [TwilioController],
    providers: [TwilioServices],
})
export class TwilioModule {}