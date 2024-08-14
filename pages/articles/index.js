/* ARTICLES */
import Meta from '../../components/seo/Meta';
const {PATHURL} = require('../api/config');

export default function ArticlesPage() {
  return (
    <>
      <Meta
        title="Ecotivista | Articles"
        description="The House of Independent Journalism, Activism and Education."
        canonical={`${PATHURL}/articles`}
      />
      <h1>Articles of Ecotivista</h1>
    </>
  );
}