import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// In-Memory Rate Limiter (Request Throttling against DoS/Spam)
const ipRequestCounts = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute window
const MAX_REQUESTS_PER_WINDOW = 120;   // 120 requests per minute per IP

// Malicious Request & Threat Signatures (SQLi, XSS, Path Traversal, RCE, Command Injection)
const THREAT_PATTERNS = [
  /<script/i,
  /javascript:/i,
  /onerror\s*=/i,
  /onload\s*=/i,
  /SELECT\s/i,
  /UNION\s+SELECT/i,
  /INSERT\s+INTO/i,
  /DELETE\s+FROM/i,
  /DROP\s+TABLE/i,
  /--/m,
  /\.\.\/|\.\.\\/i, // Path traversal
  /\/etc\/passwd|\/etc\/shadow|c:\\windows/i,
  /eval\(|exec\(|system\(|passthru\(/i,
  /cmd\.exe|powershell\.exe/i,
];

// Malicious Scanner Bot User-Agents
const MALICIOUS_BOTS = /sqlmap|nikto|nmap|dirbuster|acunetix|nessus|metasploit|gobuster|wpscan|hydra/i;

export function middleware(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || request.headers.get("x-real-ip") || "127.0.0.1";
  const url = request.nextUrl.pathname + request.nextUrl.search;

  // 1. In-Memory Rate Limiting (DDoS & Brute-Force Defense)
  const now = Date.now();
  const rateData = ipRequestCounts.get(ip) || { count: 0, lastReset: now };

  if (now - rateData.lastReset > RATE_LIMIT_WINDOW_MS) {
    rateData.count = 1;
    rateData.lastReset = now;
  } else {
    rateData.count += 1;
  }
  ipRequestCounts.set(ip, rateData);

  // Cache eviction cleanup
  if (ipRequestCounts.size > 10000) {
    ipRequestCounts.clear();
  }

  if (rateData.count > MAX_REQUESTS_PER_WINDOW) {
    return new NextResponse(
      JSON.stringify({ status: 429, error: "Too Many Requests. Please slow down." }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "Retry-After": "60",
          "X-RateLimit-Limit": MAX_REQUESTS_PER_WINDOW.toString(),
          "X-RateLimit-Remaining": "0",
        },
      }
    );
  }

  // 2. Vulnerability Scanner & Malicious Bot Defense
  const userAgent = request.headers.get("user-agent") || "";
  if (MALICIOUS_BOTS.test(userAgent)) {
    return new NextResponse(
      JSON.stringify({ status: 403, error: "Access Denied: Automated vulnerability scanner detected." }),
      { status: 403, headers: { "Content-Type": "application/json" } }
    );
  }

  // 3. Web Application Firewall (WAF) Payload Inspection
  try {
    const decodedUrl = decodeURIComponent(url.replace(/\+/g, " "));
    for (const pattern of THREAT_PATTERNS) {
      if (pattern.test(decodedUrl)) {
        return new NextResponse(
          JSON.stringify({ status: 403, error: "Security Violation: Malicious request pattern blocked." }),
          { status: 403, headers: { "Content-Type": "application/json" } }
        );
      }
    }
  } catch {
    // Malformed URI string
    return new NextResponse(
      JSON.stringify({ status: 400, error: "Bad Request: Malformed URI encoding." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  // 4. Secure Response Headers Enforcement
  const response = NextResponse.next();
  response.headers.set("X-Frame-Options", "SAMEORIGIN");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("X-XSS-Protection", "1; mode=block");

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp3)$).*)",
  ],
};
