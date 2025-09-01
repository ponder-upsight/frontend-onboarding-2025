import { NextRequest, NextResponse } from "next/server";

import { fallbackLng, languages } from "@/app/i18n/settings";
import acceptLanguage from "accept-language";

acceptLanguage.languages(languages);

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|images|assets|favicon.ico|sw.js|viewer|.*\\.splat).*)",
  ],
};

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Health Check를 위한 설정
  if (pathname === "/health") {
    return NextResponse.json({ status: "ok" });
  }

  // 이미 언어 prefix가 붙어있다면 pass
  if (languages.some((lng) => pathname.startsWith(`/${lng}`))) {
    return NextResponse.next();
  }

  const detectedLng =
    acceptLanguage.get(req.headers.get("Accept-Language")) || fallbackLng;

  const url = req.nextUrl.clone();
  url.pathname = `/${detectedLng}${pathname}`;
  return NextResponse.redirect(url);
}
