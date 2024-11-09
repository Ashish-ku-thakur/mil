import {
  generatePasswordResetEmailHtml,
  generateResetSuccessEmailHtml,
  generateWelcomeEmailHtml,
  htmlContent,
} from "./htmlContant.js";
import { client, sender } from "./mailtrap.js";



export const sendEmailVerificationCode = async (email, verificationToken) => {
  try {
    const res = await client.testing
      .send({
      from: sender,  // Ensure sender is defined as the sender's email address
      to: email,     // Pass email as a string, not as an array
      subject: 'Verify your email',
      // Uncomment and use the line below if you want to send HTML content
      // html: htmlContent.replace("{verificationToken}", verificationToken),
      text: verificationToken, // or 'text: verificationToken' if sending as plain text
      category: 'Email Verification',
    });
    return res; // Optional: returning the response if you want to handle it
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
