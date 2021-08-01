import { createContext, useEffect, useState } from 'react';
import firebase from './firebase';

type AuthContextState = {
  user: firebase.User;
};

const AuthContext = createContext({} as AuthContextState);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<firebase.User>();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
      if (user) {
        user.getIdToken().then((idToken) => {
          localStorage.setItem('jwt', idToken);
        });
      }
    });
  }, []);

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
