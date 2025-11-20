import { NextResponse, type NextRequest } from "next/server";
import { verifyJwtToken } from "./app/lib/utils";

const protectedRoutes = ["/"];
const authRoutes = ["/login"];

export async function proxy(request: NextRequest) {
  // console.log("request ==> ", request.nextUrl);

  const loginURL = request.nextUrl.clone();
  loginURL.pathname = "/login";
  const HomeURL = request.nextUrl.clone();
  HomeURL.pathname = "/";

  const isRequestingProtectedRoutes = protectedRoutes.includes(
    request.nextUrl.pathname
  );
  const isRequestingAuthRoutes = authRoutes.includes(request.nextUrl.pathname);

  const token = request.cookies.get("session_token");
  const tokenValue = token ? token.value : null;

  if (!tokenValue && isRequestingProtectedRoutes) {
    return NextResponse.redirect(loginURL);
  }

  const decodedUserInfo = verifyJwtToken(tokenValue);

  if (isRequestingAuthRoutes && decodedUserInfo) {
    return NextResponse.redirect(HomeURL);
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
