import { NextResponse } from "next/server";

export const middleware = (request) => {
  // Get the pathname
  const { pathname } = request.nextUrl;
  const isAuthenticated = request.cookies.get("auth_token");

  // Define public routes that don't need authentication
  const isPublicRoute = pathname.startsWith("/auth/login");

  // If user is not authenticated and trying to access protected route
  if (!isAuthenticated && !isPublicRoute) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // If user is authenticated and trying to access login page
  if (isAuthenticated && isPublicRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Allow the request to continue
  return NextResponse.next();
};

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api routes
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
