import Anthropic from "@anthropic-ai/sdk";

function getClient(apiKey?: string) {
  return new Anthropic({ apiKey: apiKey ?? process.env.ANTHROPIC_API_KEY });
}

const SYSTEM_PROMPT = `You are an expert DevOps and full-stack engineer. Your job is to generate a complete, well-documented .env.example file from code snippets, package.json files, docker-compose configs, or stack descriptions.

Rules:
1. Group variables by service/concern using section comments (# ====... header style)
2. Include ALL environment variables the stack needs — don't omit any
3. Provide sensible placeholder values (e.g. sk_test_ for Stripe, empty string for secrets)
4. Add a one-line comment above each variable explaining what it is and where to get it
5. Use SCREAMING_SNAKE_CASE for all variable names
6. For secrets that need to be generated, add a comment like: # generate with: openssl rand -base64 32
7. For service-specific values, add a URL hint like: # get from https://dashboard.stripe.com/apikeys
8. Prefix public/client-side variables with NEXT_PUBLIC_ for Next.js, VITE_ for Vite, REACT_APP_ for CRA
9. Detect common services automatically: databases (Postgres, MySQL, MongoDB, Redis, SQLite), auth providers (next-auth, clerk, auth0, supabase), payments (Stripe, PayPal, Lemon Squeezy), email (SendGrid, Resend, Mailgun, Postmark), storage (S3, Cloudinary, UploadThing), monitoring (Sentry, LogRocket), analytics (Google Analytics, Mixpanel, Posthog), AI APIs (OpenAI, Anthropic, Replicate), messaging (Slack, Discord, Twilio)

Output ONLY the raw .env.example file content — no markdown fences, no explanation, no preamble.`;

export async function generateEnvFile(input: string, apiKey?: string): Promise<string> {
  const message = await getClient(apiKey).messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 2048,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: `Generate a complete .env.example file for this project:\n\n${input}`,
      },
    ],
  });

  const block = message.content[0];
  if (block.type !== "text") throw new Error("Unexpected response from Claude");
  return block.text.trim();
}
