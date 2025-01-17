import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const MasonryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); /* Adjust to your needs */
  gap: 1rem;
  padding: 2rem;
  justify-items: center;
  position: relative;
`;

const MasonryItem = styled.div`
  width: 100%;
  transition: all 0.3s ease-in-out;
`;

export default function MasonryLayout({ children }) {
  const containerRef = useRef(null);
  const [gridTemplateColumns, setGridTemplateColumns] = useState('');

  useEffect(() => {
    if (!containerRef.current) return;


    const updateGrid = () => {
      const containerWidth = containerRef.current.offsetWidth;
      const columnCount = Math.floor(containerWidth / 300); // 300px minimum column width
      setGridTemplateColumns(`repeat(${columnCount}, 1fr)`);
    };

    updateGrid(); 

    window.addEventListener('resize', updateGrid); //window size resize event

    return () => {
      window.removeEventListener('resize', updateGrid);
    };
  }, []);

  return (
    <MasonryContainer ref={containerRef} style={{ gridTemplateColumns }}>
      {children.map((child, index) => (
        <MasonryItem key={index}>{child}</MasonryItem>
      ))}
    </MasonryContainer>
  );
}
