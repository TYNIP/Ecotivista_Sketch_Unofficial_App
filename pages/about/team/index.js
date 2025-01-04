/* ABOUT */
import Meta from '../../../components/seo/Meta';
const { PATHURL } = require('../../api/config');
import styles from '../../../styles/index.module.scss';
const Logo = require("../../../public/assets/ecotivistalogo.jpg");
import Image from "next/image";
import {testimonials} from "../data";

export default function AboutPage() {

  return (
    <>
      <Meta
        title="Ecotivista | About"
        description="Equipo de Ecotivista"
        canonical={`${PATHURL}/about/team`}
      />
      
      <section className={styles.generalContainer}>
        <div className={styles.head}>
          <Image src={Logo} alt="Ecotivista Logo" />
          <h2>Equipo</h2>
        </div>
        
        <article className={styles.mainContent}>
          <h2>¿Quiénes somos?</h2>
          <p>
          Ecotivista está conformado por un equipo diverso y apasionado de estudiantes provenientes de distintas universidades, 
          carreras e intereses. Desde el Tecnológico de Monterrey, la UNAM, y el CIDE, nos unimos con un propósito claro: 
          contribuir al cambio positivo y construir un futuro más justo y sostenible.
          </p>

          <p>
          Cada uno de nosotros aporta su propia perspectiva y experiencia, enriqueciendo el proyecto con conocimientos de 
          diferentes disciplinas, desde ciencias sociales y humanidades, hasta ingeniería, negocios y diseño.
          </p>

          <p>
          Lo que nos une no es solo nuestra formación académica, sino nuestra profunda convicción de que juntos podemos 
          enfrentar los grandes desafíos de nuestra época. En Ecotivista encontramos un espacio donde podemos colaborar, 
          aprender unos de otros y convertir nuestras ideas en acciones concretas.
          </p>

          <p>
          Nos motiva ser parte de una comunidad que cree en el poder de la educación, 
          el activismo y el periodismo independiente como herramientas para transformar nuestro entorno. 
          Creemos que cualquier persona, con las herramientas adecuadas, puede generar un impacto real en su 
          comunidad y más allá.
          </p>


        <section className={styles.testimonials}>
          <h2>Equipo</h2>
          <div className={styles.testimonialGrid}>
            {testimonials.map((testimonial, index) => (
              <div key={index} className={styles.testimonialCard}>
                <h3>{testimonial.name}</h3>
                <h4>{testimonial.area}</h4>
                <p>{testimonial.testimony}</p>
              </div>
            ))}
          </div>
        </section>

        </article>
      </section>
    </>
  );
}
