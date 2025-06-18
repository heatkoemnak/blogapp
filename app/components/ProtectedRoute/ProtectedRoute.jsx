'use client';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Processing from '../ui/Reusable/Processing';

export default function ProtectedRoute(Component) {
  return function WithAuth(props) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (status === 'unauthenticated') {
        signIn(); // Redirect to sign-in
      }
    }, [status]);

    if (status === 'loading') {
      return <Processing state="Loading..." />;
    }

    if (status === 'authenticated') {
      return <Component {...props} />;
    }

    return null;
  };
}
