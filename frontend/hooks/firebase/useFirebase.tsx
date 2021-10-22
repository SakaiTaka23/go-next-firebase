import { useRouter } from 'next/router';
import useCreateUser from '../api/user/useCreateUser';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile } from '@firebase/auth';
import firebaseApp from './firebase';

const useFirebase = () => {
  const firebaseAuth = getAuth(firebaseApp);
  const router = useRouter();
  const { createUser, error } = useCreateUser();

  const Logout = () => {
    firebaseAuth.signOut().then(() => {
      window.location.reload();
    });
  };

  const SignUp = async (email: string, password: string, username: string) => {
    await createUserWithEmailAndPassword(firebaseAuth, email, password)
      .then((result) => {
        updateProfile(result.user, {
          displayName: username,
        });
      })
      .then(() => {
        firebaseAuth.currentUser.getIdToken(true).then((token) => {
          const data = JSON.stringify({ name: username });
          createUser(token, data);
          if (error) {
            alert(error.message);
            return;
          }
          console.log(error);
          router.replace('/private');
        });
      });
  };

  const SignIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(firebaseAuth, email, password).catch((error) => {
      alert(error);
    });
  };

  return {
    firebaseAuth,
    Logout,
    SignUp,
    SignIn,
  };
};

export { useFirebase };
