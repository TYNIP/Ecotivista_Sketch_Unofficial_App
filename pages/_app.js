// pages/_app.js
import '../styles/globals.css';
import MainLayout from '../components/layout/MainLayout';

function MyApp({ Component, pageProps }) {
  return (
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  );
}

export default MyApp;
