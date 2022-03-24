import React from "react";
import {
  Stack,
  Avatar,
  Paper,
  TextField,
  FormControl,
  Input,
  InputLabel,
  Button,
  InputAdornment,
  IconButton,
  FormHelperText,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

import { makeStyles } from "@mui/styles";
import  VisibilityOff  from "@mui/icons-material/VisibilityOff";
import  Visibility from "@mui/icons-material/Visibility";
import { useHistory } from "react-router";

import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({

  container: {
    height: "550px",
    width: "290px",
    padding: 20,
    margin:"45px auto",
    opacity: "0.8",
  },
  form:{
    display: "flex",
    flexWrap:'wrap', flexDirection:'column', gap: '20px', alignContent:'center',
    justifyContent:"center"
  }
}));

//     <form  onSubmit={handleSubmit}>
//     <label htmlFor="email" >Email de registro</label>
//     <input id="email" type="email" placeholder="Email"></input>
//     <label htmlFor="password" title="revisa que contenga @ y un dominio válido">Contraseña</label>
//     <input id="password" type="password" placeholder="Contraseña" required></input>
//     <input type="submit" value="Enviar"></input>
// </form>

function Login() {
  const history = useHistory();


  const [values, setValues] = React.useState({
    email: "",
    password: "",
    showPassword: false,
  });

  // const validate =() => {
  //   let temp ={};
  //   temp.email = (/$|.+@..+/).test(values.email)?"": "Tu email o contraseña no son válidos."
  //   temp.password = values.password?"": "Tu email o tu contraseña no son válidos."
  // }
  // const {error, setError, handleInputChange } = useForm(initialFValues)
  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("enviando formulario", e.target.email.value);
    if (e.target.checkValidity()) { // compruebo que todos los campos del formulario son validos
        const options = {
          method: "POST",
          headers: {
            "Content-type": "application/json", // aviso a mi servidor que le envio los datos en formato JSON
          },
          body: JSON.stringify({ // Genero el body como string
            email: e.target.email.value, // obtengo el value de un input por su name
            password: e.target.password.value,
          }),
        };
    
        // llamo al registro
        fetch("http://localhost:4040/auth/login", options)
          .then((r) => r.json())
          .then((d) => { 
            sessionStorage.setItem('session', d.access_token)
            history.push('/dashboard')
            console.log(d)}); 
          


      } else {
        return <Typography>Las password no coinciden</Typography>
        // Muestro al usuario el error de que las passwords no coinciden
      }
    
  };

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

  return (
    <Paper
      component="section"
      className={classes.container}
      elevation={10}
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "column",
        gap: "20px",
        alignContent: "center",
      }}
      // noValidate
      // autoComplete="off"
    >
      <Stack sx={{ alignItems: "center", paddingTop: "30px", gap:"20px" }}>
        <Avatar></Avatar>
        <Typography component="h5">Login</Typography>
      </Stack>

      <form className={classes.form} onSubmit={handleSubmit} id="formulario">
        <TextField
          required="true"
          id="email"
          name="email"
          type="email"
          label="Introduce tu email"
          autoFocus
          margin="normal"
          variant="standard"
          fullWidth
          // error
          // helperText="errororrrr"
        />

        <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password 2">
            Introduce tu contraseña
          </InputLabel>
          <Input
            id="standard-adornment-password 2"
            type={values.showPassword ? "text" : "password"}
            value={values.password}
            name="password"
            variant="standard"
            autoFocus
            margin="normal"
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
          Entre 6 y 8 caracteres
          </FormHelperText>
        </FormControl>
        {/* <FormControlLabel
          control={<Checkbox name="checkedB" />}
          label={t("signForm.remember")}
        ></FormControlLabel> */}
        <Button variant="outlined" type="submit" form="formulario">
          Enviar
        </Button>
        <Typography>
          <Link href="#">Recuperar contraseña</Link>
        </Typography>
        <Typography>
        ¿Tienes una cuenta?
       
          <Link to="/signForm">
          Regístrate
          </Link>
        </Typography>
      </form>
    </Paper>
  );
}
export default Login;
