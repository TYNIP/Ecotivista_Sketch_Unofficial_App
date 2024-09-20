import Link from 'next/link';
import styled from 'styled-components';
import SocialMedia from '../ui/SocialMedia';

const FooterContainer = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 1rem 2rem;
  background-color: white;
  color: black;
  width: 100%;
`;

const FooterInfo = styled.div`
border-top: 0.4px solid rgba(0,0,0,0.2);
border-bottom: 0.4px solid rgba(0,0,0,0.2);
display: flex;
flex-wrap: wrap;
justify-content: center;
width: 100%;
`

const SqInfo = styled.div`
display: flex;
flex-direction: column;
padding: 2%;
margin: 0 0.5%;
p {
font-size: 1rem;
font-weight: bold;
}
a{
font-size: 0.8rem;
}
a:hover{
color: #25C660;
}
`

const FooterText = styled.p`
  margin: 0;
  padding-top: 1%
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterInfo>
        <SqInfo>
          <p>Ecotivista</p>
          <Link href="/about">Sobre Ecotivista</Link>
          <Link href="/">Periodismo</Link>
          <Link href="/">Activismo</Link>
          <Link href="/">Educación</Link>
        </SqInfo>

        <SqInfo>
          <p>Contactanos</p>
          <Link href="/">Mandanos un Email</Link>
        </SqInfo>

        <SqInfo>
          <p>Comunidad</p>
          <Link href="/">Discord</Link>
        </SqInfo>

        <SqInfo>
          <p>Terminos de Uso</p>
          <Link href="/">Terminos del Servicio</Link>
          <Link href="/">Politica de Privacidad</Link>
          <Link href="/">Configuración de Cookies</Link>
        </SqInfo>

        <SqInfo>
          <p>Redes Sociales</p>
          <SocialMedia/>
        </SqInfo>

      </FooterInfo>
      <FooterText>ecotivista.com &copy; {new Date().getFullYear()} Ecotivista. All rights reserved.</FooterText>
    </FooterContainer>
  );
};

export default Footer;
