import React, { useState } from 'react';
import { Button, Grid2,Paper,Typography} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import TextField from '@mui/material/TextField';
import axios from 'axios';

function Signup () {
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
            const response = await axios.post('http://localhost:5000/auth/signUp', data, {
                headers: {
                'Content-Type': 'application/json'
            }
        });
            console.log(response.data);
          } catch (error) {
            console.error('Login failed prova:', error.response ? error.response.data : error.message);
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
                    <Button type="submit" variant="contained" color ="primary" fullWidth>
                    Registrati
                    </Button>
                </form>
    
            </Paper>

        </Grid2>
        
    )
}

export default Signup