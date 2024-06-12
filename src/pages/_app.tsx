import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import 'simplebar-react/dist/simplebar.min.css';
import '../styles/globals.css';

// ** Store Imports
import { Provider } from 'react-redux';
import { createTheme } from '@/theme';
import store from '@/store';
import { AuthProvider } from '@/contexts/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthGuard from '@/components/AuthGuard';
import Loader from '@/components/feedback/Loader';
import { useNProgress } from '@/components/hooks/useNProgress';
import NoAuthGuard from '@/components/NoAuthGuard';

const Guard = ({ children, authGuard, noAuthGuard }: any) => {
  if (authGuard) {
    return (
      <AuthGuard fallback={<Loader center />}>{children}</AuthGuard>
    );
  } else if (noAuthGuard) {
    return (
      <NoAuthGuard fallback={<Loader center />}>
        {children}
      </NoAuthGuard>
    );
  } else {
    return <>{children}</>;
  }
};

const App = (props: any) => {
  const { Component, pageProps } = props;

  useNProgress();

  const getLayout = Component.getLayout ?? ((page: any) => page);

  const authGuard = Component.authGuard ?? false;
  const noAuthGuard = Component.noAuthGuard ?? false;

  const theme = createTheme();

  return (
    <Provider store={store}>
      <ToastContainer position="bottom-left" />
      <AuthProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Guard authGuard={authGuard} noAuthGuard={noAuthGuard}>
              {getLayout(<Component {...pageProps} />)}
            </Guard>
          </ThemeProvider>
        </LocalizationProvider>
      </AuthProvider>
    </Provider>
  );
};

export default App;
