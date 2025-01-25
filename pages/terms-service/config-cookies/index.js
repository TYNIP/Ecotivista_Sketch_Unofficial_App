/* HOME */
import Meta from '../../../components/seo/Meta';
import {PATHURL} from '../../api/config';
import ComingSoon from '@/components/extras/ComingSoon';

export default function HomePage() {
  return (
    <>
      <Meta
        title="Ecotivista"
        description="The House of Independent Journalism, Activism and Education."
        canonical={`${PATHURL}/terms-service/config-cookies`}
      />
        <ComingSoon/>
        <p style={{"width":"100%", "textAlign":"center"}}>Actualmente no se recopila información por cookies</p>
    </>
  );
}
