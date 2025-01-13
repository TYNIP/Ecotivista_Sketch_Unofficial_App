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
        description="Area de Activismo Ecotivista"
        canonical={`${PATHURL}/about/activism`}
      />
      
      <section className={styles.generalContainer}>
        <div className={styles.head}>
          <Image src={Logo} alt="Ecotivista Logo" />
          <h2>Área de Activismo</h2>
        </div>
        
        <article className={styles.mainContent}>
          <h2>Activismo en Ecotivista</h2>
          <p>
          El área de Activismo de Ecotivista es donde las ideas se convierten en acción. Nuestro propósito es empoderar a 
          las comunidades para que se movilicen, lideren y participen en iniciativas que impulsen un cambio positivo 
          en temas sociales, ambientales y de justicia climática.
          </p>

          <h3>¿Qué es Activismo en Ecotivista?</h3>
          <p>
          Es un espacio diseñado para conectar personas y grupos con objetivos comunes, ofreciendo las herramientas necesarias 
          para llevar a cabo proyectos y campañas que impacten de manera tangible. En Ecotivista, el activismo no es 
          solo protesta, sino construcción: trabajamos para generar soluciones colaborativas, sostenibles y a largo plazo.
          </p>

          <h3>¿Qué hacemos?</h3>
          <ul>
            <li><strong>Organización de Proyectos Comunitarios: </strong>Trabajamos con grupos locales para diseñar y ejecutar proyectos que aborden necesidades específicas, como la reforestación, campañas de reciclaje o proyectos de infraestructura sostenible.</li>
            <li><strong>Capacitación en Activismo Efectivo: </strong>A través de talleres y cursos, enseñamos estrategias para planificar, comunicar y ejecutar acciones que logren resultados concretos.</li>
            <li><strong>Promoción de la Participación Ciudadana: </strong>Impulsamos la colaboración entre individuos, colectivos y organizaciones para fortalecer las redes de apoyo mutuo.</li>
            <li><strong>Campañas de Concientización: </strong>Organizamos iniciativas que visibilizan problemáticas urgentes e invitan a la sociedad a actuar.</li>
            <li><strong>Movilización Virtual y Presencial: </strong>Diseñamos campañas tanto en plataformas digitales como en espacios físicos para maximizar el impacto.</li>
          </ul>

          
          <h3>Diversidad Temática</h3>
          <p>
          Desde luchas por la justicia social y climática hasta campañas que promuevan estilos de vida más sustentables, 
          el activismo en Ecotivista aborda una gran variedad de temas que responden a las necesidades y problemáticas actuales.
          </p>

          <h3>¿Por qué Activismo?</h3>
          <p>
          Porque creemos que las acciones colectivas tienen el poder de transformar realidades. En Ecotivista, 
          el activismo no se trata de esperar el cambio, sino de ser el cambio. Trabajamos para inspirar a las 
          personas a salir de su zona de confort y construir juntos un futuro más equitativo y sostenible.
          </p>
        
          <h2></h2>
          <h3>Estado actual del área</h3>
          <p>Actualmente, como Ecotivista está en sus primeras etapas de desarrollo, el área de Activismo aún no está activa, 
            pero estamos trabajando para que pronto lo esté. Si estás interesado en colaborar con nosotros, no dudes en ponerte 
            en contacto por correo o a través de nuestras redes sociales. ¡Estaremos encantados de escuchar tus ideas y sumar 
            esfuerzos!</p>

        </article>
      </section>
    </>
  );
}
