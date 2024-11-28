

import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { getServerSession } from 'next-auth'; // Adjust this import based on your project structure
import { permanentRedirect } from 'next/navigation'; // Assuming you're using Next.js with the app router

const AuthGuard = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    permanentRedirect("/auth/prihlasenie");
    return null; // No need to render anything if redirecting
  }

  return <>{children}</>;
};

export default AuthGuard;

