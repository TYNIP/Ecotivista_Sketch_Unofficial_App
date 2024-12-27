import Link from 'next/link';
import styled from 'styled-components';
import { useState } from "react";
import { useRouter } from 'next/navigation';
import OptionNav from './OptionNav';
import OptionNavUser from './OptionNavUser';
import {IconItems, IconNotifications, IconSearch, IconUser} from "../utils/icons";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: white;
  border: 1px solid rgba(0,0,0, 0.1);
  position: sticky;
  z-index: 20000; 
  top: 0;
  height: 70px;
`;

const Banner = styled.div`
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
width: 100%;
padding: 1% 2%;

`

const Logo = styled.div`
  font-size: 6vh !important;
  font-weight: bold;
  padding: 0 2%
`;

const Nav = styled.nav`
display: flex;
justify-content: center;
align-items: center;
  a {
    text-decoration: none;
    font-weight: bold;
    color: black;
    padding: 5px 20px;
    margin: 0 5px;

    &:hover {
      background-color: #E9E9E9;
      border-radius: 20px;
      transition:200ms;
    }
  }
`;

const Icons = styled.div`
display: flex;
justify-content: center;
align-items: center;
`

const PhraseMain = styled.p`
font-style: italic;
width: 100%;
text-align: center;
`

const Header = ({isAuthenticated}) => {
  const router = useRouter()
  const [options, setOptions] = useState(false);
  const [optionsUser, setOptionsUser] = useState(false);

  function changeNavDisplay(){
    setOptions(!options)
    setOptionsUser(false)
  }
  function changeNavUserDisplay(){
    setOptionsUser(!optionsUser)
    setOptions(false)
  }

  return (<>
    <HeaderContainer>
      <Nav>
        <Icons>
          <IconItems change={changeNavDisplay}/>
          <IconNotifications/>
          <IconSearch router={router}/>
        </Icons>
          <div className='hide' onClick={()=>setOptions(false)}>
            <Link href="/">Inicio</Link>
            <Link href="/about">Ecotivista</Link>
            <Link href="/articles">Articulos</Link>
            <Link href="/education">Educación</Link>
            <Link href="/forums">Foros</Link>
            <Link href="/events">Eventos</Link>
          </div>
      </Nav>

      <Nav>
        {!isAuthenticated && <Link href="/login">Log In</Link>}
        {isAuthenticated && (
          <Icons>
            <IconUser change={changeNavUserDisplay}/>
          </Icons>
        )}
      </Nav>

    </HeaderContainer>
    {options && (<OptionNav setOptions={setOptions}/>)}
    {optionsUser && (<OptionNavUser setOptions={setOptionsUser}/>)}
    <Banner>
        <Logo id='mainName'><Link href="/">ECOTIVISTA</Link></Logo>
        <PhraseMain><Link href="/">La Casa del Periodismo y Activismo Independiente</Link></PhraseMain>
    </Banner>
    </>
  );
};

export default Header;
