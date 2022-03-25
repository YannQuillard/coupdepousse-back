import { Module } from "@nestjs/common";
import { TasksModule } from "src/tasks/tasks.module";
import { UsersModule } from "src/users/users.module";
import { TwilioController } from "./twilio_sms.controller";
import { TwilioServices } from "./twilio_sms.service";

@Module({
    imports: [UsersModule, TasksModule],
    controllers: [TwilioController],
    providers: [TwilioServices],
})
export class TwilioModule {}