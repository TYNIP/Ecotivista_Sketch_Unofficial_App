/* ABOUT */
import Meta from '../../components/seo/Meta';
const { PATHURL } = require('../api/config');
import styles from '../../styles/index.module.scss';
const Logo = require("../../public/assets/ecotivistalogo.jpg");
import Image from "next/image";

export default function AboutPage() {
  return (
    <>
      <Meta
        title="Ecotivista | About"
        description="Manifesto Completo Ecotivista"
        canonical={`${PATHURL}/about`}
      />
      
      <section className={styles.aboutContainer}>
        <div className={styles.head}>
          <Image src={Logo} alt="Ecotivista Logo" />
          <h2>¡Si tienes un sueño de cambio, ya formas parte de Ecotivista!</h2>
        </div>
        
        <article className={styles.manifesto}>
          <h2>Manifesto</h2>
          <p>
          Vivimos en una era donde la participación ciudadana ya no es una opción, sino una necesidad urgente. 
          Ecotivista nace de la profunda convicción de que la acción colectiva y el empoderamiento ciudadano son 
          claves para enfrentar los desafíos de nuestra época. Somos una plataforma que integra educación, activismo y 
          periodismo independiente, con el objetivo de crear una comunidad sólida que fomente el cambio positivo dentro 
          de nuestras sociedades. En Ecotivista, creemos que el conocimiento, la participación y la colaboración son los 
          pilares fundamentales para transformar la realidad y construir un futuro más equitativo y sustentable.
          </p>

          <h3>Contexto Actual</h3>
          <p>
          El cambio climático, la degradación ambiental, la desigualdad social y la falta de participación ciudadana 
          son algunas de las crisis interconectadas que enfrentamos hoy. El acceso desigual a recursos, la percepción de que 
          involucrarse en proyectos sostenibles es peligroso o costoso, y la falta de un sentido de comunidad en estos 
          esfuerzos han sido barreras significativas que impiden la participación activa.
          </p>
          <p>
          Durante un proceso de investigación llevado por Ecotivista, se ha hablado con estudiantes de secundaria y universidad, 
          colectivos estudiantiles y personas de diferentes partes del mundo, quienes comparten frustraciones similares: 
          falta de apoyo para las pequeñas organizaciones, miedo a involucrarse, falta de acceso a recursos, y la 
          ausencia de una comunidad motivada y comprometida con el cambio.
          </p>
          
          <h3>Visión</h3>
          <p>
          Nuestra visión es construir una sociedad donde todas las personas, independientemente de su contexto, 
          puedan participar activamente en la creación y/o desarrollo de ideas y proyectos de impacto social. 
          Aspiramos a una cultura de responsabilidad compartida, donde el acceso a la información, los recursos y las 
          herramientas necesarias no sean un privilegio sino un derecho. Queremos un futuro donde se eliminen todo tipo de 
          barreras culturales entre las distintas sociedades o entes de estas mismas para su libre expresión. 
          Un espacio donde investigadores, académicos, estudiantes y público en general, puedan expresarse libremente, 
          publicar artículos, investigaciones u opiniones. 
          </p>
          
          <h3>Misión</h3>
          <p>
          La misión de Ecotivista es proporcionar una plataforma inclusiva y accesible que fomente la creación, 
          promoción y apoyo de proyectos que beneficien a nuestras sociedades. Lo hacemos mediante la provisión de 
          herramientas educativas, la promoción de una comunidad comprometida y la amplificación de voces que buscan 
          soluciones para los problemas más urgentes de nuestro tiempo. Nos esforzamos por unir educación, periodismo 
          y activismo independiente para fomentar una red de acción climática y social capaz de generar impactos tangibles.
          </p>
          
          <h3>Fundamentos de Ecotivista</h3>
          <ul>
            <li><strong>Acción Comunitaria:</strong> Creemos en el poder de la comunidad como motor de cambio. Las soluciones de los desafíos de nuestra época no es una responsabilidad individual, sino un esfuerzo colectivo. Trabajamos para crear un espacio donde las personas puedan conectarse, colaborar y apoyar iniciativas que promuevan el bienestar común.</li>
            <li><strong>Diversidad de Perspectivas:</strong> Nos comprometemos a incluir una variedad de voces, especialmente aquellas que tradicionalmente han sido marginadas en las discusiones sobre sostenibilidad, como comunidades indígenas y pequeños colectivos. Valoramos los conocimientos ancestrales tanto como las innovaciones científicas y tecnológicas.</li>
            <li><strong>Periodismo Independiente:</strong> El acceso a información veraz, clara y no sesgada es esencial para la toma de decisiones informadas. En Ecotivista, promovemos un periodismo que da visibilidad a los problemas medioambientales y sociales desde una perspectiva crítica y comprometida.</li>
            <li><strong>Empoderamiento a través de la Educación: </strong> El conocimiento es una herramienta poderosa para el cambio. Nuestra plataforma se dedica a proporcionar recursos educativos accesibles para que cualquier persona, sin importar su experiencia previa, pueda aprender sobre sostenibilidad, activismo y cómo generar impacto.</li>
            <li><strong>Innovación para la Sostenibilidad:</strong> Ecotivista es un espacio que alienta la innovación en todas sus formas. Desde soluciones tecnológicas hasta modelos de negocio sostenibles, buscamos constantemente nuevas formas de abordar los desafíos actuales y futuros.</li>
          </ul>

          <h3>Principios Rectores</h3>
          <ul>
            <li><strong>Transparencia y Confianza: </strong> La transparencia en todas las operaciones es fundamental para construir la confianza dentro de nuestra comunidad. Todas las decisiones, alianzas, y actividades de la plataforma estarán claramente comunicadas y abiertas a la crítica constructiva.</li>
            <li><strong>Acceso Inclusivo:</strong> Nos comprometemos a que todas las personas, independientemente de su ubicación geográfica o nivel de educación, puedan acceder a los recursos necesarios para participar en proyectos de impacto social y de sustentabilidad.</li>
            <li><strong>Colaboración Global y Local:</strong> Ecotivista fomenta una interacción continua entre las iniciativas locales y globales, reconociendo que las soluciones a las problemáticas medioambientales y sociales, deben adaptarse a los contextos específicos, pero también aprender de las experiencias compartidas a nivel mundial.</li>
            <li><strong>Autonomía y Participación Ciudadana: </strong> Reconocemos el derecho y la capacidad de las personas para tomar decisiones informadas sobre sus comunidades y entornos. Buscamos derribar las barreras de participación al empoderar a la ciudadanía con las herramientas, la información y el apoyo que necesitan para convertirse en agentes activos de cambio</li>
          </ul>

          <h3>Objetivos</h3>
          <ul>
            <li><strong>Crear una Comunidad Fuerte y Unida: </strong> A corto plazo, el objetivo de Ecotivista es construir una comunidad local comprometida y altamente motivada que sirva de ejemplo para futuras expansiones. Esta comunidad servirá como un espacio de aprendizaje, apoyo mutuo y acción coordinada para proyectos de impacto social y de sustentabilidad.</li>
            <li><strong>Promover la Participación Activa:</strong> Queremos involucrar a estudiantes, pequeñas organizaciones, y a la ciudadanía en general, proporcionando no solo la motivación para actuar, sino también los medios para hacerlo. La educación y la concienciación son esenciales para motivar la acción colectiva.</li>
            <li><strong>Fortalecer la Educación y la Innovación:</strong> Ecotivista ofrecerá cursos, talleres y materiales educativos que permitan a las personas aprender sobre sostenibilidad y de problemáticas sociales, desde conceptos básicos hasta avanzadas. Además, fomentaremos el desarrollo de soluciones innovadoras que puedan aplicarse a nivel local y global.</li>
            <li><strong>Apoyar el Periodismo Independiente: </strong> Continuaremos amplificando las voces que hablan sobre sostenibilidad y justicia social de manera independiente, desafiando narrativas convencionales y destacando las historias que deben ser contadas.</li>
          </ul>

          <h3>Estructura Organizacional</h3>
          <ul>
            <li><strong>Educación </strong> Un equipo dedicado a la creación de contenido educativo de calidad que sea accesible y relevante para una amplia audiencia. Esto incluye la creación de recursos interactivos, artículos, infografías, podcasts, y videos.</li>
            <li><strong>Periodismo y Comunicación:</strong> Un equipo encargado de investigar, escribir y publicar artículos de periodismo independiente que destaquen los temas más importantes relacionados con la sostenibilidad, justicia climática y social, y participación ciudadana.</li>
            <li><strong>Activismo y Colaboración Comunitaria:</strong> Este equipo se encargará de coordinar actividades y proyectos sostenibles dentro de la comunidad, organizando eventos, campañas y oportunidades de voluntariado que fomenten la acción directa.</li>
          </ul>
          
          <h3>¿Por qué hacemos lo que hacemos?</h3>
          <p>
            Ecotivista es mucho más que una plataforma; es un movimiento. Queremos crear un espacio donde todas las personas puedan sentirse seguras, apoyadas y empoderadas para actuar. Entendemos que los retos a los que nos enfrentamos son grandes, pero creemos que la acción colectiva, la innovación, y la colaboración pueden llevarnos hacia un futuro más justo y sostenible.
          </p>
          <p>Nos comprometemos a trabajar incansablemente para construir sociedades donde el bienestar integral no sea solo una meta lejana, sino una realidad cotidiana que todos y todas ayudamos a construir. </p>
        
          <h2></h2>
          <p>Este manifiesto es una declaración de los principios y propósitos de Ecotivista, y marca el inicio de un camino 
            hacia la transformación social a través de la acción colectiva.</p>

        </article>
      </section>
    </>
  );
}
