// components/common/Header.js
import Link from 'next/link';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: white;
`;

const Banner = styled.div`
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;

`

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const Nav = styled.nav`
  a {
    margin-left: 1rem;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Header = () => {
  return (<>
    <HeaderContainer>
      <Nav>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/articles">Articles</Link>
        <Link href="/videos">Videos</Link>
        <Link href="/education">Education</Link>
      </Nav>
      <Nav>
        <Link href="/">Sign In</Link>
      </Nav>
    </HeaderContainer>
    <Banner>
        <Logo>ECOTIVISTA</Logo>
        <p>The House of Independent Journalism, Activism and Education.</p>
    </Banner>
    </>
  );
};

export default Header;
