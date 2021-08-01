import React, { useContext } from 'react';
import { AuthContext } from '../hooks/firebase/authContext';

const privateFC = () => {
  const { user } = useContext(AuthContext);
  if (!user) {
    return <div>you are not logged in</div>;
  }
  return <div>private page</div>;
};

export default privateFC;
