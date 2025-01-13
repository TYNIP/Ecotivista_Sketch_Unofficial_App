import Link from 'next/link';
import styled from 'styled-components';
import {useAuthFetch} from '../../pages/api/hooks/useAuthFetch';
import {useAuth} from "@/pages/api/context/AuthContext";

const OptionsBannerRight = styled.div`
position: fixed;
top: 70px;
right: 0;
z-index: 40000;
display: flex;
flex-direction: column;
background-color: white;
border: 0.5px solid rgba(0,0,0,0.1);
max-height: 100vh;
padding: 0;
margin-right: 2%;
border-radius: 10px 10px 0 0;

a, button {
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
  position: fixed;
  z-index: 30000;
  background-color:rgba(0,0,0, 0.1);
  width: 100%;
  height: 100vh;
`;

const CloseBtn = styled.button`
margin: 0;
`

const OptionNavUser = ({setOptions})=>{
  const {authfetch} = useAuthFetch();
  const { setIsAuthenticated, setUsername, setEmail, setId } = useAuth();

  const logout = async () => {
    try {
      const res = await authfetch({
        endpoint: 'logout',
        redirectRoute: '/',
        formData: 'Closing Session',
      });

      console.log("Session closed successfully:", res);
  
      if (res) {
        console.log("Session closed successfully:", res);
        setIsAuthenticated(false); 
        setUsername('');
        setEmail('');
        setId('');
        setOptions(false);
      }
    } catch (err) {
      console.error("Error closing session:", err);
    }
  };
  
    
    return(
      <>
        <OptionsBannerRight>
          <Link href="/info/profile" onClick={()=>setOptions(false)}>Perfil </Link>
          <Link href="/info/articles" onClick={()=>setOptions(false)}>Mis Articulos </Link>
          <Link href="/info/articles/publisher" onClick={()=>setOptions(false)}>Publicista </Link>
          <CloseBtn onClick={()=>logout()}>Cerrar Sesión</CloseBtn>
        </OptionsBannerRight>
        <Courtain onClick={()=>setOptions(false)} />
      </>
    )
  }

export default OptionNavUser;