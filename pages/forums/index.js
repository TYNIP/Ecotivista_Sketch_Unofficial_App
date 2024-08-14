/* Forums */
import Meta from '../../components/seo/Meta';
import ComingSoon from '../../components/extras/ComingSoon';
const {PATHURL} = require('../api/config');

export default function ForumsPage() {
  return (
    <>
      <Meta
        title="Ecotivista | Forums"
        description="This is the home page description."
        canonical={`${PATHURL}/forums`}
      />
      <ComingSoon></ComingSoon>
    </>
  );
}
