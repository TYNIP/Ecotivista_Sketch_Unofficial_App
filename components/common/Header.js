import Link from 'next/link';
import styled from 'styled-components';
import { useState } from "react";
import { useRouter } from 'next/navigation'

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

a {
    text-decoration: none;
    font-weight: bold;
    color: black;
    padding: 10px 50px 10px 20px;
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

/* SECUNDARY COMPONENTS */
const IconItems = ({change}) =>{
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none" style={{'margin': '0 5px'}} className='hover show' onClick={()=>change()}>
      <path d="M6 4C6 5.10457 5.10457 6 4 6C2.89543 6 2 5.10457 2 4C2 2.89543 2.89543 2 4 2C5.10457 2 6 2.89543 6 4Z" stroke="currentColor" stroke-width="1.5" />
      <path d="M22 4C22 5.10457 21.1046 6 20 6C18.8954 6 18 5.10457 18 4C18 2.89543 18.8954 2 20 2C21.1046 2 22 2.89543 22 4Z" stroke="currentColor" stroke-width="1.5" />
      <path d="M22 20C22 21.1046 21.1046 22 20 22C18.8954 22 18 21.1046 18 20C18 18.8954 18.8954 18 20 18C21.1046 18 22 18.8954 22 20Z" stroke="currentColor" stroke-width="1.5" />
      <path d="M6 20C6 21.1046 5.10457 22 4 22C2.89543 22 2 21.1046 2 20C2 18.8954 2.89543 18 4 18C5.10457 18 6 18.8954 6 20Z" stroke="currentColor" stroke-width="1.5" />
      <path d="M16.5 9C16.5 8.53406 16.5 8.30109 16.4239 8.11732C16.3224 7.87229 16.1277 7.67761 15.8827 7.57612C15.6989 7.5 15.4659 7.5 15 7.5H9C8.53406 7.5 8.30109 7.5 8.11732 7.57612C7.87229 7.67761 7.67761 7.87229 7.57612 8.11732C7.5 8.30109 7.5 8.53406 7.5 9C7.5 9.46594 7.5 9.69891 7.57612 9.88268C7.67761 10.1277 7.87229 10.3224 8.11732 10.4239C8.30109 10.5 8.53406 10.5 9 10.5H15C15.4659 10.5 15.6989 10.5 15.8827 10.4239C16.1277 10.3224 16.3224 10.1277 16.4239 9.88268C16.5 9.69891 16.5 9.46594 16.5 9Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M16.5 15C16.5 14.5341 16.5 14.3011 16.4239 14.1173C16.3224 13.8723 16.1277 13.6776 15.8827 13.5761C15.6989 13.5 15.4659 13.5 15 13.5H9C8.53406 13.5 8.30109 13.5 8.11732 13.5761C7.87229 13.6776 7.67761 13.8723 7.57612 14.1173C7.5 14.3011 7.5 14.5341 7.5 15C7.5 15.4659 7.5 15.6989 7.57612 15.8827C7.67761 16.1277 7.87229 16.3224 8.11732 16.4239C8.30109 16.5 8.53406 16.5 9 16.5H15C15.4659 16.5 15.6989 16.5 15.8827 16.4239C16.1277 16.3224 16.3224 16.1277 16.4239 15.8827C16.5 15.6989 16.5 15.4659 16.5 15Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  )
}
const IconNotifications = () =>{
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none" style={{'margin': '0 5px'}} className='hover'>
      <path d="M2.52992 14.394C2.31727 15.7471 3.268 16.6862 4.43205 17.1542C8.89481 18.9486 15.1052 18.9486 19.5679 17.1542C20.732 16.6862 21.6827 15.7471 21.4701 14.394C21.3394 13.5625 20.6932 12.8701 20.2144 12.194C19.5873 11.2975 19.525 10.3197 19.5249 9.27941C19.5249 5.2591 16.1559 2 12 2C7.84413 2 4.47513 5.2591 4.47513 9.27941C4.47503 10.3197 4.41272 11.2975 3.78561 12.194C3.30684 12.8701 2.66061 13.5625 2.52992 14.394Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M9 21C9.79613 21.6219 10.8475 22 12 22C13.1525 22 14.2039 21.6219 15 21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  )
}

const IconSearch = ({router}) =>{
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none" style={{'margin': '0 5px'}} className='hover' onClick={() => router.push('/search')}>
      <path d="M14 14L16.5 16.5" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
      <path d="M16.4333 18.5252C15.8556 17.9475 15.8556 17.0109 16.4333 16.4333C17.0109 15.8556 17.9475 15.8556 18.5252 16.4333L21.5667 19.4748C22.1444 20.0525 22.1444 20.9891 21.5667 21.5667C20.9891 22.1444 20.0525 22.1444 19.4748 21.5667L16.4333 18.5252Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
      <path d="M16 9C16 5.13401 12.866 2 9 2C5.13401 2 2 5.13401 2 9C2 12.866 5.13401 16 9 16C12.866 16 16 12.866 16 9Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
    </svg>
  )
}

const OptionNav = ({setOptions})=>{
  return(
    <>
      <OptionsBanner className='show'>
        <Link href="/" onClick={()=>setOptions(false)} className='show' >Home </Link>
        <Link href="/about" onClick={()=>setOptions(false)}className='show' >About</Link>
        <Link href="/articles" onClick={()=>setOptions(false)}className='show' >Articles</Link>
        <Link href="/education" onClick={()=>setOptions(false)} className='show' >Education</Link>
        <Link href="/forums" onClick={()=>setOptions(false)} className='show' >Forums</Link>
        <Link href="/events" onClick={()=>setOptions(false)}className='show' >Events</Link>
      </OptionsBanner>
      <Courtain onClick={()=>setOptions(false)} className='show'/>
    </>
  )
}


const Header = () => {
  const router = useRouter()
  const [options, setOptions] = useState(false);
  function change(){
    setOptions(!options)
  }
  return (<>
    <HeaderContainer>
      <Nav>
        <Icons>
          <IconItems change={change}/>
          <IconNotifications/>
          <IconSearch router={router}/>
        </Icons>
          <div className='hide' onClick={()=>setOptions(false)}>
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/articles">Articles</Link>
            <Link href="/education">Education</Link>
            <Link href="/forums">Forums</Link>
            <Link href="/events">Events</Link>
          </div>
      </Nav>
      <Nav>
        <Link href="/login">Log In</Link>
      </Nav>
    </HeaderContainer>
    {options && (<OptionNav setOptions={setOptions}/>)}
    <Banner>
        <Logo id='mainName'><Link href="/">ECOTIVISTA</Link></Logo>
        <PhraseMain><Link href="/">The House of Independent Journalism, Activism and Education.</Link></PhraseMain>
    </Banner>
    </>
  );
};

export default Header;
