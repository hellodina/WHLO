import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Allow access to login page and API routes
  if (pathname === "/login" || pathname.startsWith("/api/")) {
    return NextResponse.next()
  }
  
  // For the root page, let NextAuth handle the authentication check
  // This avoids Edge Runtime compatibility issues
  if (pathname === "/") {
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
}
