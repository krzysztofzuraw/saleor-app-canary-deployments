import { NextRequest, NextResponse } from "next/server";

// Based on https://vercel.com/guides/implementing_canary_deployments_on_vercel
const trafficCanaryPercent = 10;

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.endsWith("order-created")) {
    const random = Math.random() * 100;

    if (random < trafficCanaryPercent) {
      return NextResponse.rewrite(
        new URL("/api/webhooks/order-created?experimentalFlow=true", request.url)
      );
    }

    return NextResponse.next();
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/api/webhooks/:path*",
};
