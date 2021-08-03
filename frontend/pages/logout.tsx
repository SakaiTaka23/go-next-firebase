import React from 'react';
import { useFirebase } from '../hooks/firebase/useFirebase';

const logout = () => {
  const { Logout } = useFirebase();

  return (
    <div>
      <h1>Logout?</h1>
      <button onClick={() => Logout()}>Logout</button>
    </div>
  );
};

export default logout;
