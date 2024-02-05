import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lookups",
  description: "Public lookups layout",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="px-8">{children}</div>;
}
