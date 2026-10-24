import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { PROJECT_TYPES, PROJECT_AREAS, ESTIMATED_BUDGETS } from "@/data/contact";

// In-memory sliding-window rate limiter (IP -> timestamps[])
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS_PER_WINDOW = 10;

function isRateLimited(ip: string): boolean {
  // Relax rate limit in local development for smooth automated testing & preview
  if (
    process.env.NODE_ENV === "development" &&
    (ip === "127.0.0.1" || ip === "::1" || ip === "localhost")
  ) {
    return false;
  }

  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const validTimestamps = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    rateLimitMap.set(ip, validTimestamps);
    return true;
  }

  validTimestamps.push(now);
  rateLimitMap.set(ip, validTimestamps);

  // Periodic cleanup if map grows large
  if (rateLimitMap.size > 1000) {
    for (const [key, ts] of rateLimitMap.entries()) {
      if (ts.every((t) => now - t >= RATE_LIMIT_WINDOW_MS)) {
        rateLimitMap.delete(key);
      }
    }
  }

  return false;
}

// RFC 5322 compliant email regex check
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

// Escape HTML characters to prevent email HTML injection
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Strip newlines and control characters to prevent email header injection
function sanitizeHeader(str: string): string {
  return str.replace(/[\r\n\t]/g, " ").trim();
}

export async function POST(req: NextRequest) {
  try {
    // 1. IP extraction & rate limiting
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded
      ? forwarded.split(",")[0]?.trim() || "127.0.0.1"
      : "127.0.0.1";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Too many project inquiries submitted recently. Please wait a few moments or email directly.",
        },
        { status: 429 }
      );
    }

    // 2. Parse request body
    let body: Record<string, unknown>;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON request payload." },
        { status: 400 }
      );
    }

    const {
      name,
      email,
      projectType,
      projectLocation,
      projectArea,
      estimatedBudget,
      projectBrief,
      honeypot,
      renderedAt,
    } = body;

    // 3. Bot protection: honeypot verification
    if (typeof honeypot === "string" && honeypot.trim().length > 0) {
      // Silently reject bot submissions
      return NextResponse.json(
        { success: false, error: "Spam verification failed." },
        { status: 400 }
      );
    }

    // 4. Bot protection: minimum submission duration (at least 1.2 seconds)
    if (typeof renderedAt === "number") {
      const elapsed = Date.now() - renderedAt;
      if (elapsed < 1200) {
        return NextResponse.json(
          {
            success: false,
            error: "Submission occurred too rapidly. Please retry.",
          },
          { status: 400 }
        );
      }
    }

    // 5. Server-side validation of required and optional fields
    const errors: Record<string, string> = {};

    // Validate Name
    if (typeof name !== "string" || name.trim().length < 2) {
      errors.name = "Please provide your full name (minimum 2 characters).";
    } else if (name.trim().length > 100) {
      errors.name = "Name must be under 100 characters.";
    }

    // Validate Email
    if (typeof email !== "string" || !EMAIL_REGEX.test(email.trim())) {
      errors.email = "Please provide a valid email address.";
    }

    // Validate Project Type
    if (
      typeof projectType !== "string" ||
      !PROJECT_TYPES.includes(projectType as (typeof PROJECT_TYPES)[number])
    ) {
      errors.projectType = "Please select a valid architectural project type.";
    }

    // Validate Project Brief / Message
    if (typeof projectBrief !== "string" || projectBrief.trim().length < 20) {
      errors.projectBrief =
        "Please describe your project (minimum 20 characters).";
    } else if (projectBrief.trim().length > 3000) {
      errors.projectBrief = "Project brief must be within 3,000 characters.";
    }

    // Validate Optional Project Area
    if (
      projectArea &&
      typeof projectArea === "string" &&
      projectArea !== "" &&
      !PROJECT_AREAS.includes(projectArea as (typeof PROJECT_AREAS)[number])
    ) {
      errors.projectArea = "Please select a valid project area option.";
    }

    // Validate Optional Estimated Budget
    if (
      estimatedBudget &&
      typeof estimatedBudget === "string" &&
      estimatedBudget !== "" &&
      !ESTIMATED_BUDGETS.includes(
        estimatedBudget as (typeof ESTIMATED_BUDGETS)[number]
      )
    ) {
      errors.estimatedBudget = "Please select a valid estimated budget option.";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Please correct the highlighted form errors.",
          validationErrors: errors,
        },
        { status: 400 }
      );
    }

    // 6. Data sanitization
    const sanitizedName = sanitizeHeader(String(name));
    const sanitizedEmail = sanitizeHeader(String(email));
    const sanitizedProjectType = sanitizeHeader(String(projectType));
    const sanitizedLocation =
      projectLocation && typeof projectLocation === "string" && projectLocation.trim() !== ""
        ? sanitizeHeader(projectLocation)
        : "Not specified";
    const sanitizedArea =
      projectArea && typeof projectArea === "string" && projectArea.trim() !== ""
        ? sanitizeHeader(projectArea)
        : "Not decided yet";
    const sanitizedBudget =
      estimatedBudget &&
      typeof estimatedBudget === "string" &&
      estimatedBudget.trim() !== ""
        ? sanitizeHeader(estimatedBudget)
        : "To be discussed";
    const rawBrief = String(projectBrief).trim();

    // 7. Format submission timestamp in India Standard Time (Asia/Kolkata)
    const istTimestamp = new Intl.DateTimeFormat("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "full",
      timeStyle: "long",
    }).format(new Date());

    // 8. Email Delivery Configuration
    const recipientEmail =
      process.env.CONTACT_EMAIL || "civiarcherdesigns@gmail.com";
    const fromEmail =
      process.env.EMAIL_FROM ||
      process.env.CONTACT_FROM_EMAIL ||
      "Tausif Raza <onboarding@resend.dev>";
    const resendApiKey = process.env.RESEND_API_KEY;

    // Strict requirement: Never report false success if email provider is unconfigured
    if (!resendApiKey) {
      return NextResponse.json(
        {
          success: false,
          setupRequired: true,
          error:
            "Email delivery configuration required: Please configure RESEND_API_KEY in your .env.local file to enable automated email dispatch to " +
            recipientEmail +
            ".",
        },
        { status: 503 }
      );
    }

    // 9. Initialize Resend client
    const resend = new Resend(resendApiKey);

    // =========================================================================
    // TEMPLATE 1: Owner Notification Email
    // =========================================================================
    const ownerSubject = `New Portfolio Inquiry — ${sanitizedName} [${sanitizedProjectType}]`;

    const ownerText = `NEW ARCHITECTURAL PORTFOLIO INQUIRY
===================================
Submitted: ${istTimestamp} (IST)

CLIENT INFORMATION
------------------
Name:  ${sanitizedName}
Email: ${sanitizedEmail}

PROJECT SPECIFICATION
---------------------
Project Type:     ${sanitizedProjectType}
Project Location: ${sanitizedLocation}
Project Area:     ${sanitizedArea}
Estimated Budget: ${sanitizedBudget}

PROJECT BRIEF / MESSAGE
-----------------------
${rawBrief}

===================================
Reply directly to this email to contact the client at: ${sanitizedEmail}
Notification delivered to: ${recipientEmail}
`;

    const ownerHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(ownerSubject)}</title>
</head>
<body style="margin: 0; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #111210; color: #F2F0E9;">
  <div style="max-width: 620px; margin: 0 auto; background-color: #191A17; border: 1px solid #34352F; border-radius: 4px; overflow: hidden;">
    
    <!-- Header with Accent Line -->
    <div style="height: 3px; background: linear-gradient(90deg, #B49A72, #C5AB83, #B49A72);"></div>
    <div style="padding: 24px 30px; border-bottom: 1px solid #34352F; background-color: #151613;">
      <span style="font-size: 10px; font-family: monospace; text-transform: uppercase; letter-spacing: 0.2em; color: #B49A72; display: block; margin-bottom: 6px;">
        NEW PORTFOLIO INQUIRY &bull; TAUSIF RAZA
      </span>
      <h1 style="margin: 0; font-size: 22px; font-weight: normal; color: #F2F0E9;">
        ${escapeHtml(sanitizedProjectType)}
      </h1>
      <p style="margin: 6px 0 0 0; font-size: 12px; color: #AAA9A1; font-family: monospace;">
        Received: ${escapeHtml(istTimestamp)} (IST)
      </p>
    </div>

    <!-- Client & Project Details Table -->
    <div style="padding: 24px 30px;">
      <h2 style="font-size: 11px; font-family: monospace; text-transform: uppercase; letter-spacing: 0.15em; color: #B49A72; margin-top: 0; margin-bottom: 14px;">
        Client &amp; Scope Overview
      </h2>
      <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
        <tbody>
          <tr style="border-bottom: 1px solid #262824;">
            <td style="padding: 10px 0; color: #777870; width: 35%; text-transform: uppercase; font-size: 11px; font-weight: 600;">Client Name</td>
            <td style="padding: 10px 0; color: #F2F0E9; font-weight: 500;">${escapeHtml(sanitizedName)}</td>
          </tr>
          <tr style="border-bottom: 1px solid #262824;">
            <td style="padding: 10px 0; color: #777870; font-size: 11px; text-transform: uppercase; font-weight: 600;">Client Email</td>
            <td style="padding: 10px 0; color: #B49A72; font-family: monospace;">
              <a href="mailto:${escapeHtml(sanitizedEmail)}" style="color: #B49A72; text-decoration: none;">${escapeHtml(sanitizedEmail)}</a>
            </td>
          </tr>
          <tr style="border-bottom: 1px solid #262824;">
            <td style="padding: 10px 0; color: #777870; font-size: 11px; text-transform: uppercase; font-weight: 600;">Project Location</td>
            <td style="padding: 10px 0; color: #F2F0E9;">${escapeHtml(sanitizedLocation)}</td>
          </tr>
          <tr style="border-bottom: 1px solid #262824;">
            <td style="padding: 10px 0; color: #777870; font-size: 11px; text-transform: uppercase; font-weight: 600;">Project Area</td>
            <td style="padding: 10px 0; color: #F2F0E9;">${escapeHtml(sanitizedArea)}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #777870; font-size: 11px; text-transform: uppercase; font-weight: 600;">Estimated Budget</td>
            <td style="padding: 10px 0; color: #F2F0E9;">${escapeHtml(sanitizedBudget)}</td>
          </tr>
        </tbody>
      </table>

      <!-- Project Brief -->
      <div style="margin-top: 24px; padding-top: 20px; border-top: 1px solid #34352F;">
        <h2 style="font-size: 11px; font-family: monospace; text-transform: uppercase; letter-spacing: 0.15em; color: #B49A72; margin-top: 0; margin-bottom: 10px;">
          Project Brief &amp; Requirements
        </h2>
        <div style="background-color: #111210; border: 1px solid #34352F; border-radius: 3px; padding: 16px; font-size: 13px; line-height: 1.6; color: #AAA9A1; white-space: pre-wrap;">${escapeHtml(rawBrief)}</div>
      </div>

      <!-- Action Button -->
      <div style="margin-top: 28px; text-align: center;">
        <a href="mailto:${escapeHtml(sanitizedEmail)}?subject=Re:%20${encodeURIComponent(ownerSubject)}" 
           style="display: inline-block; background-color: #B49A72; color: #111210; font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.15em; padding: 12px 24px; text-decoration: none; border-radius: 2px;">
          Reply to ${escapeHtml(sanitizedName)} &rarr;
        </a>
      </div>
    </div>

    <!-- Footer -->
    <div style="padding: 14px 30px; background-color: #151613; border-top: 1px solid #34352F; font-size: 11px; color: #777870; font-family: monospace;">
      Delivered to ${escapeHtml(recipientEmail)} &bull; Canonical Timezone: Asia/Kolkata (IST)
    </div>
  </div>
</body>
</html>`;

    // =========================================================================
    // TEMPLATE 2: Visitor Confirmation Email
    // =========================================================================
    const visitorSubject = "Thank You for Your Inquiry — Tausif Raza";

    const visitorText = `Dear ${sanitizedName},

Thank you for reaching out to Tausif Raza — Architect & Interior Designer.

Your inquiry has been received, and I appreciate your interest in my work. I will review your project requirements and get back to you as soon as possible.

INQUIRY SUMMARY:
- Project Type: ${sanitizedProjectType}
- Project Location: ${sanitizedLocation}
- Submitted: ${istTimestamp} (IST)

Thank you for considering me for your project. I look forward to learning more about your vision.

Warm regards,

Tausif Raza
Architect & Interior Designer
`;

    const visitorHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(visitorSubject)}</title>
</head>
<body style="margin: 0; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #111210; color: #F2F0E9;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #191A17; border: 1px solid #34352F; border-radius: 4px; overflow: hidden;">
    
    <!-- Header with Accent Line -->
    <div style="height: 3px; background: linear-gradient(90deg, #B49A72, #C5AB83, #B49A72);"></div>
    <div style="padding: 28px 32px 20px 32px; border-bottom: 1px solid #2D2E2A; background-color: #151613;">
      <span style="font-size: 10px; font-family: monospace; text-transform: uppercase; letter-spacing: 0.25em; color: #B49A72; display: block; margin-bottom: 8px;">
        INQUIRY RECEIVED &bull; ARCHITECT &amp; INTERIOR DESIGNER
      </span>
      <h1 style="margin: 0; font-size: 24px; font-weight: normal; color: #F2F0E9; letter-spacing: -0.01em;">
        Tausif Raza
      </h1>
    </div>

    <!-- Main Message Body -->
    <div style="padding: 32px; font-size: 15px; line-height: 1.7; color: #D6D5CD;">
      <p style="margin-top: 0; color: #F2F0E9; font-size: 16px;">
        Dear ${escapeHtml(sanitizedName)},
      </p>

      <p>
        Thank you for reaching out to <strong>Tausif Raza — Architect &amp; Interior Designer</strong>.
      </p>

      <p>
        Your inquiry has been received, and I appreciate your interest in my work. I will review your project requirements and get back to you as soon as possible.
      </p>

      <!-- Project Snapshot Card -->
      <div style="margin: 24px 0; padding: 18px 20px; background-color: #131412; border: 1px solid #2D2E2A; border-left: 3px solid #B49A72; border-radius: 2px;">
        <span style="display: block; font-size: 10px; font-family: monospace; text-transform: uppercase; letter-spacing: 0.15em; color: #B49A72; margin-bottom: 8px;">
          Project Inquiry Summary
        </span>
        <div style="font-size: 13px; color: #AAA9A1; line-height: 1.6;">
          <div><strong style="color: #F2F0E9;">Type:</strong> ${escapeHtml(sanitizedProjectType)}</div>
          ${
            sanitizedLocation !== "Not specified"
              ? `<div><strong style="color: #F2F0E9;">Location:</strong> ${escapeHtml(sanitizedLocation)}</div>`
              : ""
          }
          <div><strong style="color: #F2F0E9;">Submitted:</strong> ${escapeHtml(istTimestamp)} (IST)</div>
        </div>
      </div>

      <p>
        Thank you for considering me for your project. I look forward to learning more about your vision.
      </p>

      <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #2D2E2A;">
        <p style="margin: 0; color: #AAA9A1; font-size: 14px;">Warm regards,</p>
        <p style="margin: 8px 0 2px 0; color: #F2F0E9; font-size: 16px; font-weight: 600;">
          Tausif Raza
        </p>
        <p style="margin: 0; color: #B49A72; font-size: 12px; font-family: monospace; text-transform: uppercase; letter-spacing: 0.1em;">
          Architect &amp; Interior Designer
        </p>
      </div>
    </div>

    <!-- Subtle Footer -->
    <div style="padding: 16px 32px; background-color: #131412; border-top: 1px solid #262824; font-size: 11px; color: #6D6E66; font-family: monospace; text-align: center;">
      This is an automated confirmation of your architectural project inquiry.
    </div>
  </div>
</body>
</html>`;

    // =========================================================================
    // 10. Execute Email Dispatches via Resend SDK
    // =========================================================================

    // Step A: Send inquiry notification to portfolio owner
    const ownerResult = await resend.emails.send({
      from: fromEmail,
      to: [recipientEmail],
      replyTo: sanitizedEmail,
      subject: ownerSubject,
      html: ownerHtml,
      text: ownerText,
    });

    if (ownerResult.error) {
      console.error(
        "[Inquiry API] Email provider failure for owner notification:",
        ownerResult.error.message
      );
      return NextResponse.json(
        {
          success: false,
          error:
            "Email delivery provider error. Please try again in a few moments, or reach out directly to " +
            recipientEmail +
            ".",
        },
        { status: 502 }
      );
    }

    // Step B: Send confirmation email to visitor
    let visitorConfirmationSent = false;
    try {
      const visitorResult = await resend.emails.send({
        from: fromEmail,
        to: [sanitizedEmail],
        subject: visitorSubject,
        html: visitorHtml,
        text: visitorText,
      });

      if (visitorResult.error) {
        console.warn(
          `[Inquiry API] Visitor confirmation email could not be delivered to ${sanitizedEmail}:`,
          visitorResult.error.message,
          "Note: If using onboarding@resend.dev, domain verification at resend.com/domains is required to send to arbitrary visitor addresses."
        );
      } else {
        visitorConfirmationSent = true;
      }
    } catch (vErr) {
      const vMsg = vErr instanceof Error ? vErr.message : "Transmission exception";
      console.warn(
        `[Inquiry API] Exception while sending visitor confirmation email:`,
        vMsg
      );
    }

    // Return structured response distinguishing inquiry acceptance from visitor confirmation status
    return NextResponse.json(
      {
        success: true,
        message: visitorConfirmationSent
          ? "Your project inquiry has been received. Please check your email for a confirmation."
          : "Your project inquiry has been received. Thank you for reaching out.",
        confirmationEmailSent: visitorConfirmationSent,
        id: ownerResult.data?.id,
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    const errorMsg =
      err instanceof Error ? err.message : "Unknown internal error";
    console.error("[Inquiry API] Internal error:", errorMsg);
    return NextResponse.json(
      {
        success: false,
        error:
          "An unexpected error occurred while processing your inquiry. Please try again or reach out directly via email.",
      },
      { status: 500 }
    );
  }
}
