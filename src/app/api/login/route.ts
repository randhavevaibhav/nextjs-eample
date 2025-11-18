import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email, password } = body;

  if (!(password === "123")) {
    return new Response(
      JSON.stringify({
        message: "invalid password",
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  //get user from db
  const user = {
    id: "123#",
  };

  // Get the cookies instance
  const cookieStore = await cookies();
  // create a JSON Web token

  const newToken = jwt.sign(user, "OPWDER3456IOPPP", {
    expiresIn: `2m`,
  });

  // 2. Set the cookie
  // The set() function takes the cookie name (key), value, and optional options (like expiration or httpOnly)
  cookieStore.set("session_token", newToken, {
    httpOnly: true, // Makes the cookie inaccessible via client-side JavaScript (more secure)
    secure: process.env.NODE_ENV === "production", // Only send over HTTPS in production
    maxAge: 10, // Cookie expires in 1 day (in seconds)
    path: "/", // The path where the cookie is valid
    sameSite: "strict", // Helps mitigate CSRF attacks
  });

  return new Response(
    JSON.stringify({
      user,
      message: "user logged in !!",
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}
