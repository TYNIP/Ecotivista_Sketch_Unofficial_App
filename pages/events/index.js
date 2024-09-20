/* EDUCATION */
import Meta from '../../components/seo/Meta';
import ComingSoon from '../../components/extras/ComingSoon';
const {PATHURL} = require('../api/config');

export default function EventsPage() {
  return (
    <>
      <Meta
        title="Eventos - Ecotivista"
        description="Eventos organisados por la comunidad de Ecotivista"
        canonical={`${PATHURL}/events`}
      />
      <ComingSoon></ComingSoon>
    </>
  );
}
