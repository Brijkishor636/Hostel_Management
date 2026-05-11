import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;
  const role = request.cookies.get("role")?.value?.toLowerCase();
  console.log(role);
  console.log(token);
  const { pathname } = request.nextUrl;

  const isPublicRoute = pathname === "/login";

  const isProtectedRoute =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/warden") ||
    pathname.startsWith("/student");

  const isLoggedIn = token;

  if (isPublicRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isLoggedIn && role === "student") {
    if (!pathname.startsWith("/student")) {
      return NextResponse.redirect(new URL("/student", request.url));
    }
  }

  if (isLoggedIn && role === "warden") {
    if (!pathname.startsWith("/warden")) {
      return NextResponse.redirect(new URL("/warden", request.url));
    }
  }

  if(isLoggedIn && role === "admin") {
    if (!pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/admin", request.url));
    } 
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/admin/:path*",
    "/warden/:path*",
    "/student/:path*",
  ],
};
