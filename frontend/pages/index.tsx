import React, { useContext } from 'react';
import useSWR from 'swr';
import axiosInstance from '../hooks/api/axios';
import { AuthContext } from '../hooks/firebase/authContext';
import { useFirebase } from '../hooks/firebase/useFirebase';

const Index = () => {
  const { user } = useContext(AuthContext);
  const { Logout } = useFirebase();

  const fetcher = (url: string) => axiosInstance.get(url).then((res) => res.data);
  const { data } = useSWR('/', fetcher);

  return (
    <div>
      <pre>{user ? user.displayName + 'でログインしています' : 'ログインしていません'}</pre>
      <button onClick={() => Logout()}>Logout</button>

      <h1>{data ? data.message : 'no message'}</h1>
    </div>
  );
};

export default Index;
