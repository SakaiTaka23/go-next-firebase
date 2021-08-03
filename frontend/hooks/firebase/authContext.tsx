import { createContext, useEffect, useState } from 'react';
import firebase from './firebase';

type AuthContextState = {
  token: string;
  user: firebase.User;
};

const AuthContext = createContext({} as AuthContextState);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<firebase.User>();
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
      if (user) {
        user.getIdToken().then((idToken) => {
          localStorage.setItem('jwt', idToken);
          setToken(idToken);
        });
      }
    });
  }, []);

  return <AuthContext.Provider value={{ token, user }}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
