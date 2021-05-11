import { useContext } from 'react';
import { AuthContext } from '../hooks/firebase/useFirebase';

const Home = () => {
  const { user, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <h1>loading</h1>;
  }

  return (
    <div>
      <pre>{user ? user.displayName + 'でログインしています' : 'ログインしていません'}</pre>
    </div>
  );
};

export default Home;
