/* EDUCATION */
import Meta from '../../components/seo/Meta';
import ComingSoon from '../../components/extras/ComingSoon';

export default function Home() {
  return (
    <>
      <Meta
        title="Ecotivista | Events"
        description="This is the home page description."
        canonical="http://localhost:3000/"
      />
      <ComingSoon></ComingSoon>
    </>
  );
}
