// src/app/(home)/page.tsx

"use client"; // This ensures we can use hooks like useSession

import { useSession } from "next-auth/react";
import HomeView from "../../sections/HomeViewNonAuth"; // Update the import path to sections
import HomeViewAuth from "../../sections/HomeViewAuth"; // Update the import path to sections

export default function Home() {
  const { data: session } = useSession();

  // Render HomeView for unauthenticated users and HomeViewAuth for authenticated users
  return session ? <HomeViewAuth session={session} /> : <HomeView />;
}
