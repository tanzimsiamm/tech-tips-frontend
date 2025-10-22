// middleware.ts (or wherever your middleware is defined)

import { jwtDecode, JwtPayload as DefaultJwtPayload } from "jwt-decode";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

interface JwtPayload extends DefaultJwtPayload {
  role?: string;
}

export async function middleware(request: NextRequest) {
  let pathname = request.nextUrl.pathname;

  // If it's a data request, extract the original logical pathname
  if (pathname.startsWith('/_next/data')) {
    const parts = pathname.split('/');
    // parts example: ['', '_next', 'data', buildId, 'profile', 'user@example.com.json']
    const originalParts = parts.slice(4); // Skip to the path after buildId
    if (originalParts.length > 0) {
      const lastIndex = originalParts.length - 1;
      originalParts[lastIndex] = originalParts[lastIndex].replace('.json', '');
    }
    pathname = '/' + originalParts.join('/');
  }

  const { searchParams } = request.nextUrl; // Preserve query params if needed

  // Authentication
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    const loginUrl = new URL(pathname ? `/login?redirect=${encodeURIComponent(pathname)}` : "/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Role-based authorization
  let decoded = null;
  try {
    decoded = jwtDecode(accessToken) as JwtPayload;
  } catch (error) {
    // Handle invalid token (e.g., expired or malformed)
    console.error('Invalid token:', error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
  const role = decoded?.role;

  if (role === "admin" && pathname.match(/^\/admin-dashboard/)) {
    return NextResponse.next();
  }
  if (role === "user" && pathname.match(/^\/user-dashboard/)) {
    return NextResponse.next();
  }
  if ((role === "user" || role === "admin") && pathname.match(/^\/profile/)) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: [
    "/user-dashboard/:path*",
    "/admin-dashboard/:path*",
    "/profile/:path*",
    "/_next/data/:path+"  // Add this to cover data fetches
  ],
};