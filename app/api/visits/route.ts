import { NextResponse } from "next/server";
import { incrementVisitStats } from "@/lib/visitStats";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST() {
  try {
    const stats = await incrementVisitStats();

    return NextResponse.json(stats, {
      headers: {
        "Cache-Control": "no-store"
      }
    });
  } catch {
    return NextResponse.json(
      { message: "Unable to update visit stats." },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store"
        }
      }
    );
  }
}
