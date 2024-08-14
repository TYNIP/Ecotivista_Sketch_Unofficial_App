/* EDUCATION */
import Meta from '../../components/seo/Meta';
import ComingSoon from '../../components/extras/ComingSoon';
const {PATHURL} = require('../api/config');

export default function EducationPage() {
  return (
    <>
      <Meta
        title="Ecotivista | Education"
        description="This is the home page description."
        canonical={`${PATHURL}/education`}
      />
      <ComingSoon></ComingSoon>
    </>
  );
}
