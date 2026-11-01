import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/nodemailer";

type ContactBody = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  hp_confirm?: unknown;
};

function isContactBody(value: unknown): value is ContactBody {
  return typeof value === "object" && value !== null;
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }

  if (!isContactBody(body)) {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, email, message, hp_confirm } = body;

  if (hp_confirm) {
    return NextResponse.json({ error: "Spam detected." }, { status: 400 });
  }

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof message !== "string" ||
    !name.trim() ||
    !email.trim() ||
    !message.trim()
  ) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }

  const normalizedName = name.trim();
  const normalizedEmail = email.trim();
  const normalizedMessage = message.trim();

  if (
    normalizedName.length > 100 ||
    normalizedEmail.length > 254 ||
    normalizedMessage.length > 5000 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail) ||
    /[\r\n]/.test(normalizedName)
  ) {
    return NextResponse.json({ error: "Please check your contact details and try again." }, { status: 400 });
  }

  try {
    await sendEmail({
      name: normalizedName,
      email: normalizedEmail,
      message: normalizedMessage,
    });

    return NextResponse.json(
      { success: true, message: "Message sent successfully!" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Contact message delivery failed:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 },
    );
  }
}