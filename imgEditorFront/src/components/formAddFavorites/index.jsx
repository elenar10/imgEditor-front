import * as React from "react";
import "./style.css";
import Popover from "@mui/material/Popover";
import { Button, Input } from "@mui/material";
import TextField from "@mui/material/TextField";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
// import { useEffect } from "react";

function BasicPopover() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [errorMessage, updateErrorMessage] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const valueInputImg = e.currentTarget.imagen.value;
    const url = new URL(valueInputImg);
    const imgFileName = url.pathname.lastIndexOf("/");
    const img = e.currentTarget.imagen.value.slice(imgFileName);
    const formData = new FormData(e.currentTarget);
    formData.append("img", img);
    const options = {
      method: "POST",
      body: formData,
    };

    fetch("http://localhost:4030/favorites", options).then((r) => {
      r.status === 201 ? setError(false) : setError(true);
      const response = r.json();
      console.log(response);
      // response.acknowledged === true ? updateErrorMessage('No se ha completado la carga de datos, revisa el tamaño de la imagen y que los datos introducidos sean correctos'): updateErrorMessage('La imagen se ha cargado correctamente')
    });
    // .then(d => {
    //   console.log(d)
    //   d !== 200 ? updateErrorMessage('No se ha completado la carga de datos, revisa el tamaño de la imagen y que los datos introducidos sean correctos'): updateErrorMessage('La imagen se ha cargado correctamente')
    // });
    handleClose();
    window.location.reload();

    //   useEffect(() => {
    // //   errorMessage === true ? updateErrorMessage('No se ha completado la carga de datos, revisa el tamaño de la imagen y que los datos introducidos sean correctos'): updateErrorMessage('La imagen se ha cargado correctamente')

    // }, []);
  };
  // useEffect(() => {
  //   errorMessage === true ? updateErrorMessage('No se ha completado la carga de datos, revisa el tamaño de la imagen y que los datos introducidos sean correctos'): updateErrorMessage('La imagen se ha cargado correctamente')

  // }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <React.Fragment>
      <IconButton
        size="large"
        aria-label="add new images"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleClick}
        color="inherit"
        aria-describedby={id}
      >
        <AddPhotoAlternateIcon />
      </IconButton>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        sx={{
          ".MuiPopover-paper": {
            minWidth: "250px",
            height: "auto",
            display: "flex",
            flexWrap: "wrap",
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          },
        }}
      >
        <form
          id="create-course-form"
          onSubmit={handleSubmit}
          className="form__favorites"
        >
          <TextField
            required
            id="name"
            name="name"
            label="Required"
            defaultValue="Nombre de la imagen"
          />
          <TextField
            required
            id="email"
            name="email"
            label="Required"
            defaultValue="Email"
          />
          <Input
            type="file"
            id="imagen"
            name="imagen"
            accept="image/*"
            required
            margin="dense"
          />
          {/* <Typography color='red'>{errorMessage}</Typography> */}
          <Button
            // disabled={inputValue === '' ? true : false}
            variant="contained"
            type="submit"
            color="error"
          >
            Añadir
          </Button>
        </form>
      </Popover>
    </React.Fragment>
  );
}
export default BasicPopover;
