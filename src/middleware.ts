// middleware.ts
import { jwtDecode, JwtPayload as DefaultJwtPayload } from "jwt-decode";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

interface JwtPayload extends DefaultJwtPayload {
  role?: string;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Authentication
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return NextResponse.redirect(
      new URL(pathname ? `/login?redirect=${pathname}` : "/login", request.url)
    );
  }

  try {
    // Role based authorization
    const decoded = jwtDecode(accessToken) as JwtPayload;
    const role = decoded?.role;

    // Check if token is expired
    if (decoded.exp && Date.now() >= decoded.exp * 1000) {
      return NextResponse.redirect(new URL('/login?error=token_expired', request.url));
    }

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
  } catch (error) {
    // Invalid token
    return NextResponse.redirect(new URL('/login?error=invalid_token', request.url));
  }
}

export const config = {
  matcher: [
    "/user-dashboard/:page*",
    "/admin-dashboard/:page*",
    "/profile/:page*",
  ],
};