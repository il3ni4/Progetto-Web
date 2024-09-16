import React, { useEffect, useState } from 'react';
import Grid2 from '@mui/material/Grid2';
import Cards from '../components/Cards';
import axios from 'axios';
import Button from '@mui/material/Button';
import Container from "@mui/material/Container"
import { useTheme } from '@mui/material/styles';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Link } from 'react-router-dom';
import { useLocation, useParams } from 'react-router-dom';


function RecipeGallery({ view, setView }) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const { category, type } = useParams();
  const location = useLocation();
  const theme = useTheme(); // utilizzare il tema (gestito da Material UI) all'interno del componente
  
  const searchQuery = new URLSearchParams(location.search).get('title');

  

useEffect(() => {
  const fetchRecipes = async () => {
  setLoading(true);
  setRecipes([]);
  

  try{
    let response;
    if (view === 'myRecipes') {
      response = await axios.get(`http://localhost:5000/home/myRecipes`); 
    } else if (view === 'allRecipes') {
      response = await axios.get(`http://localhost:5000/home/explore`); 
    } else if (view === 'category') {
      response = await axios.get(`http://localhost:5000/home/category/${category}`);
    } else if (view === 'savedRecipes') {
      response = await axios.get(`http://localhost:5000/home/saved`); 
    } else if (view === 'type') {
      response = await axios.get(`http://localhost:5000/home/type/${type}`)
    } else if (view === 'searchedRecipes') {
      response = await axios.get(`http://localhost:5000/home/search?title=${searchQuery}`)
    }
    console.log("Response data:", response.data); 
    setRecipes(response.data.recipes)
  }
  catch (err){
    if (err.status === 401){
    alert("Devi effettuare il login per accedere a questa pagina!")
    window.location.href = "/";}

      console.log("Errore nel caricamento delle ricette: ", err)
    } finally {
      setLoading(false);
    }


}
fetchRecipes();
}, [view, searchQuery, category, type]) // Esegui l'API call ogni volta che cambiano view, query di ricerca, categoria o tipo di ricetta

if (loading) {
  return <div>Caricamento in corso...</div>; 
}


  return (
    <Grid2 container spacing={5} justifyContent="center" style={{ marginTop: '30px' }}>
      {recipes && recipes.map((recipe, index) => (
        <Grid2 item xs={12} md={4} key={index}>
          <Cards key={recipe.id} recipe={recipe} setRecipes={setRecipes}></Cards>
        </Grid2>
      ))}
      {location.pathname === '/home/myRecipes' && (
        <Container>
        <Button variant="contained" color="primary" style={{ position: 'fixed',
          bottom: theme.spacing(2),
          right: theme.spacing(2)}} component={Link} to="/addRecipe" >
          Aggiungi ricetta 
          <AddCircleIcon/>
        </Button>
      <Button variant="contained" color="secondary" style={{  position: 'fixed',bottom: theme.spacing(2), right: theme.spacing(27)}} component={Link} to="/savedRecipes" onClick={() => setView('savedRecipes')}>
       Visualizza Ricette Salvate 
      </Button>
      </Container>
      )}
    </Grid2>
  );
}

export default RecipeGallery;

//RecipeCard: Questo è un componente React che accetta una proprietà chiamata onSave
//onSave funzione utilizzata per salvare una ricetta quando l'utente clicca sul pulsante "Salva" in ogni card.
//cardsData.map utilizzato il metodo .map() per iterare attraverso l'array cardsData e creare una card per ogni oggetto ricetta, 
//Viene utilizzato per impostare una chiave univoca (key={index}
//xs={12} significa che la card occuperà l'intera larghezza (12 colonne) sugli schermi più piccoli.
//md={4} significa che la card occuperà 4 colonne sugli schermi medi e grandi, mostrando 3 card per riga.
//onClick={() => onSave(card)}: Quando l'utente clicca su questo pulsante, viene eseguita la funzione 
//onSave passando l'intera ricetta (card) come argomento.