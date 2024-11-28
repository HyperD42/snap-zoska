// src\app\(private)\layout.tsx

import { Metadata } from "next";
import "../globals.css";
import AuthGuard from "@/components/AuthGuard";

export const metadata: Metadata = {
  title: "SnapZoška",
  description: "Created by Daniel Fučík of SPŠE Zochova 9, Bratislava",
};

export default async function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AuthGuard>{children}</AuthGuard>
}
