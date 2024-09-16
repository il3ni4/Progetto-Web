import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import AddRecipe from './pages/AddRecipe';
import RecipeGallery from './pages/RecipeGallery';
import RecipeCard from './pages/RecipeCard';
import useDarkMode from './components/useDarkMode'
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material';


axios.defaults.withCredentials = true;
axios.defaults.headers.common['Content-Type'] = 'application/json'; 

function App() {
    const [message, setMessage] = useState('');
    const [view, setView] = useState('myRecipes');
    const { theme, toggleDarkMode } = useDarkMode();

    useEffect(() => {
      // Fetch data from the Express server
      axios.get('http://localhost:5000/')
        .then(response => setMessage(response.data))
        .catch(error => console.error('errore: ' + error));
    }, []);
    
  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <Router>
    <Navbar setView={setView} toggleDarkMode={toggleDarkMode}/>
    <Routes>
      {/*INSERIRE NELLE ROUTE SOLO PAGINE, NON COMPONENTI*/}
        <Route path="/" element={<Login/>}/>
        <Route path ="/signup" element ={<Signup/>}/>
        <Route path="/home/myRecipes" element={<RecipeGallery view={'myRecipes'} setView={setView}/>}/>
        <Route path="/explore" element={<RecipeGallery view={'allRecipes'} setView={setView}/>}/>
        <Route path ="/searchRecipe/" element ={<RecipeGallery view={'searchedRecipes'} setView={setView}/>}/>
        <Route path="/savedRecipes" element={<RecipeGallery view={'savedRecipes'} setView={setView}/>}/>
        <Route path ="/category/:category" element ={<RecipeGallery view={'category'}/>}/>
        <Route path ="/type/:type" element ={<RecipeGallery view={'type'}/>}/>
        <Route path = "/addRecipe" element = {<AddRecipe/>}/>
        <Route path = "/recipe/:id" element = {<RecipeCard/>}/>
    </Routes>
    </Router>
    </ThemeProvider>
  );
}

export default App;
