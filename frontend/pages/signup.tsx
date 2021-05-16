import React from 'react';
import AuthLinks from '../components/organisms/AuthLinks';
import MailPasswordForm from '../components/organisms/MailPasswordForm';
import useNotLogin from '../hooks/firebase/useNotLogin';

const signup = () => {
  useNotLogin();
  return (
    <>
      <MailPasswordForm />
      <AuthLinks />
    </>
  );
};

export default signup;
