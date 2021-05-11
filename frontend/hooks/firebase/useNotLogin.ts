import { useRouter } from 'next/dist/client/router';
import { useContext, useEffect } from 'react';
import { AuthContext } from './useFirebase';

const useNotLogin = () => {
  const { user, isLoading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    if (user) router.push('/private');
  }, [isLoading, user]);
};

export default useNotLogin;
