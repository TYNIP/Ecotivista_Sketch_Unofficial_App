// components/common/Footer.js
import styled from 'styled-components';

const FooterContainer = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #333;
  color: white;
  position: absolute;
  bottom: 0;
  width: 100%;
`;

const FooterText = styled.p`
  margin: 0;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterText>&copy; {new Date().getFullYear()} EcoPlatform. All rights reserved.</FooterText>
    </FooterContainer>
  );
};

export default Footer;
