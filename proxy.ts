import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  if (!request.nextUrl.searchParams.has("jkit-ajax-request")) {
    return NextResponse.next();
  }

  const cleanUrl = request.nextUrl.clone();
  cleanUrl.pathname = "/";
  cleanUrl.search = "";

  return NextResponse.redirect(cleanUrl, 301);
}

export const config = {
  matcher: "/",
};
