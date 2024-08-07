import { useState } from "react";
import styled from 'styled-components';

const Warn = styled.div`
width: 100%;
text-align: center;
padding: 1% 3%;
color: white;
display: flex;
justify-content: center;
align-items: center;

button{
margin: 0 2%;
border: 1px solid white;
padding:0 0.3%;
}

button:hover{
border-radius: 20px;
transition:200ms;
}
`;

const Warning = ({ message, bkg }) => {
    const [visible, setVisible] = useState(true);
  
    const handleClose = () => {
      setVisible(false);
    };
  
    if (!visible) return null;
  
    return (
      <Warn className="notification" style={{'background': `${bkg}`}}>
        <span>{message}</span>
        <button className="close-btn" onClick={handleClose}>X</button>
      </Warn>
    );
  };
  
  export default Warning;