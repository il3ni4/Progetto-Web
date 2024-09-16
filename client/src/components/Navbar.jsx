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
import { Grid2 } from '@mui/material';


function Navbar ({ setView }) {
  const location = useLocation();


  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSearchChange = (event) => {
    event.preventDefault();
    setSearchQuery(event.target.value);
  }; //event= evento generato quando cerco qualcosa, setSearchQuery utilizzato per aggiornare searchQuery con il nuovo valore digitato

  const handleSearchSubmit = () => {
    console.log('Stai cercando:', searchQuery);
    setView('searchedRecipes')
  } //chiamata quando l'utente fa click sul pulsante di ricerca, si accede al valore attuale della variabile di stato searchQuery

  const toggleOpen = () => {
      setOpen(!open)
  };

    return (
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position='static'>
          <Toolbar>
          <IconButton 
            edge ='start' 
            color ='inherit'
            aria-label ='menu'
            sx = {{mr:2}}
            onClick ={toggleOpen}>
            <MenuIcon/>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <FoodBankIcon></FoodBankIcon>
            Recipe App
          </Typography>
          {location.pathname !== '/main' && (<Button color="inherit" component={Link} to={`/home/myRecipes`} onClick={() => setView('myRecipes')}>Home</Button>)}
          <Button color="inherit" component={Link} to="/explore" onClick={() => setView('allRecipes')}>Esplora</Button>
          {location.pathname !== '/' && location.pathname !== '/signup'&& (
            <Grid2>
            <TextField
            type="text"
            variant="standard"
            placeholder="Cerca una ricetta..."
            value={searchQuery} //impostato il valore di input al valore attuale dello stato, se searchQuery cambia, il campo di input cambierà automaticamente
            onChange={handleSearchChange}
            sx={{backgroundColor: 'white'}}/>
          <Button variant ="contained" color="primary" component={Link} to={`/searchRecipe?title=${searchQuery}`} onClick={handleSearchSubmit}><SearchIcon/></Button>
          </Grid2>)}
          
          </Toolbar>
        </AppBar>
        <Sidebar isOpen={open} toggleOpen={toggleOpen} setView={setView}/>
        </Box>
      );
    }
    export default Navbar;