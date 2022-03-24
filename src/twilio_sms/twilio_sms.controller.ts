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
    @Inject(UsersService)
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
    async recSms(@Body() test, @Res() res, @Req() req): Promise<User> {
        const twiml = new MessagingResponse(); 
        const user = await this.userService.findOneByPhone(req.body.From);

        if (inSubscription) {
            inSubscription = false;
            let signupVar: CreateUserDto = {
                firstName: req.body.Body,
                phone: req.body.From,
                freeworker: false
            }
            twiml.message(`Merci ${signupVar.firstName} de votre inscription`);
            this.userService.create(signupVar);
            res.end(twiml.toString());
        }
        if (user) {
            twiml.message(`Merci je t'ai reconnu ${user.firstName}`);
            res.end(twiml.toString())
        } else {
            twiml.message(`Quel est votre nom ?`);
            inSubscription = true;
            res.end(twiml.toString());
            // const subscribedUser = (await this.twilioServices.signUp(req.body.From)).firstName;
            // Logger.log(`The subscribed users : ${subscribedUser}`);
        }
        return user
    }
    
}