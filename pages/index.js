// pages/index.js
import Meta from '../components/seo/Meta';

export default function Home() {
  return (
    <>
      <Meta
        title="Home Page"
        description="This is the home page description."
        canonical="http://localhost:3000/"
      />
      <h1>Welcome to the EcoPlatform Home Page</h1>
      <p>Fostering ecological knowledge, data exchange, and encouraging people to take action.</p>
    </>
  );
}
