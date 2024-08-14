/* HOME */
import Meta from '../components/seo/Meta';
import {PATHURL} from './api/config';

export default function HomePage() {
  return (
    <>
      <Meta
        title="Ecotivista"
        description="The House of Independent Journalism, Activism and Education."
        canonical={`${PATHURL}`}
      />
      <h1>Welcome to the Ecotivista Home Page</h1>
      <p>Fostering ecological knowledge, data exchange, and encouraging people to take action.</p>
    </>
  );
}
