"use client"
// src/app/auth/odhlasenie/page.tsx

import { signOut } from "next-auth/react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function Odhlasenie() {
  return (
    <>
      <Typography variant="h4">Odhlásenie</Typography>
      <Button variant="contained" onClick={() => signOut()}>
        Odhlásiť sa
      </Button>
    </>
  );
}
