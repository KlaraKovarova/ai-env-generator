# CommitCraft·AI – AI Commit Message Generator

Paste a git diff or describe your changes and get a perfect conventional commit message in seconds. Powered by Claude AI.

## Features

- **Instant generation** – commit message in seconds from a diff or plain description
- **Three commit styles** – Conventional Commits, Angular, or Simple
- **3 free generations** – no account required to try
- **Bring Your Own Key (BYOK)** – use your Anthropic API key for unlimited generations
- **Your code is never stored** – stateless, privacy-first

## Getting Started

### Prerequisites

- Node.js 18+
- An Anthropic API key (optional – 3 free uses included via shared key)

### Local Development

```bash
cd commit-msg-gen
npm install
# Create .env.local and add: ANTHROPIC_API_KEY=sk-ant-...
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Deploy to Vercel

1. Import the `commit-msg-gen` folder into [Vercel](https://vercel.com)
2. Set `ANTHROPIC_API_KEY` in environment variables (optional – enables server-side key)
3. Deploy

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `ANTHROPIC_API_KEY` | Optional | Server-side Anthropic key. Users can also provide their own via BYOK. |

## Tech Stack

- [Next.js](https://nextjs.org) – React framework
- [Anthropic Claude](https://anthropic.com) – AI backbone (claude-haiku-4-5)
- [Tailwind CSS v4](https://tailwindcss.com) – Styling

## Pricing Model

| Tier | Generations | Cost |
|------|-------------|------|
| Free | 3 per session | $0 |
| BYOK | Unlimited | Your API costs only |

## License

MIT – see [LICENSE](LICENSE)

---

### More AI developer tools

- [ReadmeGen](https://readme-gen.vercel.app) – AI README generator
- [CodeReview·AI](https://codereview-ai.vercel.app) – Instant AI code reviews
- [TestGen·AI](https://testgen-ai.vercel.app) – AI unit test generator
