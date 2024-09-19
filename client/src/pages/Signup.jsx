import React, { useState } from 'react';
import { Button, Grid2,Paper,Typography} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import FormHelperText from '@mui/material/FormHelperText'
const baseURL = process.env.baseURL;

function Signup () {
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        email: '',
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
        data.append('email', formData.email);
        data.append('username', formData.username);
        data.append('password', formData.password);

        try {
            const response = await axios.post(`${baseURL}/auth/signUp`, data, {
                headers: {
                'Content-Type': 'application/json'
                 }
                });
            window.location.href = '/home/myRecipes' 
            console.log(response.data);
          } catch (err) {
            if (err.status === 400){
                setError(err.response.data.msg);
          }
    }
}

    return (
        <Grid2 container direction="column" justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
            <Paper style ={{padding:'30 px 15 px', width: 350, margin: "20 px auto"}}>
                <Grid2 align="center">
                        <LockIcon/>
                    <Typography variant="h4" gutterBottom>
                        Registrazione
                    </Typography> 
                    <Typography variant ="caption">
                    Compila il seguente form per registrarti
                    </Typography>
                </Grid2>
                <form onSubmit={handleSubmit}>
                    <TextField fullWidth label='Email' name='email' placeholder='Inserisci email' type ='email' value={formData.email} required onChange={handleInput}/>
                    <TextField fullWidth label='Username' name='username' placeholder='Inserisci username' value={formData.username} required onChange={handleInput}/>
                    <TextField fullWidth label='Password' name='password' placeholder='Inserisci password' type ='password' value={formData.password} required onChange={handleInput}/>
                    {error && (<FormHelperText sx={{ color: 'red' }}>{error}</FormHelperText>)}
                    <Button type="submit" variant="contained" color ="primary" fullWidth>
                    Registrati
                    </Button>
                </form>
    
            </Paper>

        </Grid2>
        
    )
}

export default Signup;