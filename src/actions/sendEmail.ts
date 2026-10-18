"use server";

import { transporter, mailOptions } from "@/lib/nodemailer";

export async function sendEmail(prevState: any, formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !message) {
    return { success: false, message: "Please fill in all required fields." };
  }

  try {
    await transporter.sendMail({
      ...mailOptions,
      subject: `New Portfolio Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; background-color: #f8fafc; border-radius: 8px;">
          <h2 style="color: #06b6d4;">New Message from Portfolio Contact Form</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          <p style="white-space: pre-wrap;"><strong>Message:</strong></p>
          <p style="background: #ffffff; padding: 15px; border-radius: 6px; border: 1px solid #e2e8f0;">${message}</p>
        </div>
      `,
    });

    return { success: true, message: "Your message has been sent successfully!" };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { success: false, message: "Failed to send message. Please try again later." };
  }
}