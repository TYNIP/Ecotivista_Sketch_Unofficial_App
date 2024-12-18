/* ABOUT */
import Meta from '../../components/seo/Meta';
const { PATHURL } = require('../api/config');
import styles from './index.module.scss';
const Logo = require("../../public/assets/ecotivistalogo.jpg");
import Image from "next/image";

export default function AboutPage() {
  return (
    <>
      <Meta
        title="Ecotivista | About"
        description="The House of Independent Journalism, Activism and Education."
        canonical={`${PATHURL}/about`}
      />
      
      <section className={styles.aboutContainer}>
        <div className={styles.head}>
          <Image src={Logo} alt="Ecotivista Logo" />
        </div>
        
        <article className={styles.manifesto}>
          <h2>Manifesto</h2>
          <h3>Introduction</h3>
          <p>
            We live in an era where citizen participation is no longer an option, but an urgent necessity. Ecotivista is born out of the deep conviction that collective action and citizen empowerment are key to facing the challenges of our time. We are a platform that integrates education, activism, and independent journalism, with the goal of creating a strong community that fosters positive change within our societies. At Ecotivista, we believe that knowledge, participation, and collaboration are the fundamental pillars for transforming reality and building a more equitable and sustainable future.
          </p>
          
          <h3>Vision</h3>
          <p>
            Our vision is to build a society where all people, regardless of their context, can actively participate in the creation and/or development of ideas and projects that have a social impact. We aspire to a culture of shared responsibility, where access to information, resources, and the necessary tools are not a privilege but a right. We want a future where all cultural barriers between societies or entities are eliminated, allowing for free expression. A space where researchers, academics, students, and the general public can freely express themselves, publish articles, research, or opinions.
          </p>
          
          <h3>Mission</h3>
          <p>
            Ecotivista's mission is to provide an inclusive and accessible platform that fosters the creation, promotion, and support of projects that benefit our societies. We do this by providing educational tools, promoting a committed community, and amplifying voices that seek solutions to the most pressing problems of our time. We strive to unite education, journalism, and independent activism to foster a network for climate and social action capable of generating tangible impacts.
          </p>
          
          <h3>Foundations</h3>
          <ul>
            <li><strong>Community Action:</strong> We believe in the power of community as a driver of change.</li>
            <li><strong>Diversity of Perspectives:</strong> We commit to including a variety of voices, especially those traditionally marginalized in sustainability discussions.</li>
            <li><strong>Independent Journalism:</strong> We promote journalism that highlights environmental and social issues from a critical and committed perspective.</li>
            <li><strong>Empowerment through Education:</strong> Our platform is dedicated to providing accessible educational resources to facilitate learning about sustainability, activism, and how to generate impact.</li>
            <li><strong>Innovation for Sustainability:</strong> Ecotivista encourages innovation in all forms to address current and future challenges.</li>
          </ul>
          
          <h3>Why We Do What We Do</h3>
          <p>
            Ecotivista is more than just a platform; it’s a movement. We want to create a space where everyone can feel safe, supported, and empowered to act. We understand the challenges we face are great, but we believe that collective action, innovation, and collaboration can lead us toward a fairer and more sustainable future.
          </p>
          <p>We are committed to tirelessly working to build societies where integral well-being is not just a distant goal, but a daily reality that we all help build. If you have a dream of change, you are already part of Ecotivista!</p>
        </article>
      </section>
    </>
  );
}
