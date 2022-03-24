import React from "react";
import {
  Stack,
  Avatar,
  Box,
  TextField,
  FormControl,
  Input,
  InputLabel,
  Button,
  InputAdornment,
  IconButton,
  FormHelperText,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import  VisibilityOff  from "@mui/icons-material/VisibilityOff";
import  Visibility from "@mui/icons-material/Visibility";
import  LockRoundedIcon  from "@mui/icons-material/LockRounded";


const useStyles = makeStyles((theme) => ({
  // root: {
  //   backgroundImage: `url(${fondo})`,
  //   backgroundRepeat: 'no-repeat',
  //   backgroundSize: 'cover',
  //   backgroundPosition:'center',
  //   height: '40vh'
  // },
  container: {
    height: "50%",
    opacity: "0.8",
  },
  form:{
    display: "flex",
    flexWrap:'wrap', flexDirection:'column', gap: '20px', alignContent:'center',
    justifyContent:"center"
  }
}));

//     <input id="email" type="email" placeholder="Email"></input>
//     <label htmlFor="password" title="revisa que contenga @ y un dominio válido">Contraseña</label>
//     <input id="password" type="password" placeholder="Contraseña" required></input>
//     <input type="submit" value="Enviar"></input>


function SignFom() {


  const classes = useStyles();

  const [values, setValues] = React.useState({
    email: "",
    password: "",
    repeatPassword: "",
    showPassword: false,
  });

  
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("enviando formulario", e.target.value);
    if (e.target.checkValidity()) {

      // compruebo que todos los campos del formulario son validos
      if (e.target.password.value === e.target.repeatPassword.value) {
        // solo ejecuto el registro si las passwords son iguales
        // genero el objeto options para llamar al login
        const options = {
          method: "POST",
          headers: {
            "Content-type": "application/json", // aviso a mi servidor que le envio los datos en formato JSON
          },
          body: JSON.stringify({
            // Genero el body como string
            email: e.target.email.value, // obtengo el value de un input por su name
            password: e.target.password.value,
          }),
        };
    
        // llamo al registro
        fetch("http://localhost:4030/auth/register", options)
          .then((r) => r.json())
          .then((d) => console.log(d)); 
      } else {
     
        // Muestro al usuario el error de que las passwords no coinciden
      }
    } else {  
    // mostrar error al usuario con el campo que no es válido
    }
  };

    



  return (
    <Box
      component="section"
      className={classes.container}
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
        display: 'flex', flexWrap:'wrap', flexDirection:'column', gap: '20px', alignContent:'center', paddingBottom: '50px', paddingTop: '50px'
      }}
      // noValidate
      // autoComplete="off"
    >
      <Stack sx={{alignItems:"center", gap:'20px'}}>
        <Avatar>
          <LockRoundedIcon />
        </Avatar>
        <Typography component="h5">Registro</Typography>
      </Stack>

      <form className={classes.form} onSubmit={handleSubmit} id="formulario">
        <TextField
          required="true"
          id="email"
          name="email"
          type="email"
          label="Introduce tu email"
          autoFocus
          variant="standard"
          fullWidth
        />

        <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">Contraseña
          </InputLabel>
          <Input
            id="standard-adornment-password"
            type={values.showPassword ? "text" : "password"}
            value={values.password}
            name="password"
            variant="standard"
            autoFocus
            required
            aria-describedby="my-helper-text-password"
            fullWidth
            onChange={handleChange("password")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
            
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          <FormHelperText id="my-helper-text-password"> 
            Mínimo 6 caracteres
          </FormHelperText>
        </FormControl>
        <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
          <TextField
            id="standard-Repeat-password-input"
            name="repeatPassword"
            label="Repite tu contraseña"
            type={values.showPassword ? "text" : "password"}
            variant="standard"
            autoFocus
            // onChange={}
            fullWidth
            
          />
          
        </FormControl>
        <Button variant="outlined" type="submit" form="formulario">
          Enviar
        </Button>
      </form>
    </Box>
   
  );
}
export default SignFom;
