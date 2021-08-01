import axios from 'axios';
import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { useFirebase } from '../../hooks/firebase/useFirebase';

const AuthLinks = () => {
  const { firebase } = useFirebase();
  const uiConfig = {
    signInFlow: 'popup',
    signInSuccessUrl: '/private',
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccessWithAuthResult: (authResult) => {
        const isNewUser = authResult.additionalUserInfo.isNewUser;
        firebase
          .auth()
          .currentUser.getIdToken()
          .then((token) => {
            if (isNewUser) {
              console.log(token);
              const data = {};
              axios.post('user', data, {
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
                },
              });
            }
          });

        return false;
      },
    },
  };

  return <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />;
};

export default AuthLinks;
