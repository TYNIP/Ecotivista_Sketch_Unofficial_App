/* ARTICLES */
import Meta from '../../components/seo/Meta';
const {PATHURL} = require('../api/config');

export default function ArticlesPage() {
  return (
    <>
      <Meta
        title="Articulos - Ecotivista"
        description="Articulos de investigación de la comunidad de Ecotivista"
        canonical={`${PATHURL}/articles`}
      />
      <h1>Articulos</h1>
    </>
  );
}