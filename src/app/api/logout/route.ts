import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { id } = body;

  if (!id) {
    return new Response(JSON.stringify({
      message:"invalid user"
    }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

   const cookieStore = await cookies();
   cookieStore.delete("session_token")

  return new Response(JSON.stringify({
      message:"user logged out !"
    }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

