"use client"
// src/app/profil/page.tsx

import { useSession, signIn } from "next-auth/react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function Profil() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div>
        <Typography variant="h6">Nie ste prihlásený!</Typography>
        <Button variant="contained" color="primary" onClick={() => signIn()}>
          Prihlásiť sa
        </Button>
      </div>
    );
  }

  return (
    <div>
      <Typography variant="h6">Vitajte, {session.user?.name}</Typography>
      <Typography>Email: {session.user?.email}</Typography>
    </div>
  );
}
