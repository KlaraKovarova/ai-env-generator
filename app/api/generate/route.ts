import { NextRequest, NextResponse } from "next/server";
import { generateCommitMessage, type CommitStyle } from "@/lib/claude";
import { DEMO_COMMIT } from "@/lib/demo";

export const maxDuration = 30;

const VALID_STYLES: CommitStyle[] = ["conventional", "angular", "simple"];

function isValidStyle(s: string): s is CommitStyle {
  return VALID_STYLES.includes(s as CommitStyle);
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      input?: string;
      style?: string;
      apiKey?: string;
    };

    const { input, style: rawStyle, apiKey } = body;

    if (!input || typeof input !== "string" || !input.trim()) {
      return NextResponse.json({ error: "input is required" }, { status: 400 });
    }

    if (input.length > 30_000) {
      return NextResponse.json(
        { error: "Input is too long (max 30,000 characters)" },
        { status: 400 }
      );
    }

    const style: CommitStyle =
      rawStyle && typeof rawStyle === "string" && isValidStyle(rawStyle)
        ? rawStyle
        : "conventional";

    const resolvedKey =
      apiKey && typeof apiKey === "string" && apiKey.trim()
        ? apiKey.trim()
        : process.env.ANTHROPIC_API_KEY;

    if (!resolvedKey) {
      return NextResponse.json({ message: DEMO_COMMIT, demo: true });
    }

    const message = await generateCommitMessage(input, style, resolvedKey);

    return NextResponse.json({ message });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Generation failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
