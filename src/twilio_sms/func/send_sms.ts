export function sendSms(phoneNbr: string): any {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioPhoneNbr = process.env.TWILIO_PHONE_NUMBER;
    const client = require('twilio')(accountSid, authToken);

    client.messages
    .create({
        body: `TEST`,
        from: twilioPhoneNbr,
        to: phoneNbr
    }).then(message => console.log(message.sid));
}