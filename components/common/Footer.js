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
          <Link href="/">About Us</Link>
          <Link href="/">Journalism</Link>
          <Link href="/">Activism</Link>
          <Link href="/">Education</Link>
        </SqInfo>

        <SqInfo>
          <p>Contact Us</p>
          <Link href="/">Send Us an Email</Link>
        </SqInfo>

        <SqInfo>
          <p>Community</p>
          <Link href="/">Discord</Link>
        </SqInfo>

        <SqInfo>
          <p>Terms of Use</p>
          <Link href="/">Terms Of Service</Link>
          <Link href="/">Privacy Policy</Link>
          <Link href="/">Cookie Settings</Link>
        </SqInfo>

        <SqInfo>
          <p>Social Media</p>
          <SocialMedia/>
        </SqInfo>

      </FooterInfo>
      <FooterText>ecotivista.com &copy; {new Date().getFullYear()} Ecotivista. All rights reserved.</FooterText>
    </FooterContainer>
  );
};

export default Footer;
