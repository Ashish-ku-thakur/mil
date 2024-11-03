// Looking to send emails in production? Check out our Email API/SMTP product!
import {MailtrapClient} from 'mailtrap'

const TOKEN = process.env.MAILTRAP_API_TOKEN;

export const client = new MailtrapClient({
  token: TOKEN,
});

 export const sender = {
  email: "hello@example.com",
  name: "Ashish mil.com",
};
// const recipients = [
//   {
//     email: "bhavesh10683@gmail.com",
//   }
// ];

// client.testing
//   .send({
//     from: sender,
//     to: recipients,
//     subject: "You are awesome!",
//     text: "Congrats for sending test email with Mailtrap!",
//     category: "Integration Test",
//   })
//   .then(console.log, console.error);