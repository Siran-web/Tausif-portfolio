# Email Delivery Setup & Configuration Guide

This guide details the complete configuration required to deliver automated inquiry emails for the **Tausif Raza — Architect & Interior Designer** portfolio website.

---

## Architecture Overview

When a visitor submits the Project Inquiry form on the website:
1. **Server Route Handler (`app/api/inquire/route.ts`)**: Validates input, applies rate limiting and honeypot spam protection, and sanitizes strings.
2. **Owner Notification Email**: Dispatched to `CONTACT_EMAIL` with full project specifications, budget, area, timeline, and client brief. The client's email is set as `replyTo`.
3. **Visitor Confirmation Email**: Dispatched to the client's email with a warm, personalized acknowledgment matching the portfolio's architectural aesthetic.

---

## 1. Create a Resend Account

1. Visit [https://resend.com](https://resend.com) and create an account (or sign in).
2. Navigate to **API Keys** in the sidebar: [https://resend.com/api-keys](https://resend.com/api-keys).
3. Click **Create API Key**:
   - **Name**: `Tausif Portfolio Production` (or `Local Dev`)
   - **Permission**: `Full access` or `Sending access`
4. Copy the generated API key (format: `re_xxxxxxxxxxxxxxxxx`). *Note: Resend only displays the full secret key once.*

---

## 2. Verify Your Sending Domain (Crucial for Production)

> [!IMPORTANT]
> **Why Domain Verification is Required:**
> By default, Resend provides the sandbox address `onboarding@resend.dev`. When using `onboarding@resend.dev`, Resend's security policy **only allows delivery to the account owner's registration email**.
> To send confirmation emails to arbitrary visitor email addresses (and use custom branded senders like `hello@tausifraza.com`), you **must verify a custom domain**.

### Domain Verification Steps:
1. In your Resend dashboard, go to **Domains**: [https://resend.com/domains](https://resend.com/domains).
2. Click **Add Domain** and enter your root or sub-domain (e.g., `tausifraza.com` or `mail.tausifraza.com`).
3. Select your region (e.g., `North America` or `Europe`).
4. Resend will display DNS records to add at your DNS provider (e.g., Cloudflare, GoDaddy, Namecheap, Vercel DNS):
   - **DKIM** (TXT / CNAME records)
   - **SPF** (TXT record)
   - **MX** or return-path records
5. Add these records in your DNS management console and wait a few minutes.
6. Click **Verify DNS Records** in Resend until the status shows **Verified** (green checkmark).

---

## 3. Configure Local Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
2. Populate `.env.local` with your credentials:
   ```env
   # Resend Secret Key
   RESEND_API_KEY=re_your_api_key_here

   # Mailbox where owner inquiry notifications will be delivered
   CONTACT_EMAIL=civiarcherdesigns@gmail.com

   # Sender address (use onboarding@resend.dev for local sandbox testing,
   # or your verified domain for production)
   EMAIL_FROM=Tausif Raza <hello@your-verified-domain.com>

   # Canonical Operating Timezone
   NEXT_PUBLIC_TIMEZONE=Asia/Kolkata
   ```
3. Restart your local Next.js dev server:
   ```bash
   npm run dev
   ```

---

## 4. Configure Production Environment Variables on Vercel

If hosting on Vercel:
1. Open your project on the [Vercel Dashboard](https://vercel.com).
2. Go to **Settings** → **Environment Variables**.
3. Add the following variables:

| Variable Name | Environment | Value Example | Description |
|---|---|---|---|
| `RESEND_API_KEY` | Production, Preview | `re_xxxxxxxxx` | Secret Resend API key |
| `CONTACT_EMAIL` | Production, Preview | `civiarcherdesigns@gmail.com` | Owner notification inbox |
| `EMAIL_FROM` | Production, Preview | `Tausif Raza <hello@yourdomain.com>` | Verified domain sender address |
| `NEXT_PUBLIC_TIMEZONE` | Production, Preview | `Asia/Kolkata` | Operating timezone |

4. Ensure `RESEND_API_KEY` is kept private and NOT prefixed with `NEXT_PUBLIC_`.

---

## 5. Redeploy After Setting Environment Variables

Vercel injects environment variables during build time and serverless function cold starts:
1. In the Vercel dashboard, go to **Deployments**.
2. Click the three dots (`...`) next to the latest deployment and select **Redeploy** (or push a new commit to your `main` branch on GitHub).
3. The new deployment will now have access to the production environment variables.

---

## 6. Testing Both Email Workflows

### Scenario A: Testing in Sandbox / Development Mode
- If using `EMAIL_FROM=onboarding@resend.dev`:
  1. Set `CONTACT_EMAIL` to your Resend account registration email.
  2. Open the contact form at `http://localhost:3000/#contact`.
  3. Fill out the fields with test details.
  4. Submit the form.
  5. Check your inbox: You will receive the **New Portfolio Inquiry** email.
  6. In the server console, Resend logs note that visitor confirmation to external addresses is restricted until a custom domain is verified.

### Scenario B: Testing in Production (Verified Domain)
- With a verified domain configured in `EMAIL_FROM`:
  1. Submit an inquiry through the live website with your personal email as the visitor.
  2. **Owner Inbox**: Verify receipt of the inquiry notification with complete project details and a direct "Reply to [Visitor]" button.
  3. **Visitor Inbox**: Verify receipt of the warm, editorial confirmation email with subject `Thank You for Your Inquiry — Tausif Raza`.
  4. Test clicking "Reply" in the owner's email client to verify that the message addresses the visitor directly via `replyTo`.
