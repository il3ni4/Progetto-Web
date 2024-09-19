import React, { useState,} from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'
import IconButton  from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import Sidebar from './Sidebar';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { Link, useLocation } from 'react-router-dom';
import { Grid2, MenuItem, Menu } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import axios from 'axios';
import Brightness4Icon from '@mui/icons-material/Brightness4'; 
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme, useMediaQuery } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
const baseURL = process.env.baseURL;

function Navbar ({ setView, toggleDarkMode }) {
  const location = useLocation();
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('');

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  //useMediaQuery: Usa il breakpoint per rilevare se lo schermo è sotto una certa larghezza (in questo caso
  // il breakpoint è sm per schermi piccoli, come i telefoni).

  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget); //imposta lo stato con l'elemento che ha generato l'evento, ovvero ArrowDropDownIcon
  }; //funzione che gestisce apertura menù a tendina per dispositivi mobile 

  const handleMenuClose = () => {
    setAnchorEl(null); //funzione che chiude menù a tendina, impostando lo stato su null
  };

  
  const handleSearchChange = (event) => {
    event.preventDefault();
    setSearchQuery(event.target.value);
  }; //event= evento generato quando cerco qualcosa, setSearchQuery utilizzato per aggiornare searchQuery con il nuovo valore digitato

  const handleSearchSubmit = () => {
    console.log('Stai cercando:', searchQuery);
    setView('searchedRecipes')
  } //chiamata quando l'utente fa click sul pulsante di ricerca, si accede al valore attuale della variabile di stato searchQuery

  const handleLogout = async () => {
    try {
      const logout = await axios.post(`${baseURL}auth/logout`);
      console.log('Logout effettuato');
      alert(logout.data.msg);
      window.location.href = '/';
    } catch (err) {
      console.error('Logout failed:', err);
  }}

  const toggleOpen = () => {
      setOpen(!open)
  };

  
  const mobileMenu = (
    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose= {handleMenuClose}> 
      <MenuItem  onClick ={handleMenuClose} component={Link} to="/home/myRecipes">
      Home
      </MenuItem>
      <MenuItem component={Link} to="explore" onClick={handleMenuClose}>
      Esplora
      </MenuItem>
      <MenuItem onClick={handleLogout}>
      Logout
      </MenuItem>
      </Menu>
  );
  /*anchorEl={anchorEl} open={Boolean(anchorEl)} onClose= {handleMenuClose} colleghiamo il menu all'elemento di ancoraggio, se anchorEl è definito mostra il menu
  e viene passata la funzione per chiudere il menu */

    return (
        <Box sx={{ flexGrow: 1}}>
          <AppBar position='static' >
          {isMobile? (
            <>
            <Box style = {{display: 'flex'}}>
            <Toolbar>
            {location.pathname !== '/' && location.pathname !== '/signup'&& (<IconButton 
              edge ='start' 
              color ='inherit'
              aria-label ='menu'
              sx = {{mr:2}}
              onClick ={toggleOpen}
              >
              <MenuIcon/>
            </IconButton>)}
            {(location.pathname === '/signup' ||  location.pathname === '/') && (<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <FoodBankIcon></FoodBankIcon>
              Recipe App
            </Typography>)}
            {location.pathname !== '/' && location.pathname !== '/signup'&& (
              <Grid2 style = {{display : 'flex'}}>
              <TextField
              type="text"
              variant="standard"
              placeholder="Cerca una ricetta..."
              value={searchQuery} //impostato il valore di input al valore attuale dello stato, se searchQuery cambia, il campo di input cambierà automaticamente
              onChange={handleSearchChange}
              sx={{backgroundColor: '!Background', input: {color: 'white'}}}
              />
            <Button variant ="contained" color="primary" component={Link} to={`/searchRecipe?title=${searchQuery}`} onClick={handleSearchSubmit}><SearchIcon/></Button>
            </Grid2>)}
            </Toolbar>
            {location.pathname !== '/' && location.pathname !== '/signup'&& (<Button color = "inherit" onClick={toggleDarkMode}>
            {localStorage.getItem('darkMode') === 'true' ? <Brightness7Icon /> : <Brightness4Icon />}
            </Button>)}
            {location.pathname !== '/' && location.pathname !== '/signup'&& (<IconButton edge = "end" color = "inherit" onClick={handleMenuClick} >
            <ArrowDropDownIcon/>
            </IconButton>)}
            {mobileMenu}
            </Box>
            </>) : (
              <Toolbar>
            {location.pathname !== '/' && location.pathname !== '/signup'&& (<IconButton 
              edge ='start' 
              color ='inherit'
              aria-label ='menu'
              sx = {{mr:2}}
              onClick ={toggleOpen}>
              <MenuIcon/>
            </IconButton>)}
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <FoodBankIcon></FoodBankIcon>
              Recipe App
            </Typography>
            {location.pathname !== '/home/myRecipes' && location.pathname !==  '/signup' && location.pathname !== '/' && (<Button color="inherit" component={Link} to={`/home/myRecipes`} onClick={() => setView('myRecipes')}>Home</Button>)}
            {location.pathname !==  '/signup' && location.pathname !== '/' && (<Button color="inherit" component={Link} to="/explore" onClick={() => setView('allRecipes')}>Esplora</Button>)}
            {location.pathname !==  '/signup' && location.pathname !== '/' && (<Button color="inherit" onClick={toggleDarkMode}>
            {localStorage.getItem('darkMode') === 'true' ? <Brightness7Icon /> : <Brightness4Icon />}</Button>)}
            {location.pathname !== '/' && location.pathname !== '/signup'&& (<Grid2 container display='flex' alignContent={'center'}>
              <TextField
              type="text"
              variant="standard"
              placeholder="Cerca una ricetta..."
              value={searchQuery} //impostato il valore di input al valore attuale dello stato, se searchQuery cambia, il campo di input cambierà automaticamente
              onChange={handleSearchChange}
              sx={{backgroundColor: '!background', input: {color: 'white'}}}/>
            <Button variant ="contained" color="primary" component={Link} to={`/searchRecipe?title=${searchQuery}`} onClick={handleSearchSubmit}><SearchIcon/></Button>
            </Grid2>)}
            {location.pathname!== '/' && location.pathname!== '/signup' && (<Button color="inherit" onClick={handleLogout}><LogoutIcon /></Button>)}
            </Toolbar>
            )}
          </AppBar>
          <Sidebar isOpen={open} toggleOpen={toggleOpen} setView={setView}/>
        </Box>
      );
    }
    export default Navbar;
          