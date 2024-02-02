import { JwtPayload, jwtDecode } from "jwt-decode";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { NextApiRequest } from "next";

export async function POST(req: NextApiRequest, res: Response) {
  const appCookie = cookies().get("jwt-token")?.value ?? "";
  const parsedCookies = appCookie ? JSON.parse(appCookie) : {};
  const accessToken = parsedCookies?.accessToken ?? null;

  if (!accessToken) {
    return Response.json({ success: true, token: null }, { status: 200 });
  }

  const decodedToken = jwtDecode<JwtPayload>(accessToken);

  const isAccessTokenExpired = Date.now() / 1000 > (decodedToken.exp || 0);

  const refreshToken = parsedCookies?.refreshToken;

  // - Fetch new access token if it expires
  /*if (isAccessTokenExpired) {
    try {
      //  It can be REST API or GraphQL

      const data = await getNewAccessToken({ refreshToken: refreshToken });

      const cookieObj = {
        expiresIn: data.ExpiresIn,
        accessToken: data.AccessToken,
        refreshToken,
      };

      res.setHeader(
        "Set-Cookie",
        cookie.serialize(TOKEN_NAME, JSON.stringify(cookieObj), {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          maxAge: data.ExpiresIn,
          sameSite: "strict",
          path: "/",
        })
      );
    } catch (error) {
      // if refresh token fails to get new access token
      res.status(400).json({
        success: false,
        message: "Please logout user or push user to login route",
      });
    }
  }*/

  return Response.json(
    { success: true, token: parsedCookies?.accessToken ?? null },
    { status: 200 }
  );
}
