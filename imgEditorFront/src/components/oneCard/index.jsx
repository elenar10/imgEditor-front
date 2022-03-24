import * as React from 'react';
import './style.css';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Stack } from '@mui/material';
import { useHistory } from "react-router";
// import { useState } from 'react';


export default function OneCard(props) {
  const history = useHistory();

const id = props.id
const handleClickEdit = () =>{
  history.push(`/edit/${props.id}`)
 
}
const handleDelete = () => {
    const options = {
        method: "DELETE",
        headers: {
          "Content-type": "application/json", 
         
        },
        body: JSON.stringify({id})
      };
      console.log('options', options)
      fetch('http://localhost:4030/favorites', options)
      .then(r=>r.json())
      .then(d=> {
        
        console.log('d', d)})
      };
      
     
  

  return (
    <Card
      className="cardFavorite"
      sx={{
        maxWidth: "250px",
        maxHeight: "750px",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CardMedia
        component="img"
        image={`http://localhost:4030/public/${props.imagen}`}
        className="image_card"
        alt={props.titulo}
        // onClick={handleFocus}
      />

      <CardContent
        sx={{
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: "0px",
        }}
      >
        <Typography variant="h6" color="secondaryText" noWrap>
          {props.titulo}
        </Typography>
        <Typography variant="p" color="text.secondary">
          Usuario:
          {props.email}
        </Typography>
      </CardContent>
      <Stack direction="raw" justifyContent="flex-end">
        <IconButton aria-label="edit" onClick={handleClickEdit}>
          <EditIcon />
        </IconButton>
        <IconButton aria-label="delete" onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      </Stack>
    </Card>
  );
}
