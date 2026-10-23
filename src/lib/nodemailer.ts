import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST || "smtp.gmail.com",
  port: Number(process.env.EMAIL_SERVER_PORT) || 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export interface SendEmailOptions {
  name: string;
  email: string;
  message: string;
}

export async function sendEmail({ name, email, message }: SendEmailOptions) {
  const mailOptions = {
    from: `"${name}" <${process.env.EMAIL_USER}>`,
    replyTo: email,
    to: process.env.EMAIL_USER,
    subject: `New Portfolio Message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eaeaea; border-radius: 10px; background-color: #f9f9f9;">
        <h2 style="color: #10b981; border-bottom: 2px solid #eaeaea; padding-bottom: 10px;">New Contact Form Message</h2>
        <p style="font-size: 16px;"><strong>Name:</strong> ${name}</p>
        <p style="font-size: 16px;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #2563eb;">${email}</a></p>
        <div style="margin-top: 20px; padding: 15px; background: #ffffff; border-left: 4px solid #10b981; border-radius: 4px;">
          <p style="font-size: 14px; white-space: pre-wrap; margin: 0;">${message}</p>
        </div>
        <p style="font-size: 12px; color: #888; margin-top: 30px; text-align: center;">This message was sent from your portfolio contact form.</p>
      </div>
    `,
  };

  return await transporter.sendMail(mailOptions);
}