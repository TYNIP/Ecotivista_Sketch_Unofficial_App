/* Forums */
import Meta from '../../components/seo/Meta';
import ComingSoon from '../../components/extras/ComingSoon';
const {PATHURL} = require('../api/config');

export default function ForumsPage() {
  return (
    <>
      <Meta
        title="Foros - Ecotivista"
        description="Foros organisados por la comunidad de Ecotivista"
        canonical={`${PATHURL}/forums`}
      />
      <ComingSoon></ComingSoon>
    </>
  );
}
