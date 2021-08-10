import firebase from './firebase';
import { useRouter } from 'next/router';
import useCreateUser from '../api/user/useCreateUser';

const useFirebase = () => {
  const firebaseAuth = firebase.auth();
  const router = useRouter();
  const { createUser, error } = useCreateUser();

  const Logout = () => {
    firebaseAuth.signOut().then(() => {
      window.location.reload();
    });
  };

  const SignUp = async (email: string, password: string, username: string) => {
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
    await firebaseAuth.signInWithEmailAndPassword(email, password).catch((error) => {
      alert(error);
    });
  };

  return {
    firebase,
    Logout,
    SignUp,
    SignIn,
  };
};

export { useFirebase };
