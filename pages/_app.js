// pages/_app.js
import '../styles/globals.css';
import MainLayout from '../components/layout/MainLayout';
import { AuthProvider } from './api/context/AuthContext';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AuthProvider>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </AuthProvider>
    </>
  );
}

export default MyApp;
