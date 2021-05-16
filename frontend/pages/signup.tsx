import React from 'react';
import AuthLinks from '../components/organisms/AuthLinks';
import SignupForm from '../components/organisms/form/SignupForm';
import useNotLogin from '../hooks/firebase/useNotLogin';

const signup = () => {
  useNotLogin();
  return (
    <>
      <SignupForm />
      <AuthLinks />
    </>
  );
};

export default signup;
