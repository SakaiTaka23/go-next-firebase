import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import useCreateUser from '../../hooks/api/user/useCreateUser';
import { useFirebase } from '../../hooks/firebase/useFirebase';

const AuthLinks = () => {
  const { firebase } = useFirebase();
  const { createUser } = useCreateUser();
  const uiConfig = {
    signInFlow: 'popup',
    signInSuccessUrl: '/private',
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccessWithAuthResult: (authResult) => {
        const isNewUser = authResult.additionalUserInfo.isNewUser;
        if (isNewUser) {
          firebase
            .auth()
            .currentUser.getIdToken()
            .then((token) => {
              createUser(token);
            });
        }
        return false;
      },
    },
  };

  return <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />;
};

export default AuthLinks;
