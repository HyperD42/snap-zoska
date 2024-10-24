import Typography from "@mui/material/Typography";
import { Session } from "next-auth"; // Import Session type from next-auth

// Define the props interface

export default function HomeViewAuth({ session }: { session: Session }) {
  return (
    <div>
      <Typography variant="h4">Vitajte späť, {session?.user?.name}!</Typography>
    </div>
  );
}
