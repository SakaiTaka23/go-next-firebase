import React from 'react';
import AuthLinks from '../components/organisms/AuthLinks';
import SigninForm from '../components/organisms/form/SigninForm';

const signin = () => {
  return (
    <>
      <SigninForm />
      <AuthLinks />
    </>
  );
};

export default signin;
