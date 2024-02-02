"use client";
import { CustomJWTPayload, IAuthContext } from "@/types/auth.types";
import { createContext } from "react";

export const AuthContext = createContext<IAuthContext | null>(null);

export function AuthContextProvider({
  children,
  value,
}: Readonly<{
  children: React.ReactNode;
  value: IAuthContext;
}>) {
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
