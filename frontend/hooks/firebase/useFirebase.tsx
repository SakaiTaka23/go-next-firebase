import firebase from './firebase';
import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

type AuthContextState = {
  user: firebase.User;
  isLoading: boolean;
  firebaseAuth: firebase.auth.Auth;
  Logout: () => void;
  Signup: (email: string, password: string, username: string) => Promise<void>;
  Signin: (email: string, password: string) => Promise<void>;
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
      if (token !== undefined) {
        localStorage.setItem('token', token);
      }
    };
    setToken();
  }, [firebaseUser]);

  const Logout = () => {
    firebaseAuth.signOut().then(() => {
      window.location.reload();
    });
  };

  const Signup = async (email: string, password: string, username: string) => {
    await firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        result.user.updateProfile({
          displayName: username,
        });
      })
      .then(() => {
        firebase
          .auth()
          .currentUser.getIdToken(true)
          .then((token) => {
            const data = JSON.stringify({ name: username });
            axios.post('http://127.0.0.1:5000/create-user', data, {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            });
          });
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
      });
  };

  const Signin = async (email: string, password: string) => {
    await firebaseAuth.signInWithEmailAndPassword(email, password).catch((error) => {
      alert(error);
    });
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, firebaseAuth, Logout, Signup, Signin }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider, firebase };
