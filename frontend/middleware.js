// import { NextResponse } from "next/server";

// export function middleware(request) {
//   const token = request.cookies.get("token")?.value;
//   const role = request.cookies.get("role")?.value?.toLowerCase();
//   // console.log(role);
//   const { pathname } = request.nextUrl;

//   const isPublicRoute = pathname === "/login";

//   const isProtectedRoute =
//     pathname.startsWith("/admin") ||
//     pathname.startsWith("/warden") ||
//     pathname.startsWith("/student");

//   const isLoggedIn = token;

//   if (isPublicRoute && isLoggedIn) {
//     return NextResponse.redirect(new URL("/", request.url));
//   }

//   if (isProtectedRoute && !isLoggedIn) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   if (isLoggedIn && role === "student") {
//     if (!pathname.startsWith("/student")) {
//       return NextResponse.redirect(new URL("/student", request.url));
//     }
//   }

//   if (isLoggedIn && role === "warden") {
//     if (!pathname.startsWith("/warden")) {
//       return NextResponse.redirect(new URL("/warden", request.url));
//     }
//   }

//   if(isLoggedIn && role === "admin") {
//     if (!pathname.startsWith("/admin")) {
//       return NextResponse.redirect(new URL("/admin", request.url));
//     } 
//   }
//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     "/login",
//     "/admin/:path*",
//     "/warden/:path*",
//     "/student/:path*",
//   ],
// };





import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(request) {

  const token = request.cookies.get("token")?.value;

  const { pathname } = request.nextUrl;

  const isPublicRoute = pathname === "/login";

  const isProtectedRoute =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/warden") ||
    pathname.startsWith("/student");

  // allow login page
  if (isPublicRoute && !token) {
    return NextResponse.next();
  }

  // no token → redirect login
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  try {

    // verify jwt token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const role = decoded.role?.toLowerCase();

    // if logged in and trying to access login page
    if (isPublicRoute) {

      if (role === "admin") {
        return NextResponse.redirect(
          new URL("/admin", request.url)
        );
      }

      if (role === "warden") {
        return NextResponse.redirect(
          new URL("/warden", request.url)
        );
      }

      if (role === "student") {
        return NextResponse.redirect(
          new URL("/student", request.url)
        );
      }
    }

    // role-based route protection
    if (
      role === "admin" &&
      !pathname.startsWith("/admin")
    ) {
      return NextResponse.redirect(
        new URL("/admin", request.url)
      );
    }

    if (
      role === "warden" &&
      !pathname.startsWith("/warden")
    ) {
      return NextResponse.redirect(
        new URL("/warden", request.url)
      );
    }

    if (
      role === "student" &&
      !pathname.startsWith("/student")
    ) {
      return NextResponse.redirect(
        new URL("/student", request.url)
      );
    }

    return NextResponse.next();

  } catch (err) {

    console.error(err);

    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }
}

export const config = {
  matcher: [
    "/login",
    "/admin/:path*",
    "/warden/:path*",
    "/student/:path*",
  ],
};