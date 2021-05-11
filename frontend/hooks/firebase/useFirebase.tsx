import firebase from './firebase';
import { createContext, useEffect, useState } from 'react';

type AuthContextState = {
  user: firebase.User;
  isLoading: boolean;
  firebaseAuth: firebase.auth.Auth;
};

const AuthContext = createContext({} as AuthContextState);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const firebaseAuth = firebase.auth();
  const firebaseUser = () => {
    return firebase.auth().currentUser;
  };

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, [firebaseAuth]);

  useEffect(() => {
    const setToken = async () => {
      const token = await firebaseUser()?.getIdToken();
      localStorage.setItem('token', token);
    };
    setToken();
  }, [firebaseUser]);

  return <AuthContext.Provider value={{ user, isLoading, firebaseAuth }}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider, firebase };
