// src/app/(home)/page.tsx

import HomeView from "../../sections/HomeView"; // Update the import path to sections
import HomeViewAuth from "../../sections/HomeViewAuth"; // Update the import path to sections
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";

export default async function Home() {
  const session = await getServerSession(authOptions);

  // Render HomeView for unauthenticated users and HomeViewAuth for authenticated users
  return session ? <HomeViewAuth session={session} /> : <HomeView />;
}
