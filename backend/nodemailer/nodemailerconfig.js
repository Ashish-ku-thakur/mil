import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  secure: true,
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: "bhavesh10683@gmail.com",
    pass: "bqixvrolekwfzmdw", // For security, use environment variables for sensitive information.
  },
});
