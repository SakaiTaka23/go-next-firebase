import React, { useContext } from 'react';
import { AuthContext } from '../hooks/firebase/useFirebase';
import useRequiredLogin from '../hooks/firebase/useRequiredLogin';

const logout = () => {
  useRequiredLogin();
  const { Logout } = useContext(AuthContext);

  return (
    <div>
      <h1>Logout?</h1>
      <button onClick={() => Logout()}>Logout</button>
    </div>
  );
};

export default logout;
