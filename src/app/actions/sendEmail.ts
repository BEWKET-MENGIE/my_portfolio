// app/actions/sendEmail.ts
'use server';

import { transporter } from '@/lib/nodemailer';

export async function sendEmail(formData: { name: string; email: string; message: string }) {
  const { name, email, message } = formData;

  if (!name || !email || !message) {
    return { success: false, error: 'All fields are required.' };
  }

  try {
    await transporter.sendMail({
      from: `"${name}" <${process.env.EMAIL_SERVER_USER}>`, // Sender address
      to: process.env.CONTACT_EMAIL,                      // Your inbox
      subject: `New Portfolio Message from ${name}`,
      replyTo: email,                                     // Clicking "Reply" emails the visitor directly
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p style="background: #f9f9f9; padding: 15px; border-radius: 4px;">${message}</p>
        </div>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error('Nodemailer error:', error);
    return { success: false, error: 'Failed to send email. Please try again.' };
  }
}