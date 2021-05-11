import React, { useContext } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { AuthContext, firebase } from '../../hooks/firebase/useFirebase';

const AuthLinks = () => {
  const { firebaseAuth } = useContext(AuthContext);
  const uiConfig = {
    signInFlow: 'popup',
    signInSuccessUrl: '/private',
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID, firebase.auth.EmailAuthProvider.PROVIDER_ID],
  };

  return <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebaseAuth} />;
};

export default AuthLinks;
