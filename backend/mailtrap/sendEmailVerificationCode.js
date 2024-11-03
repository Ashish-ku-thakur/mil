import {
  generatePasswordResetEmailHtml,
  generateResetSuccessEmailHtml,
  generateWelcomeEmailHtml,
  htmlContent,
} from "./htmlContant.js";
import { client, sender } from "./mailtrap.js";

export let sendEmailVerificationCode = async (
  email,
  verificationTokenCreate
) => {
  const recipient = [{ email }]; // this is that guy that i want to send email

  try {
    let res = await client.testing.send({
      from: sender,
      to: recipient,
      subject: "Email verification",
      text: verificationTokenCreate,
      html: htmlContent.repeat("{verificationToken}", verificationTokenCreate),
      category: "For Email verification",
    });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to send email verification");
  }
};

export let sendWelcomeEmail = async (user) => {
  let recipient = [{ email: user.email }];
  let htmlContent = generateWelcomeEmailHtml(user.fullname);
  try {
    let res = await client.testing.send({
      from: sender,
      to: recipient,
      subject: "Welcome to Mil",
      html: htmlContent,
      category: "For Welcome to Mil.com",
    });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to send Welcome to Mil");
  }
};

export let sendPasswordResetLink = async (email, resetURl) => {
  const recipient = [{ email }];
  let htmlContent = generatePasswordResetEmailHtml(resetURl);

  try {
    let res = await client.testing.send({
      from: sender,
      to: recipient,
      subject: "Reset Your Password",
      html: htmlContent,
      category: "For Reset Password Link",
    });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to send Reset Password Link");
  }
};

export let sendResetSuccessEmail = async (email) => {
  const recipient = [{ email }];
  let htmlContent = generateResetSuccessEmailHtml();

  try {
    let res = await client.testing.send({
      from: sender,
      to: recipient,
      subject: "New Password Create Successfully",
      html: htmlContent,
      category: "For New Password Create",
    });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to send New Password Create Successfully");
  }
};
