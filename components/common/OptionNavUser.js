import Link from 'next/link';
import styled from 'styled-components';
import {useAuthFetch} from '../../pages/api/hooks/useAuthFetch';

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

const OptionNavUser = ({setOptions})=>{
    const authfetch = useAuthFetch();
  
    const logout = async ()=>{
      try{
      const res = await authfetch({
        endpoint: 'logout',
        redirectRoute: '/',
        formData: 'Closing Session',
      });

      console.log(res);

      if(res){
        setTimeout(()=>window.location.reload(), 2000);
      }

      setOptions(false)
      } catch(err){

      }
      
    }
    
    return(
      <>
        <OptionsBannerRight>
          <Link href="/info/profile" onClick={()=>setOptions(false)}>Perfil </Link>
          <Link href="/info/articles" onClick={()=>setOptions(false)}>Mis Articulos </Link>
          <Link href="/info/articles/publisher" onClick={()=>setOptions(false)}>Publicista </Link>
          <Link href="/" onClick={()=>logout()}>Cerrar Sesión</Link>
        </OptionsBannerRight>
        <Courtain onClick={()=>setOptions(false)} />
      </>
    )
  }

export default OptionNavUser;