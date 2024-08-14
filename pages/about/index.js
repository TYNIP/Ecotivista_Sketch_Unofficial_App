/* ABOUT */
import Meta from '../../components/seo/Meta';
const {PATHURL} = require('../api/config');

export default function AboutPage() {
  return (
    <>
      <Meta
        title="Ecotivista | About"
        description="The House of Independent Journalism, Activism and Education."
        canonical={`${PATHURL}/about`}
      />
      <h1>About Ecotivista</h1>
    </>
  );
}