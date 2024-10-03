import type { Metadata } from "next";
import "./globals.css";
import NavBar from '../components/NavBar'; // Adjust the path accordingly if not using absolute imports

export const metadata: Metadata = {
  title: "SnapZoška",
  description: "Created by Daniel Fučík",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sk">
      <body >
          <main>{children}</main>
          <NavBar />
      </body>
    </html>
  );
}

