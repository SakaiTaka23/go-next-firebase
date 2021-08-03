import React from 'react';
import AuthLinks from '../components/organisms/AuthLinks';
import SignupForm from '../components/organisms/form/SignupForm';

const signup = () => {
  return (
    <>
      <SignupForm />
      <AuthLinks />
    </>
  );
};

export default signup;
