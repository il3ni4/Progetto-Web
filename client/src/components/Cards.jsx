import {React, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button} from '@mui/material';
import axios from 'axios'
import {Link} from'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';


function Cards ({ key, recipe, setRecipes }) {
  
  const location = useLocation();
  const [savedRecipes, setSavedRecipes] = useState([]);

  const handleSaveRecipe = async (recipe) => {
    try{
      console.log("Salvataggio della ricetta: ", recipe);
      const added = await axios.post('http://localhost:5000/auth/saveRecipe', recipe)
      setSavedRecipes([...savedRecipes, added.data.user.favorites]);
      // console.log("saved recipes : ", saved);
    }
    catch (err){
        console.log("errore nel salvataggio della ricetta: ", err);
    }
  }

  const handleRemoveSavedRecipe = async (recipeId) => {
    try{
      const userUpdated = await axios.delete(`http://localhost:5000/auth/delete/${recipeId}`);
      console.log("Ricetta rimossa dalle preferite: ", userUpdated.data);
      setRecipes((prevRecipes) => prevRecipes.filter((recipe) => recipe._id !== recipeId)); //senza effettuare nuovamente una chiamata API, si può utilizzare lo state recipes per aggiornare direttamente la lista delle ricette salvate da visualizzare
    }
    catch (err){
        console.log(err);
    }
  }

  const handleDeleteRecipe = async (recipeId) => {
    try{
      const deleted = await axios.delete(`http://localhost:5000/home/recipe/${recipeId}`);
      alert("Ricetta eliminata con successo");
      setRecipes((prevRecipes) => prevRecipes.filter((recipe) => recipe._id !== recipeId));
    } 
    catch (err){
        alert(err.response.data.msg);
    }
  }


 
    return (
        <Card sx={{ width: 330}}>
            <CardActionArea component={Link} to={`/recipe/${recipe._id}`}>
              <CardMedia
                component="img"
                height="140"
                image={recipe.image}
                alt={recipe.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {recipe.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {recipe.description}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              {location.pathname !== '/savedRecipes'  && (<Button onClick={() => handleSaveRecipe(recipe)} variant="outlined" size="medium">
                Salva
              </Button>)}
              {location.pathname === '/savedRecipes' && (<Button onClick={() => handleRemoveSavedRecipe(recipe._id)} variant="outlined" size="medium">
                Rimuovi
              </Button>)}
              {location.pathname === '/home/myRecipes' && (<Button variant="outlined" size="medium" onClick={() => handleDeleteRecipe(recipe._id)}>
                <DeleteIcon />
              </Button>)}
            </CardActions>
          </Card>
    )
}

export default Cards;