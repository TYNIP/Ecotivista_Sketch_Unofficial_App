/* HOME */
import Meta from '../../../components/seo/Meta';
import {PATHURL} from '../../api/config';

export default function HomePage() {
  return (
    <>
      <Meta
        title="Ecotivista"
        description="The House of Independent Journalism, Activism and Education."
        canonical={`${PATHURL}/terms-service/privacy-policy`}
      />
      <h1>Politica de Privacidad</h1>
    </>
  );
}
