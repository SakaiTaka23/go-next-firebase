import React from 'react';
import AuthLinks from '../components/organisms/AuthLinks';
import useNotLogin from '../hooks/firebase/useNotLogin';

const signup = () => {
  useNotLogin();
  return <AuthLinks />;
};

export default signup;
