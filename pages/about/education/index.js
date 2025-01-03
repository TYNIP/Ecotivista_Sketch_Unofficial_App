/* ABOUT */
import Meta from '../../../components/seo/Meta';
const { PATHURL } = require('../../api/config');
import styles from '../../../styles/index.module.scss';
const Logo = require("../../../public/assets/ecotivistalogo.jpg");
import Image from "next/image";

export default function AboutPage() {
  return (
    <>
      <Meta
        title="Ecotivista | About"
        description="Area de Educación Ecotivista"
        canonical={`${PATHURL}/about/education`}
      />
      
      <section className={styles.aboutContainer}>
        <div className={styles.head}>
          <Image src={Logo} alt="Ecotivista Logo" />
          <h2>Area de Educación</h2>
        </div>
        
        <article className={styles.manifesto}>
          <h2>Educación en Ecotivista</h2>
          <p>
          En Ecotivista, la educación es el pilar fundamental para generar conciencia, construir conocimiento y 
          empoderar a las personas a tomar decisiones informadas. Creemos que solo a través del aprendizaje continuo y 
          accesible podemos sembrar las bases para un cambio profundo y sostenible.
          </p>

          <p>
          El área de Educación de Ecotivista es un espacio para el desarrollo y la difusión de recursos pedagógicos 
          innovadores que inspiren a las personas a involucrarse en temas de sustentabilidad, justicia social y problemas 
          globales actuales. Aquí, el aprendizaje no es un fin, sino un medio para construir comunidades más resilientes y 
          preparadas.
          </p>
          
          <h3>¿Qué hacemos?</h3>
          <ul>
            <li><strong>Cursos y Talleres Interactivos: </strong>Diseñamos programas educativos accesibles para todos los niveles, abordando temas como cambio climático, economía circular, energías renovables y más.</li>
            <li><strong>Material Didáctico Innovador: </strong>Producimos recursos educativos como guías, infografías, y videos explicativos adaptados a diferentes estilos de aprendizaje.</li>
            <li><strong>Aprendizaje Basado en Proyectos: </strong>Facilitamos actividades prácticas que permiten a los participantes aplicar conocimientos teóricos a situaciones del mundo real.</li>
            <li><strong>Espacios de Debate y Reflexión: </strong>Organizamos mesas redondas, foros y encuentros educativos para fomentar el pensamiento crítico y la discusión constructiva.</li>
            <li><strong>Educación Intergeneracional: </strong>Promovemos la inclusión de conocimientos tanto tradicionales como contemporáneos, integrando perspectivas diversas para enriquecer el aprendizaje.</li>
          </ul>

          <h3>Diversidad Temática</h3>
          <p>El área de Educación abarca una amplia variedad de temas, desde cuestiones ambientales hasta problemáticas sociales y económicas. Esto incluye tópicos como:</p>
          <ul>
            <li><strong>➤ Cambio climático y sustentabilidad.</strong></li>
            <li><strong>➤ Derechos humanos y equidad social.</strong></li>
            <li><strong>➤ Economía circular y consumo responsable.</strong></li>
            <li><strong>➤ Innovación tecnológica aplicada a la sostenibilidad.</strong></li>
            <li><strong>➤ Liderazgo comunitario y participación ciudadana.</strong></li>
          </ul>
          
          <h3>Nuestra Filosofía</h3>
          <p>
          En Ecotivista, entendemos que la educación no se trata solo de acumular información, sino de aprender a 
          actuar con propósito. Por ello, buscamos conectar a las personas con conocimientos útiles, accesibles y 
          relevantes para que puedan generar un impacto positivo en sus comunidades y en el mundo.
          </p>
        
          <h2></h2>
          <h3>Estado actual del área</h3>
          <p>Debido a que Ecotivista está en sus primeras etapas, el área de Educación aún no está activa. 
            Sin embargo, estamos trabajando arduamente para desarrollarla y ponerla en marcha muy pronto. 
            Si tienes interés en colaborar con esta area, ya sea como creador de contenido educativo o 
            proponiendo temas de interés, no dudes en contactarnos por correo o a través de nuestras redes sociales. 
            ¡Nos encantaría contar contigo en esta misión educativa!</p>

        </article>
      </section>
    </>
  );
}
