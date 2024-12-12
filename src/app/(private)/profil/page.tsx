"use client"
// src/app/profil/page.tsx

import { useSession } from "next-auth/react";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";

export default function Profil() {
  const { data: session } = useSession();
  if (session != null){
  return (
    <>
      <Avatar
          alt={session?.user?.name || "User"}
          src={session?.user?.image || "/default-avatar.png"}
        />
      <Typography variant="h6">Vitajte, {session.user?.name}</Typography>
      <Typography>Email: {session.user?.email}</Typography>
    </>
  );
}
}
