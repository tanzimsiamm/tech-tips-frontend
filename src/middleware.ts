/* eslint-disable @typescript-eslint/no-explicit-any */
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
    return NextResponse.redirect(new URL(pathname ? `/login?redirect=${pathname}` : "/login", request.url))
  }

  //Role based authorization
  let decoded = null;
  decoded = jwtDecode(accessToken) as JwtPayload
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
    "/user-dashboard/:page*",
    "/admin-dashboard/:page*",
    "/profile/:page*"
  ],
};