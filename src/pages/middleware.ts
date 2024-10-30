import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  console.log("middleware", request.nextUrl);
  if (request.nextUrl.pathname.endsWith("order-created")) {
    return NextResponse.rewrite(
      new URL("/api/webhooks/order-created?experimentalFlow=true", request.url)
    );
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/api/webhooks/:path*",
};
