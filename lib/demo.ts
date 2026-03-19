export const DEMO_INPUT = `{
  "name": "my-saas-app",
  "dependencies": {
    "next": "^14.0.0",
    "next-auth": "^4.24.0",
    "prisma": "^5.0.0",
    "@prisma/client": "^5.0.0",
    "stripe": "^14.0.0",
    "resend": "^2.0.0",
    "redis": "^4.6.0",
    "uploadthing": "^6.0.0"
  }
}`;

export const DEMO_OUTPUT = `# =============================================================================
# Application
# =============================================================================

# Base URL of the application (no trailing slash)
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Node environment: development | production | test
NODE_ENV=development

# =============================================================================
# Authentication (next-auth)
# =============================================================================

# Secret used to sign session tokens — generate with: openssl rand -base64 32
NEXTAUTH_SECRET=

# Full URL to your deployed app (must match NEXT_PUBLIC_APP_URL in production)
NEXTAUTH_URL=http://localhost:3000

# OAuth providers (add only the ones you use)
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# =============================================================================
# Database (Prisma)
# =============================================================================

# PostgreSQL connection string
# Format: postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public
DATABASE_URL=postgresql://postgres:password@localhost:5432/myapp?schema=public

# =============================================================================
# Payments (Stripe)
# =============================================================================

# Stripe API keys — get from https://dashboard.stripe.com/apikeys
STRIPE_SECRET_KEY=sk_test_
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_

# Webhook secret — get from https://dashboard.stripe.com/webhooks
STRIPE_WEBHOOK_SECRET=whsec_

# Price ID for your subscription plan
STRIPE_PRICE_ID=price_

# =============================================================================
# Email (Resend)
# =============================================================================

# Resend API key — get from https://resend.com/api-keys
RESEND_API_KEY=re_

# Verified sender address
EMAIL_FROM=noreply@example.com

# =============================================================================
# Cache (Redis)
# =============================================================================

# Redis connection URL
# Format: redis://[:password@]host[:port][/db-number]
REDIS_URL=redis://localhost:6379

# =============================================================================
# File Uploads (UploadThing)
# =============================================================================

# UploadThing credentials — get from https://uploadthing.com/dashboard
UPLOADTHING_SECRET=sk_live_
UPLOADTHING_APP_ID=`;
