import { AppProps } from 'next/app';
import { AuthProvider } from '../hooks/firebase/useFirebase';
import '../styles/globals.css';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
};

export default App;
