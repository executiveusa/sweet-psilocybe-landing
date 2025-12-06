import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/store/ai/chat
 * Proxy endpoint to forward avatar chat requests to Medusa backend
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Get Medusa backend URL from environment
    const medusaUrl =
      process.env.MEDUSA_BACKEND_URL || "http://localhost:9000";

    // Forward request to Medusa backend
    const response = await fetch(`${medusaUrl}/store/ai/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error proxying avatar chat request:", error);
    return NextResponse.json(
      {
        error: "Failed to communicate with avatar service",
      },
      { status: 500 }
    );
  }
}
