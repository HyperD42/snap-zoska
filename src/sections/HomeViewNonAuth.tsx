// sections/HomeViewNonAuth.tsx

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { signIn } from "next-auth/react"; // Import signIn from NextAuth

export default function HomeView() {
  return (
    <div>
      <Typography variant="h4">Vitajte na ZoškaSnap!</Typography>
        
        <Typography>Registrujte sa, aby ste mohli pridať príspevky a zobraziť profil</Typography>

    </div>
  );
}
