// pages/_app.js
import '../styles/globals.css';
import MainLayout from '../components/layout/MainLayout';
import { AuthProvider } from './api/context/AuthContext';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </AuthProvider>
  );
}

export default MyApp;
