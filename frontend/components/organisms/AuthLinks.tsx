import axios from 'axios';
import React, { useContext } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { AuthContext, firebase } from '../../hooks/firebase/useFirebase';

const AuthLinks = () => {
  const { firebaseAuth } = useContext(AuthContext);
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
              axios.post('http://127.0.0.1:5000/create-user', data, {
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

  return <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebaseAuth} />;
};

export default AuthLinks;
