import { createTheme, CssBaseline, ThemeProvider, StyledEngineProvider, useMediaQuery } from '@mui/material';
import axios from 'axios';
import { AppProps } from 'next/app';
import { useEffect, useMemo } from 'react';
import { AuthProvider } from '../hooks/firebase/authContext';
import '../styles/globals.css';

axios.defaults.baseURL = 'http://127.0.0.1:5000';

const App = ({ Component, pageProps }: AppProps) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode]
  );

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
