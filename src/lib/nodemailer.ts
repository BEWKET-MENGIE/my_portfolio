


// // src/lib/nodemailer.ts
// import nodemailer from "nodemailer";

// const emailUser = process.env.EMAIL_SERVER_USER;
// const emailPass = process.env.EMAIL_SERVER_PASSWORD;

// export const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: emailUser,
//     pass: emailPass,
//   },
// });

// export const mailOptions = {
//   from: process.env.EMAIL_FROM,
//   to: process.env.EMAIL_SERVER_USER, // Sends the message straight to your email
// };




import nodemailer from "nodemailer";

const email = process.env.SMTP_USER;
const pass = process.env.SMTP_PASS;

if (!email || !pass) {
  console.warn("⚠️ Warning: SMTP_USER or SMTP_PASS environment variables are missing.");
}

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: email,
    pass: pass,
  },
});

export const mailOptions = {
  from: email,
  to: email, // This sends the message to your own email address
};