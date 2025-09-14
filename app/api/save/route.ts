import { NextRequest, NextResponse } from "next/server";
import { Slide, ThemeSettings } from "../../../lib/ppt/ppttypes";

interface SaveRequest {
  slides: Slide[];
  theme: ThemeSettings;
}

const presentations = new Map<string, SaveRequest>();

function generateRandomId(): string {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 12; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export async function POST(request: NextRequest) {
  try {
    const body: SaveRequest = await request.json();

    if (!body.slides || !body.theme) {
      return NextResponse.json(
        { error: "Missing slides or theme data" },
        { status: 400 }
      );
    }

    const presentationId = generateRandomId();
    presentations.set(presentationId, body);

    return NextResponse.json({
      id: presentationId,
      url: `${request.nextUrl.origin}/builder?presentation=${presentationId}`,
      message: "Presentation saved successfully",
    });
  } catch (error) {
    console.error("Error saving presentation:", error);
    return NextResponse.json(
      { error: "Failed to save presentation" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "Presentation ID is required" },
      { status: 400 }
    );
  }

  const presentation = presentations.get(id);

  if (!presentation) {
    return NextResponse.json(
      { error: "Presentation not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(presentation);
}
