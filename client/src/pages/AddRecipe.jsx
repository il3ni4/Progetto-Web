import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import AddTextInput from '../components/AddTextInput'
import Typography from '@mui/material/Typography';
import DropDownMenu from '../components/DropDownMenu';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { Grid2 } from '@mui/material';
import Paper from '@mui/material/Paper';
import axios from 'axios';

const categories = ['Vegetariano', 'Vegano', 'Carne', 'Pesce'];
const types = ['Antipasti', 'Primi', 'Secondi', 'Lievitati', 'Dolci'];
const difficulties = ['Facile', 'Medio', 'Difficile'];

function AddRecipe () {

  const [formData, setFormData] = useState({
    title: '',
    ingredients: [''],
    people: 0,
    steps: [''],
    image: null,
    category: '',
    type: '',
    cookingTime: 0,
    difficulty: ''
  });

  const handleInputChange = (e) => {
    const newValue = e.target.type === 'number' ? Number(e.target.value) : e.target.value;

    setFormData({
        ...formData,
        [e.target.name]: newValue
      });
  };

  const handleIngredientChange = (index, e) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index] = e.target.value;
    //per evitare che ci siano stringhe vuote nel vettore, filtro il vettore newIngredients
    const filteredIngredients = newIngredients.filter(ingredient => ingredient.trim() !== '');
    setFormData({ ...formData, ingredients: filteredIngredients });
  };

  const addIngredient = () => {
    setFormData({
      ...formData,
      ingredients: [...formData.ingredients, '']
    });
  };

  const handleStepChange = (index, e) => {
    const newSteps = [...formData.steps];
    newSteps[index] = e.target.value;
    //per evitare che ci siano stringhe vuote nel vettore, filtro il vettore newIngredients
    const filteredSteps = newSteps.filter(step => step.trim() !== '');
    setFormData({ ...formData, steps: filteredSteps });
  };

  const addStep = () => {
    setFormData({
      ...formData,
      steps: [...formData.steps, '']
    });
  };

  const conversionBase64 = (img) => {
    return new Promise((res, rej) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(img);
      fileReader.onload = () => {
        res(fileReader.result);
      };
      fileReader.onerror = (error) => {
        rej(error);
      };
  });
};

  const handleImageChange = async (e) => {
    const image = e.target.files[0];
    const base64 = await conversionBase64(image);
    setFormData({ ...formData, image: base64 });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    formData.ingredients.filter(ingredient => ingredient.trim() !== '') //per rimuovere eventuali stringhe vuote prima del submit
    .forEach((ingredient, index) => {
      data.append(`ingredients[${index}]`, ingredient);
  });
    data.append('people', formData.people);
    formData.steps.filter(step => step.trim() !== '') //per rimuovere eventuali stringhe vuote prima del submit
    .forEach((step, index) => {
      data.append(`steps[${index}]`, step);
  });
    data.append('image', formData.image);
    data.append('category', formData.category);
    data.append('type', formData.type);
    data.append('cookingTime', formData.cookingTime);
    data.append('difficulty', formData.difficulty);
    
    try {
      console.log('Invio dati in corso...', data);
      const response = await axios.post(`${baseURL}home/add`, data);
      console.log(response.data)
      alert('Ricetta aggiunta con successo!');
      window.location.href = '/home/myRecipes'
    } catch (error) {
      console.error('Addrecipe failed:', error.response ? error.response.data : error.message);
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <Grid2 container direction="column" justifyContent="center" alignItems="center" style={{ height: '90%' }} spacing={2}>
        <Paper style={{padding:'30 px', height:'auto', width: '100%', maxWidth: '700px', margin: '20px auto'}}>
      
          {/*nome ricetta*/}
          <Grid2 container style={{padding: '10px', margin: '20px 10px'}} direction='row' spacing={2} rowSpacing={0.5}>
            <Grid2 item size={{ xs: 8, md:  4}} style={{ textAlign: 'left'}}>
              <Typography variant="body1" style={{ margin: '16px' }}>Inserisci nome ricetta</Typography>
            </Grid2>
            <Grid2 item size={{ xs: 12, md: 8 }} style={{ textAlign: 'right' }}>
              <TextField label="Nome Ricetta" name='title' value={formData.title} onChange={handleInputChange} fullWidth required variant='outlined'/>
            </Grid2>
          </Grid2>
        
          {/*Numero di persone*/}
          <Grid2 container style={{padding: '10px', margin: '20px 10px'}} direction='row' spacing={2} rowSpacing={0.5}>
            <Grid2 item size={{ xs: 8, md:  4}} style={{ textAlign: 'left'}}>
              <Typography variant="body1" style={{ margin: '16px' }}>Per quante persone?</Typography>
            </Grid2>
            <Grid2 item size={{ xs: 12, md: 8 }}>
              <TextField label="People" name="people" type="number" value={formData.people} onChange={handleInputChange} fullWidth required/>
            </Grid2>
          </Grid2>

          {/* ingredienti*/}
          <Grid2 container style={{padding: '10px', margin: '20px 10px'}} direction='row' alignItems='baseline' spacing={1} rowSpacing={0.5}>
            <Grid2 item size={{ xs: 8, md:  5}} style={{ textAlign: 'left'}}>
              <Typography variant="body1" style={{ margin: '16px' }}>Inserisci gli ingredienti necessari</Typography>
            </Grid2>
            <Grid2 item size={{ xs: 12, md: 7 }}>
              <AddTextInput label='Ingrediente' object={formData.ingredients} handleChange={handleIngredientChange} addHandler={addIngredient}/>
            </Grid2>
          </Grid2>

          {/* Steps */}
          <Grid2 container style={{padding: '10px', margin: '20px 10px'}} direction='column' spacing={1} rowSpacing={0.5}>
            <Grid2 item fullWidth>
              <Typography variant="body1" style={{ margin: '16px' }}>Inserisci il numero di step necessario per descrivere il procedimento</Typography>
            </Grid2>
            <Grid2 item fullWidth>
              <AddTextInput label='Step' object={formData.steps} handleChange={handleStepChange} addHandler={addStep}/>
            </Grid2>
          </Grid2>

          {/* Immagine */}
          <Grid2 container style={{padding: '10px', margin: '20px 10px'}} direction='row' spacing={2} rowSpacing={0.5} alignItems='center'>
            <Grid2 item size={{ xs: 8, md:  5}} style={{ textAlign: 'left'}}>
              <Typography variant="body1" style={{ margin: '16px' }}>Carica una foto della tua ricetta:</Typography>
            </Grid2>
            <Grid2 item size={{ xs: 12, md: 6}} style={{textAlign:'center', border: '2px solid #539fec', backgroundColor: '#a4c7eb', borderRadius: '8px', height:'40px'}}>
              <input type="file" label="image" name="image" accept=".jpeg, .png, .jpg" onChange={handleImageChange} style={{alignContent:'center', margin:'10px'}} />
            </Grid2>
          </Grid2>

          {/*categoria*/}
          <Grid2 container style={{padding: '10px', margin: '20px 10px'}} direction='row' spacing={2} rowSpacing={0.5} alignItems='center'>
            <Grid2 item size={{ xs: 9, md:  4}} style={{ textAlign: 'left'}}>
              <Typography variant="body1" style={{ margin: '16px' }}>Inserisci la categoria della ricetta</Typography>
            </Grid2>
            <Grid2 item size={{ xs: 12, md: 8}}>
              <DropDownMenu label='categoria' name='category' options={categories} onChange={handleInputChange}/>
            </Grid2>
          </Grid2>

          {/*tipo*/}
          <Grid2 container style={{padding: '10px', margin: '20px 10px'}} direction='row' spacing={2} rowSpacing={0.5} alignItems='center'>
            <Grid2 item size={{ xs: 8, md:  4}} style={{ textAlign: 'left'}}>
              <Typography variant="body1" style={{ margin: '16px' }}>Inserisci il tipo della ricetta</Typography>
            </Grid2>
            <Grid2 item size={{ xs: 12, md: 8}}>
              <DropDownMenu label='tipo' name='type' options={types} onChange={handleInputChange}/>
            </Grid2>
          </Grid2>

          {/*tempo preparazione*/}
          <Grid2 container style={{padding: '10px', margin: '20px 10px'}} direction='row' spacing={2} rowSpacing={0.5} alignItems='center'>
            <Grid2 item size={{ xs: 8, md:  4}} style={{ textAlign: 'left'}}>
              <Typography variant="body1" style={{ margin: '16px' }}>Tempo necessario per la preparazione:</Typography>
            </Grid2>
            <Grid2 item size={{ xs: 4, md: 8}}>
              <TextField placeholder="Inserisci numero minuti" name='cookingTime' type='number' variant= "standard" onChange={handleInputChange} style={{width:'90%'}}/>
            </Grid2>
          </Grid2>

          {/*difficoltà ricetta*/}
          <Grid2 container style={{padding: '10px', margin: '20px 10px'}} direction='row' spacing={2} rowSpacing={0.5} alignItems='center'>
            <Grid2 item size={{ xs: 10, md:  4}} style={{ textAlign: 'left'}}>
              <Typography variant="body1" style={{ margin: '16px' }}>Inserisci il livello di difficoltà della ricetta</Typography>
          </Grid2> 
          <Grid2 item size={{ xs: 12, md: 8}}>
            <DropDownMenu label='difficoltà' name='difficulty' options={difficulties} onChange={handleInputChange}/>
          </Grid2>
          </Grid2>


          {/*button submission form*/}
          <Grid2 item xs={12} style={{margin:'20px'}}>
            <Button type="submit" variant="contained" color="primary" endIcon={<SendIcon/>} fullWidth>
              Crea Ricetta!
            </Button>
          </Grid2>
        </Paper>
      </Grid2>
    </form>
  );
};

export default AddRecipe;
