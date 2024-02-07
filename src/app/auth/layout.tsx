import type { Metadata } from "next";
import DefaultNavbar from "@/Components/Navbars/DefaultNavbar";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { CustomJWTPayload } from "@/types/auth.types";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Lookup Auth",
  description: "Lookup auth",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const appCookie = cookies().get("jwt-token")?.value ?? "";
  const parsedCookies = appCookie ? JSON.parse(appCookie) : {};
  const accessToken = parsedCookies?.accessToken ?? null;

  if (accessToken) {
    const decodedToken = jwtDecode<CustomJWTPayload>(accessToken);
    const isAccessTokenExpired = Date.now() / 1000 > (decodedToken.exp || 0);
    if (!isAccessTokenExpired) return redirect("/dashboard");
  }

  return <div>{children}</div>;
}
