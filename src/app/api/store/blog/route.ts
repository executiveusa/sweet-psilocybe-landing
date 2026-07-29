import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/store/blog
 * Proxy endpoint to forward blog requests to Medusa backend
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Get Medusa backend URL from environment
    const medusaUrl =
      process.env.MEDUSA_BACKEND_URL || "http://localhost:9000";

    // Forward request to Medusa backend
    const response = await fetch(
      `${medusaUrl}/store/blog/posts?${searchParams.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error proxying blog request:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch blog posts",
      },
      { status: 500 }
    );
  }
}
