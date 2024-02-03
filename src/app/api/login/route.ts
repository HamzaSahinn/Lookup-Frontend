import { cookies } from "next/headers";

export async function POST(req: Request) {
  const { expiresIn, accessToken, refreshToken } = await req.json();

  const cookieObj = {
    expiresIn,
    accessToken,
    refreshToken,
    isAuthenticated: true,
  };

  cookies().set("jwt-token", JSON.stringify(cookieObj), {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    maxAge: expiresIn,
    sameSite: "strict",
    path: "/",
  });

  return Response.json({ success: true }, { status: 200 });
}
