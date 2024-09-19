import {React, useState} from 'react';
import { Grid2, Typography } from '@mui/material';
import Paper from '@mui/material/Paper'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import FormHelperText from '@mui/material/FormHelperText';
const baseURL = process.env.baseURL;

function Login() {
    const [error, setError] = useState('');  //stato per gestire errori durante il login
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })
    
    const handleInput = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
          });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('username', formData.username);
        data.append('password', formData.password);

        try {
            const response = await axios.post(`${baseURL}auth/login`, data);
            console.log(response.data);
            window.location.href = '/home/myRecipes' 
          } catch (err) {
            if (err.status === 400){
            setError(err.response.data.msg);}
          }
    }

    return (
        <Grid2 container direction="column" justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
            <Paper style={{padding:'20 px', height:'70 vh', width: 280, margin: '20 px auto'}}>
            <Grid2 align='center'>
            <AccountCircleIcon/>
            <Typography variant="h4" gutterBottom>
            Login 
            </Typography> 
            </Grid2>
            <form onSubmit={handleSubmit}>
            <TextField label ='Username' name='username' placeholder='Inserisci username' value={formData.username} onChange={handleInput} fullWidth required/>
            <TextField label ='Password' name='password' placeholder='Inserisci password' type ='password' value={formData.password} onChange={handleInput} fullWidth required/>
            {error && (<FormHelperText sx={{ color: 'red' }}>{error}</FormHelperText>)}
            <Button type ='submit' color ='primary' variant= 'contained' style ={{margin : '8 px 0'}} fullWidth>
            Accedi 
            </Button>
            </form>
            <h5>Non hai un account? <a href ="/signup">Iscriviti</a> </h5>
            </Paper>
        </Grid2>
    )
}

export default Login;