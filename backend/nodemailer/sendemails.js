import { generateWelcomeEmailHtml, htmlContent } from "../mailtrap/htmlContant.js";
import { transporter } from "./nodemailerconfig.js";

// const sendEmail = async (email) => {
//     try {
//       const info = await transporter.sendMail({
//         from: transporter.options.auth.user, // Sender address
//         to: email, // Recipient email address
//         subject: "Hi, I am testing",
//         text: "This is a test email sent using Nodemailer.", // Plain text message
//         // Optionally, use html: "<b>This is a test email</b>" for HTML email content
//       });
//       console.log("Email sent:", info.messageId);
//     } catch (error) {
//       console.error("Error sending email:", error);
//     }
//   };

export const sendEmail = async (email, verificationTokenCreate) => {
  try {
    const info = await transporter.sendMail({
      from: transporter.options.auth.user, // Sender address
      to: email, // Recipient email address
      subject: "THIS IS FOR YOUR EMAIL-VERIFY",
      html: htmlContent.replace("{verificationToken}", verificationTokenCreate),
      // Optionally, use html: "<b>This is a test email</b>" for HTML email content
    });
    console.log("Email sent:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export let sendwelcomwemail = async (userdata) =>{
  let htmlContant = generateWelcomeEmailHtml(userdata.fullname)
  try {
    let info = await transporter.sendMail({
      from:transporter.options.auth.user,
      to:userdata.email,
      subject: "THIS IS FOR WWELCOME EMAIL",
      html:htmlContant
    })
  } catch (error) {
    console.error("Error sending email:", error);
  }
}
