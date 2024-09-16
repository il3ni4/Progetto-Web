import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box, List, ListItem, ListItemText, Divider, Container, Grid2} from '@mui/material';

const recipe = {
  title: "Pasta alla carbonazza",
  ingredients: [
    "100g pasta",
    "2 uova",
    "tanta panna",
    "tanta pancetta",
    "molta grana"
  ],
  people: 2,
  steps: [
    "prendi acqua",
    "accendi fuoco",
    "butta pasta"
  ],
  category: "Pesce",
  type: "Primi",
  cookingTime: 20,
  user: {
    "$oid": "66e08257f49d6c086eccdf87"
  },
  createdAt: {
    $date: "2024-09-11T18:49:22.086Z"
  },
  updatedAt: {
    $date: "2024-09-11T18:49:22.086Z"
  },
  __v: 0
}

const RecipeCard = () => {
return (
  <Container maxWidth="md">
    <Card>
      <CardMedia
        component="img"
        height="300"
        image={recipe.image}
        alt={recipe.title}
      />

  <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: 2,
        padding: 2
      }}>
    
    {/* Durata */}
    <Grid2 container alignItems="center" spacing={1}>
        <Grid2 item>
          {/*<AccessTimeIcon color="primary" />*/}
        </Grid2>
        <Grid2 item>
          <Typography variant="subtitle1" fontWeight="bold" color="primary">
            TEMPO DI PREPARAZIONE:
          </Typography>
        </Grid2>
        <Grid2 item>
          <Typography variant="body1">{recipe.cookingTime}</Typography>
        </Grid2>
    </Grid2>

        {/* Numero Persone */}
        <Grid2 container alignItems="center" spacing={1}>
        <Grid2 item>
          {/*<AccessTimeIcon color="primary" />*/}
        </Grid2>
        <Grid2 item>
          <Typography variant="subtitle1" fontWeight="bold" color="primary">
            NUMERO PERSONE:
          </Typography>
        </Grid2>
        <Grid2 item>
          <Typography variant="body1">{recipe.people}</Typography>
        </Grid2>
    </Grid2>

        {/* Categoria */}
        <Grid2 container alignItems="center" spacing={1}>
        <Grid2 item>
          {/*<AccessTimeIcon color="primary" />*/}
        </Grid2>
        <Grid2 item>
          <Typography variant="subtitle1" fontWeight="bold" color="primary">
            CATEGORIA:
          </Typography>
        </Grid2>
        <Grid2 item>
          <Typography variant="body1">{recipe.category}</Typography>
        </Grid2>
    </Grid2>

        {/* Tipo */}
        <Grid2 container alignItems="center" spacing={1}>
        <Grid2 item>
          {/*<AccessTimeIcon color="primary" />*/}
        </Grid2>
        <Grid2 item>
          <Typography variant="subtitle1" fontWeight="bold" color="primary">
            TIPO:
          </Typography>
        </Grid2>
        <Grid2 item>
          <Typography variant="body1">{recipe.type}</Typography>
        </Grid2>
    </Grid2>
    
  </Box>

      <CardContent>
        <Typography variant="h3" component="div" gutterBottom>
          {recipe.title}
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          {recipe.description}
        </Typography>

        <Divider />
        
        <Box mt={2}>
          <Typography variant="h6">Ingredienti:</Typography>
          <List>
            {recipe.ingredients.map((ingredient, index) => (
              <ListItem key={index}>
                <ListItemText primary={ingredient} />
              </ListItem>
            ))}
          </List>
        </Box>

        <Divider />

        <Box mt={2}>
          <Typography variant="h6">Preparazione:</Typography>
          <List>
            {recipe.steps.map((step, index) => (
              <ListItem key={index}>
                <ListItemText primary={`${index + 1}. ${step}`} />
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
