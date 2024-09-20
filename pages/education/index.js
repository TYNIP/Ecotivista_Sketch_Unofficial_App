/* EDUCATION */
import Meta from '../../components/seo/Meta';
import ComingSoon from '../../components/extras/ComingSoon';
const {PATHURL} = require('../api/config');

export default function EducationPage() {
  return (
    <>
      <Meta
        title="Educación - Ecotivista"
        description="Pagína de cursos educativos de la comunidad Ecotivista"
        canonical={`${PATHURL}/education`}
      />
      <ComingSoon></ComingSoon>
    </>
  );
}
