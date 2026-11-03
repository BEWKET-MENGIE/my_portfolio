import { NextResponse } from "next/server";
import { getBackendApiUrl } from "@/lib/backendApi";

async function forwardResponse(response: Response) {
  const responseText = await response.text();

  try {
    return NextResponse.json(JSON.parse(responseText), {
      status: response.status,
    });
  } catch {
    console.error(
      `Analytics API returned a non-JSON response (status ${response.status}).`,
    );
    return NextResponse.json(
      { error: "The analytics service returned an invalid response." },
      { status: 502 },
    );
  }
}

export async function GET() {
  try {
    const response = await fetch(`${getBackendApiUrl()}/analytics/public`, {
      cache: "no-store",
    });
    return await forwardResponse(response);
  } catch (error) {
    console.error("Could not reach the portfolio analytics API:", error);
    return NextResponse.json(
      { error: "Portfolio statistics are temporarily unavailable." },
      { status: 503 },
    );
  }
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Request body must be valid JSON." },
      { status: 400 },
    );
  }

  try {
    const response = await fetch(`${getBackendApiUrl()}/analytics/track`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    });
    return await forwardResponse(response);
  } catch (error) {
    console.error("Could not reach the portfolio analytics API:", error);
    return NextResponse.json(
      { error: "Portfolio statistics are temporarily unavailable." },
      { status: 503 },
    );
  }
}
