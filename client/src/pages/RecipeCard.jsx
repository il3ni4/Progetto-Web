import React, { useEffect } from 'react';
import { Card, CardMedia, CardContent, Typography, Box, List, ListItem, ListItemText, Divider, Container, Grid2} from '@mui/material';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CircleIcon from '@mui/icons-material/Circle';
import YoutubeSearchedForTwoToneIcon from '@mui/icons-material/YoutubeSearchedForTwoTone';



const RecipeCard = () => {
  const [recipe, setRecipe] = useState(null);
  const {id} = useParams();

  useEffect(() => {
    const fetchRecipe = async () => {
      try{
        console.log(id);
        const response = await axios.get(`${baseURL}home/recipe/${id}`);
      console.log("Response data:", response.data);
      setRecipe(response.data.recipe);
    }catch (err){
      console.log("Errore nel caricamento della ricetta: ", err);
    }
  }
  fetchRecipe();
}, [id]);

if(!recipe) 
  return <div style={ {display:"flex", flexDirection:"row", justifyContent:"center", alignContent:"center", alignItems: "center"} }>
            <h3>Caricamento in corso...</h3>
            <YoutubeSearchedForTwoToneIcon></YoutubeSearchedForTwoToneIcon>
          </div>; ;


return (
  <Container maxWidth="md" sx={ {mt: 4, mb: 4} }>
    <Card>
    <CardContent sx={ {mt: 2, mb: 2, ml: 15, mr: 15}}>
      <CardMedia
        component="img"
        image={recipe.image}
        alt={recipe.title}
        sx={{ objectFit: 'contain',
          objectPosition: 'central',
          boxShadow: '0 5px 15px rgba(0, 0, 0, 0.45)'
        }}
      />
    </CardContent>
      
    <Typography variant="h3" component="div" gutterBottom sx={{ml: 2}}>
      {recipe.title}
    </Typography>
    

  <Box sx={{
    display: 'flex',
    flexDirection: 'row',
        gap: 2,
        padding: 2
      }}>
    
    {/* Durata */}
    <Grid2 container alignItems="center" spacing={1}>
        <Grid2 item>
          <AccessTimeFilledIcon color="primary" />
        </Grid2>
        <Grid2 item>
          <Typography variant="subtitle1" fontWeight="bold" color="primary">
            TEMPO DI PREPARAZIONE:
          </Typography>
        </Grid2>
        <Grid2 item>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{recipe.cookingTime}{recipe.cookingTime > 1 ? " minuti" : " minuto"}</Typography>
        </Grid2>
    </Grid2>
  </Box>

    <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: 2,
        padding: 2
      }}>
        {/* Numero Persone */}
        <Grid2 container alignItems="center" spacing={1}>
        <Grid2 item>
          <PeopleAltIcon color="primary" />
        </Grid2>
        <Grid2 item>
          <Typography variant="subtitle1" fontWeight="bold" color="primary">
            DOSI PER:
          </Typography>
        </Grid2>
        <Grid2 item>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{recipe.people}{recipe.people >1 ? " persone" : " persona"}</Typography>
        </Grid2>
    </Grid2>
    </Box>

    <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: 2,
        padding: 2
      }}>
        {/* Categoria */}
        <Grid2 container alignItems="center" spacing={1}>
        <Grid2 item>
          <RestaurantIcon color="primary" />
        </Grid2>
        <Grid2 item>
          <Typography variant="subtitle1" fontWeight="bold" color="primary">
            CATEGORIA:
          </Typography>
        </Grid2>
        <Grid2 item>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{recipe.category}</Typography>
        </Grid2>
    </Grid2>
    </Box>

    <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: 2,
        padding: 2
      }}>
        {/* Tipo */}
        <Grid2 container alignItems="center" spacing={1}>
        <Grid2 item>
          <MenuBookIcon color="primary" />
        </Grid2>
        <Grid2 item>
          <Typography variant="subtitle1" fontWeight="bold" color="primary">
            TIPOLOGIA:
          </Typography>
        </Grid2>
        <Grid2 item>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{recipe.type}</Typography>
        </Grid2>
    </Grid2>
    
  </Box>

      <CardContent>

        <Divider />
        
        <Box mt={2}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Ingredienti:</Typography>
          <List>
            {recipe.ingredients.map((ingredient, index) => (
              <ListItem key={index}>
                  <CircleIcon sx={{ fontSize: 8, color: 'black', mr:1 }}/>
                <ListItemText 
                primary={ingredient} />
              </ListItem>
            ))}
          </List>
        </Box>

        <Divider />

        <Box mt={2}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Preparazione:</Typography>
          <List>
            {recipe.steps.map((step, index) => (
              <ListItem key={index}>
                <Typography component="span" sx={{ fontWeight: 'bold', marginRight: 1 }}>
              {index + 1}.
            </Typography>
            <ListItemText primary={step} />
              </ListItem>
            ))}
          </List>
        </Box>
      </CardContent>
    </Card>
  </Container>
);
};

export default RecipeCard;
