import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { CustomJWTPayload } from "@/types/auth.types";
import { AuthContextProvider } from "../Context/AuthContext";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const appCookie = cookies().get("jwt-token")?.value ?? "";
  const parsedCookies = appCookie ? JSON.parse(appCookie) : {};
  const accessToken = parsedCookies?.accessToken ?? null;

  if (!accessToken) {
    redirect("/auth/login");
  }

  const decodedToken = jwtDecode<CustomJWTPayload>(accessToken);

  const isAccessTokenExpired = Date.now() / 1000 > (decodedToken.exp || 0);

  if (isAccessTokenExpired) redirect("/auth/login");

  return (
    <AuthContextProvider
      value={{
        user: {
          firstName: decodedToken.firstName,
          lastName: decodedToken.lastName,
          email: decodedToken.email,
          id: decodedToken.id,
        },
        isAuthenticated: decodedToken.isAuthenticated,
      }}
    >
      <div className="px-8">{children}</div>
    </AuthContextProvider>
  );
}
