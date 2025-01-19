import Link from 'next/link';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const SubHeader = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(0,0,0, 0.1);
  position: sticky;
  z-index: 20000;
  top: 55px;
  background-color: white;
  padding: 0 20px 0 20px;
`;

const SubNav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto;
  scrollbar-width: thin; 
  scrollbar-color: white white;
  scrollbar-style: none;

  a {
    text-decoration: none;
    color: black;
    padding: 5px 20px;
    margin: 0 5px;
    white-space: nowrap;

    &:hover {
      background-color: #E9E9E9;
      transition: 200ms;
    }
  }
`;

function getOptions(path) {
  path = path.split('/');
  switch (path[1]) {
    case "about":
      return [
        { path: 'Manifesto', link: '/about' },
        { path: 'Equipo', link: '/about/team' },
        { path: 'Periodismo', link: '/about/journalism' },
        { path: 'Activismo', link: '/about/activism' },
        { path: 'Educación', link: '/about/education' },
        { path: 'Contactanos', link: '/about/contact' },
      ];
    default:
      return [
        { path: 'Recientes', link: '/articles?sort=recents' },
        { path: 'Descubre', link: '/articles?sort=discover' },
        { path: 'Sugeridos', link: '/articles/suggestions' },
        { path: 'Ecotivista', link: '/users/ECOTIVISTA' },
      ];
  }
}

const Header = () => {
  const [options, setOptions] = useState([]);
  const pathname = usePathname();

  useEffect(() => {
    setOptions(getOptions(pathname));
  }, [pathname]);


  return (
    <SubHeader>
      <SubNav>
        {options.map((option, key) => (
            
            <Link href={`${option.link}`} key={key}>
              {option.path}
            </Link>
          
        ))}
      </SubNav>
    </SubHeader>
  );
};

export default Header;
