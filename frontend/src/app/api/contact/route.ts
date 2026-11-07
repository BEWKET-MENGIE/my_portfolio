// src/app/api/contact/route.ts (or your exact path)
import { NextResponse } from "next/server";
import { getBackendApiUrl } from "@/lib/backendApi";

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

  // Honeypot spam check
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
    const backendUrl = getBackendApiUrl();
    const targetUrl = `${backendUrl}/contacts`;

    const response = await fetch(targetUrl, {
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

    const responseText = await response.text();
    let result: unknown;

    try {
      result = JSON.parse(responseText);
    } catch {
      console.error(
        `Contact API returned a non-JSON response from ${targetUrl} (status ${response.status}):`,
        responseText
      );
      return NextResponse.json(
        { error: "The message service returned an invalid response. Please try again later." },
        { status: 502 },
      );
    }

    return NextResponse.json(result, { status: response.status });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`Contact message could not reach the backend API (${getBackendApiUrl()}):`, errorMessage);
    
    return NextResponse.json(
      { error: "Messages are temporarily unavailable. Please try again later." },
      { status: 503 },
    );
  }
}