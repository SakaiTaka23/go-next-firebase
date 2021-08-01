import React, { useContext } from 'react';
import { AuthContext } from '../hooks/firebase/authContext';
import { useFirebase } from '../hooks/firebase/useFirebase';

const Index = () => {
  const { user } = useContext(AuthContext);
  const { Logout } = useFirebase();

  return (
    <div>
      <pre>{user ? user.displayName + 'でログインしています' : 'ログインしていません'}</pre>
      <button onClick={() => Logout()}>Logout</button>
    </div>
  );
};

export default Index;
