import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message, hp_confirm } = body;

    if (hp_confirm) {
      return NextResponse.json({ error: "Spam detected." }, { status: 400 });
    }

    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    await sendEmail({ name, email, message });

    return NextResponse.json({ success: true, message: "Message sent successfully!" }, { status: 200 });
  } catch (error: any) {
    // Log the detailed error to your terminal console
    console.error("Detailed Contact API Error:", {
      message: error?.message,
      code: error?.code,
      command: error?.command,
      response: error?.response,
    });

    return NextResponse.json(
      { error: error?.message || "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}