import { Controller, Get, Header, HttpCode, Post, Logger, Body, Res, Req, Inject } from "@nestjs/common";
import { check } from "prettier";
import { send } from "process";

import {User} from '../users/user.model'
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from "src/users/users.service";
import { TwilioServices } from "./twilio_sms.service";
import { first } from "rxjs";

const MessagingResponse = require('twilio').twiml.MessagingResponse;
let inSubscription: boolean = false;


@Controller(`Twilio`)
export class TwilioController {
    constructor(private readonly twilioServices: TwilioServices, private readonly userService: UsersService) {}

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
    async recSms(@Body() test, @Res() res, @Req() req): Promise<User>{
        const twiml = new MessagingResponse(); 
        const user = await this.userService.findOneByPhone(req.body.From);

        if (user) {
            const msg = this.twilioServices.manageMessage(user, twiml, req);
        } else {
            this.twilioServices.subscribe(req, twiml, res);
        }
        res.end(twiml.toString());
        return user;
    }
    
}