import React from 'react';
import Box from '@mui/material/Box';
import OneCard from '../../components/oneCard';
// import BasicSpeedDial from '../../components/speed-dial';
import { useEffect, useState } from "react";


function Home() {
    
    const [cards, setCards] = useState([]);
 
    useEffect(()=>{
        const getCards = async () => {
            const res = await fetch('http://localhost:4030/favorites/all');
            const data = await res.json();
            return setCards(data);
           
        }
        getCards()
    }, []);

  return (
    <Box component='section' >
    <Box sx={{ display: 'flex', flexWrap:'wrap', flexDirection:'row', justifyContent:'center', gap: '20px', alignContent:'center', pb:'4em'}} >
 
    {cards.map((c)=>  <OneCard titulo={c.name} key={c._id} id={c._id} type={c.type} email= {c.email} imagen={c.img}></OneCard>)}

    
</Box>
{/* <BasicSpeedDial  ></BasicSpeedDial> */}
</Box>
  );
}
export default Home;