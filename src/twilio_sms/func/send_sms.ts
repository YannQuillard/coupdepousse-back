export function sendSms(): any {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const phoneNbr = `+13322442934`
    const client = require('twilio')(accountSid, authToken);

    client.messages
    .create({
        body: `
        Alors la zone, ça dit quoi?
        C'est l'été, tous les jours, c'est samedi soir
        J'ai trouvé un-un-un bail, j'suis pas là
        J'suis pas à Dubaï, j'suis à l'Escale
        Tout l'monde veut sa palette
        Personne veut soulever des palettes
        Y'a d'la patate qui tourne dans la zone
        Y'a des bâtards qui te souhaitent la mort
        Faut qu'j'nique tout, que j'mette bien la mif'
        Marseille, ma ville, j'l'aime à mort
        `,
        from: phoneNbr,
        to: `+33651625290`
    }).then(message => console.log(message.sid));
}