import React from 'react';
import AuthLinks from '../components/organisms/AuthLinks';
import SigninForm from '../components/organisms/form/SigninForm';
import useNotLogin from '../hooks/firebase/useNotLogin';

const signin = () => {
  useNotLogin();
  return (
    <>
      <SigninForm />
      <AuthLinks />
    </>
  );
};

export default signin;
