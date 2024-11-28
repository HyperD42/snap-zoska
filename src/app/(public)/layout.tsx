// src/app/layout.tsx

import { Metadata } from "next";
import "../globals.css";
export const metadata: Metadata = {
  title: "SnapZoška",
  description: "Created by Daniel Fučík of SPŠE Zochova 9, Bratislava",
};

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {children}
    </div>      
  );
}