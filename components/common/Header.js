import Link from 'next/link';
import styled from 'styled-components';
import { useState } from "react";
import { useRouter } from 'next/navigation'
import { useAuth } from '../../pages/api/context/AuthContext';
import {IconItems, IconNotifications, IconSearch, IconUser} from "../utils/icons";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: white;
  border: 1px solid rgba(0,0,0, 0.1);
  position: sticky;
  z-index: 2000; 
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

const OptionsBanner = styled.div`
position: fixed;
top: 70px;
z-index: 1000;
display: flex;
flex-direction: column;
background-color: white;
border: 0.5px solid rgba(0,0,0,0.1);
max-height: 100vh;
padding: 0;
margin-left: 2%;
border-radius: 10px 10px 0 0;

a {
    text-decoration: none;
    font-weight: bold;
    color: black;
    padding: 10px 50px 10px 20px;
    border-bottom: 1px solid rgba(0,0,0,0.1);
    &:hover {
      background-color: #E9E9E9;
      transition:200ms;
    }
`;

const OptionsBannerRight = styled.div`
position: fixed;
top: 70px;
right: 0;
z-index: 1000;
display: flex;
flex-direction: column;
background-color: white;
border: 0.5px solid rgba(0,0,0,0.1);
max-height: 100vh;
padding: 0;
margin-right: 2%;
border-radius: 10px 10px 0 0;

a {
    text-decoration: none;
    font-weight: bold;
    color: black;
    padding: 10px 50px 10px 20px;
    border-bottom: 1px solid rgba(0,0,0,0.1);
    &:hover {
      background-color: #E9E9E9;
      transition:200ms;
    }
`;

const Courtain = styled.div`
  position: absolute;
  z-index: 999;
  background-color:rgba(0,0,0, 0.1);
  width: 100%;
  height: 100vh;
`;


const OptionNav = ({setOptions})=>{
  return(
    <>
      <OptionsBanner className='show'>
        <Link href="/" onClick={()=>setOptions(false)} className='show' >Inicio</Link>
        <Link href="/about" onClick={()=>setOptions(false)}className='show' >Ecotivista</Link>
        <Link href="/articles" onClick={()=>setOptions(false)}className='show' >Articulos</Link>
        <Link href="/education" onClick={()=>setOptions(false)} className='show' >Educación</Link>
        <Link href="/forums" onClick={()=>setOptions(false)} className='show' >Foros</Link>
        <Link href="/events" onClick={()=>setOptions(false)}className='show' >Eventos</Link>
      </OptionsBanner>
      <Courtain onClick={()=>setOptions(false)} className='show'/>
    </>
  )
}

const OptionNavUser = ({setOptions})=>{
  return(
    <>
      <OptionsBannerRight>
        <Link href="/info/profile" onClick={()=>setOptions(false)}>Profile </Link>
        <Link href="" onClick={()=>setOptions(false)}>Log Out</Link>
      </OptionsBannerRight>
      <Courtain onClick={()=>setOptions(false)} />
    </>
  )
}


const Header = () => {
  const router = useRouter()
  const [options, setOptions] = useState(false);
  const [optionsUser, setOptionsUser] = useState(false);
  const { isAuthenticated, loading } = useAuth();

  console.log("from header", isAuthenticated, loading)

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
