import { NextRequest, NextResponse } from "next/server";
import { generateEnvFile } from "@/lib/claude";
import { DEMO_OUTPUT } from "@/lib/demo";

export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      input?: string;
      apiKey?: string;
    };

    const { input, apiKey } = body;

    if (!input || typeof input !== "string" || !input.trim()) {
      return NextResponse.json({ error: "input is required" }, { status: 400 });
    }

    if (input.length > 30_000) {
      return NextResponse.json(
        { error: "Input is too long (max 30,000 characters)" },
        { status: 400 }
      );
    }

    const resolvedKey =
      apiKey && typeof apiKey === "string" && apiKey.trim()
        ? apiKey.trim()
        : process.env.ANTHROPIC_API_KEY;

    if (!resolvedKey) {
      return NextResponse.json({ output: DEMO_OUTPUT, demo: true });
    }

    const output = await generateEnvFile(input, resolvedKey);

    return NextResponse.json({ output });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Generation failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
