import React from 'react';
import useRequiredLogin from '../hooks/firebase/useRequiredLogin';

const privatefc = () => {
  useRequiredLogin();
  return <div>private page</div>;
};

export default privatefc;
