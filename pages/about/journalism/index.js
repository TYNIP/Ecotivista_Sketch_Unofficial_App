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
        description="Area de Periodismo Ecotivista"
        canonical={`${PATHURL}/about/journalism`}
      />
      
      <section className={styles.generalContainer}>
        <div className={styles.head}>
          <Image src={Logo} alt="Ecotivista Logo" />
          <h2>Área de Periodismo</h2>
        </div>
        
        <article className={styles.mainContent}>
          <h2>Periodismo en Ecotivista</h2>
          <p>
          El área de Periodismo de Ecotivista es el corazón informativo del proyecto, dedicado a investigar, analizar y comunicar 
          las realidades más urgentes relacionadas con la sostenibilidad, la justicia social y climática, y la participación 
          ciudadana.
          </p>

          <p>
          En un mundo saturado de información, ofrecemos una alternativa: un periodismo independiente, crítico y comprometido que 
          conecta a las personas con historias relevantes y soluciones prácticas. Nuestro objetivo es garantizar que todos 
          tengan acceso a contenido de calidad, presentado de formas accesibles y atractivas, para inspirar la reflexión, 
          la discusión y la acción.
          </p>

          <h3>¿Qué hacemos?</h3>
          <ul>
            <li><strong>Investigación y Análisis: </strong>Profundizamos en problemáticas sociales y medioambientales, abordándolas desde perspectivas locales y globales.</li>
            <li><strong>Visibilización de Historias: </strong>Damos voz a las comunidades y personas que tradicionalmente han sido excluidas de los medios, destacando sus soluciones y esfuerzos por el cambio.</li>
            <li><strong>Producción Multiformato: </strong>Creemos en el poder de la diversidad de formatos para llegar a más personas:</li>

            <section className={styles.generalContainer}>
                <ol>
                    <li><strong> ➤ Artículos y reportajes </strong>para quienes prefieren leer.</li>
                    <li><strong>➤ Podcasts </strong>para conectar de manera auditiva con nuestra audiencia, llevando discusiones profundas y accesibles a cualquier lugar.</li>
                    <li><strong>➤ Videos e infografías </strong> que resumen y visualizan información de manera impactante.</li>
                    <li><strong>➤ Documentales </strong>que exploran a fondo temas críticos, con un enfoque audiovisual más detallado.</li>
                </ol>
            </section>

            <li><strong>Diversidad Temática: </strong>Abordamos una amplia gama de temas, desde la sustentabilidad hasta problemáticas sociales como desigualdad, participación ciudadana y justicia climática.</li>
            <li><strong>Educación Periodística: </strong> Ofrecemos talleres y guías para que más personas puedan aprender a investigar y comunicar sobre temas de sostenibilidad y justicia social.</li>
          </ul>

          <h3>¿Por qué lo hacemos?</h3>
          <p>
          Creemos que el periodismo no solo informa, sino que también inspira y moviliza. En Ecotivista, 
          el periodismo es una herramienta para amplificar voces, cuestionar el status quo y generar conciencia 
          sobre los desafíos y las soluciones que nos afectan a todos y todas.
          </p>
        
          <h2>¡Forma parte de Periodismo en Ecotivista!</h2>
          <p>¿Tienes un tema que te apasiona? ¿Te gustaría compartir tus ideas en un podcast, escribir un artículo, 
            o incluso colaborar en un documental? En Ecotivista estamos buscando personas comprometidas que 
            quieran formar parte de este movimiento.</p>

            <p>Por el momento, como este proyecto está iniciando, las cuentas de usuario en nuestra plataforma son otorgadas 
                y activadas directamente por nuestro equipo administrativo. Si estás interesado en unirte formalmente o 
                en obtener una cuenta, contáctanos por correo o a través de nuestras redes sociales. 
                ¡Estaremos encantados de conocerte y trabajar juntos para crear un cambio positivo!</p>

        </article>
      </section>
    </>
  );
}
