import { NextResponse, type NextRequest } from "next/server";
import jwt from "jsonwebtoken";
const protectedRoutes = ["/"];

export async function proxy(request: NextRequest) {
  console.log("request ==> ", request.nextUrl);

  const loginURL = request.nextUrl.clone();
  loginURL.pathname = "/login";

  if (protectedRoutes.includes(request.nextUrl.pathname)) {
    const token = request.cookies.get("session_token");
    if (!request.cookies.has("session_token")) {
      return NextResponse.redirect(loginURL);
    }

    if (!token?.value) {
      return NextResponse.redirect(loginURL);
    }

    jwt.verify(token.value, "OPWDER3456IOPPP", (err, decoded) => {
      if (err) {
        return NextResponse.redirect(loginURL);
      }
    });
  }

  return NextResponse.next({
    request,
  });
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|api|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
