import Link from 'next/link';
import styled from 'styled-components';

const OptionsBanner = styled.div`
position: fixed;
top: 70px;
z-index: 40000;
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

const Courtain = styled.div`
  position: absolute;
  z-index: 30000;
  background-color:rgba(0,0,0, 0.1);
  width: 100%;
  height: 100% !important;
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

export default OptionNav;