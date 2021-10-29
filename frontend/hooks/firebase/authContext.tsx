import { createContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import firebaseApp from './firebase';

type AuthContextState = {
  token: string;
  user: User;
};

const AuthContext = createContext({} as AuthContextState);

const AuthProvider = ({ children }) => {
  const firebaseAuth = getAuth(firebaseApp);
  const [user, setUser] = useState<User>();
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
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
