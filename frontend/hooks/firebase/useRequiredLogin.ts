import { useRouter } from 'next/dist/client/router';
import { useContext, useEffect } from 'react';
import { AuthContext } from './useFirebase';

const useRequiredLogin = () => {
  const { user, isLoading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    if (!user) router.push('/signin');
  }, [isLoading, user]);
};

export default useRequiredLogin;
