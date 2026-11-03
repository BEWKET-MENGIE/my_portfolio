import { NextResponse } from "next/server";
type ContactBody = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  hp_confirm?: unknown;
};

function normalizeApiBaseUrl(value: string | undefined) {
  const baseUrl = (value ?? "http://127.0.0.1:4000/api").trim();

  if (!baseUrl) {
    return "http://127.0.0.1:4000/api";
  }

  return baseUrl
    .replace(/^https?:\/\/localhost(?=[:/]|$)/i, "http://127.0.0.1")
    .replace(/^https?:\/\/\[::1\](?=[:/]|$)/i, "http://127.0.0.1");
}

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

  const backendUrl = normalizeApiBaseUrl(
    process.env.BACKEND_API_URL || process.env.NEXT_PUBLIC_API_URL,
  );
  try {
    const response = await fetch(`${backendUrl.replace(/\/$/, "")}/contacts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: normalizedName,
        email: normalizedEmail,
        message: normalizedMessage,
        hp_confirm: "",
      }),
      cache: "no-store",
    });
    const result: unknown = await response.json();
    return NextResponse.json(result, { status: response.status });
  } catch (error) {
    console.error("Contact message could not reach the portfolio API:", error);
    return NextResponse.json(
      { error: "Messages are temporarily unavailable. Please try again later." },
      { status: 503 },
    );
  }
}