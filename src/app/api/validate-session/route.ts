import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import jwt from "jsonwebtoken";

const verifyJwtToken = (authToken: string) => {
  try {
    const decodedUserInfo = jwt.verify(authToken, "OPWDER3456IOPPP");
    console.log("decodedUserInfo ==>  ", decodedUserInfo);
    return decodedUserInfo;
  } catch (error) {
    console.log(`JWT verification failed !! `, error);
    return null;
  }
};

export async function GET() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("session_token")?.value;

  if (!authToken) {
    return NextResponse.json({ isAuthenticated: false }, { status: 401 });
  }

  const decodedUserInfo = verifyJwtToken(authToken);

  if (!decodedUserInfo) {
    return NextResponse.json({ isAuthenticated: false }, { status: 401 });
  }

  return NextResponse.json(
    {
      isAuthenticated: true,
      user:decodedUserInfo,
    },
    { status: 200 }
  );
}
