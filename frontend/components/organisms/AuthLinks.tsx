import { GoogleAuthProvider } from '@firebase/auth';
import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import useCreateUser from '../../hooks/api/user/useCreateUser';
import { useFirebase } from '../../hooks/firebase/useFirebase';

const AuthLinks = () => {
  const { firebaseAuth } = useFirebase();
  const { createUser } = useCreateUser();

  const uiConfig = {
    signInFlow: 'popup',
    signInSuccessUrl: '/private',
    signInOptions: [new GoogleAuthProvider().providerId],
    callbacks: {
      signInSuccessWithAuthResult: (authResult) => {
        const isNewUser = authResult.additionalUserInfo.isNewUser;
        if (isNewUser) {
          firebaseAuth.currentUser.getIdToken().then((token) => {
            createUser(token);
          });
        }
        return false;
      },
    },
  };

  return <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebaseAuth} />;
};

export default AuthLinks;
