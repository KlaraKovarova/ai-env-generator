import Anthropic from "@anthropic-ai/sdk";

function getClient(apiKey?: string) {
  return new Anthropic({ apiKey: apiKey ?? process.env.ANTHROPIC_API_KEY });
}

export type CommitStyle = "conventional" | "angular" | "simple";

const STYLE_INSTRUCTIONS: Record<CommitStyle, string> = {
  conventional: `Use the Conventional Commits specification (https://www.conventionalcommits.org).
Format: <type>(<optional scope>): <short description>

Types: feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert
Body and footer are optional but recommended for non-trivial changes.
Breaking changes must be noted with BREAKING CHANGE: in footer or ! after type.`,
  angular: `Use the Angular commit message convention.
Format: <type>(<scope>): <subject>

Types: feat, fix, docs, style, refactor, perf, test, chore
Subject: imperative mood, no capital first letter, no period at end.
Body wraps at 72 chars. Footer for breaking changes and issue refs.`,
  simple: `Use a simple, descriptive commit message.
Format: Short subject line (50 chars max, imperative mood, no period).
Optionally follow with a blank line and a body paragraph explaining why.
No special prefix required.`,
};

const BASE_SYSTEM = `You are an expert software engineer who writes excellent, precise git commit messages.
Your output must be ONLY the commit message text — no markdown fences, no explanation, no preamble.`;

export async function generateCommitMessage(
  input: string,
  style: CommitStyle,
  apiKey?: string
): Promise<string> {
  const styleGuide = STYLE_INSTRUCTIONS[style];

  const message = await getClient(apiKey).messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 512,
    system: BASE_SYSTEM,
    messages: [
      {
        role: "user",
        content: `Style guide:\n${styleGuide}\n\nChanges (diff or description):\n${input}\n\nWrite a commit message for these changes.`,
      },
    ],
  });

  const block = message.content[0];
  if (block.type !== "text") throw new Error("Unexpected response from Claude");
  return block.text.trim();
}
