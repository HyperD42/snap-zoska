"use client"
// src/app/auth/prihlasenie/page.tsx

import { signIn } from "next-auth/react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function Prihlasenie() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "2rem" }}>
      <Typography variant="h4">Prihlásenie</Typography>
      <Button variant="contained" color="primary" onClick={() => signIn("google")}>
        Prihlásiť sa pomocou Google
      </Button>
    </div>
  );
}
