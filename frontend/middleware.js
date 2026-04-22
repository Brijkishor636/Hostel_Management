import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // Public routes (accessible without login)
  const isPublicRoute =
    pathname === "/login";

  // Protected routes (require login)
  const isProtectedRoute =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/warden") ||
    pathname.startsWith("/student");

  // If user is logged in and tries to access login/signup, redirect to home
  if (isPublicRoute && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If user is not logged in and tries to access protected routes, redirect to login
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Allow request to proceed
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