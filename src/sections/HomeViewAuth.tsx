import Typography from "@mui/material/Typography";
import { Session } from "next-auth"; // Import Session type from next-auth

// Define the props interface
interface HomeViewAuthProps {
  session: Session; // Specify the type for session
}

export default function HomeViewAuth({ session }: HomeViewAuthProps) {
  return (
    <div>
      <Typography variant="h4">Vitajte späť, {session.user?.name}!</Typography>
    </div>
  );
}
