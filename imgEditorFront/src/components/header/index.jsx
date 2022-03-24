import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import './style.css';
import Logo from './assets/favoredit.png';
import BasicPopover from '../formAddFavorites';
import { useHistory } from "react-router";

function Header() {
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);


  const handleMenu = (event) => {
    console.log("handleMenu", event.currentTarget);
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogin = () => {
    history.push('/login')
    
  };
  const handleSignIn = () => {
    history.push('/signForm')
   
  };
  const handleGoHome =() => {
    history.push('/')
  }
  return (
    <Box sx={{flexDirection: "row",
      flexWrap: "nowrap",
      alignContent: "center",
      justifyContent: "space-around",
      alignItems: "center"}}>
      
      <AppBar position="static" color="transparent" sx={{ boxShadow: "none"}} >
        <Toolbar sx={{justifyContent:"space-between", alignItems:"center"}}>
        <img
          className="logo"
          src={Logo}
          alt="logo"
          onClick={handleGoHome}
        />
         
         <Box >
              
     
          <BasicPopover /> 
        
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleSignIn}>Registro</MenuItem>
                <MenuItem onClick={handleLogin}>Login</MenuItem>
              </Menu>
              </Box>
        </Toolbar>
      </AppBar>
    </Box>
        
      
        
 
        
  );
}
export default Header;