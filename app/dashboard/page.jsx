// app/dashboard/page.js
'use client';

import { useSession, signIn } from 'next-auth/react';
import { useEffect } from 'react';

export default function Dashboard() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      signIn();
    }
  }, [status]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {session ? (
        <div>Protected content for {session.user.email}</div>
      ) : (
        <div>Redirecting to sign in...</div>
      )}
    </div>
  );
}
