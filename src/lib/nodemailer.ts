


// src/lib/nodemailer.ts
import nodemailer from "nodemailer";

const emailUser = process.env.EMAIL_SERVER_USER;
const emailPass = process.env.EMAIL_SERVER_PASSWORD;

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: emailUser,
    pass: emailPass,
  },
});

export const mailOptions = {
  from: process.env.EMAIL_FROM,
  to: process.env.EMAIL_SERVER_USER, // Sends the message straight to your email
};