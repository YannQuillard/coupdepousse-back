import { Module } from "@nestjs/common";
import { UsersModule } from "src/users/users.module";
import { TwilioController } from "./twilio_sms.controller";
import { TwilioServices } from "./twilio_sms.service";

@Module({
    imports: [UsersModule],
    controllers: [TwilioController],
    providers: [TwilioServices],
})
export class TwilioModule {}