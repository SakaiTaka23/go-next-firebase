import firebase from './firebase';
import axios from 'axios';
import { useRouter } from 'next/router';

const useFirebase = () => {
  const firebaseAuth = firebase.auth();
  const router = useRouter();

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
            axios.post('user', data, {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            });
            router.replace('/private');
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
