import React, { useState } from 'react';
import AuthService from '../../services/AuthService';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { purple } from '@mui/material/colors';

const LoginForm = ({ }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await AuthService.login(email, password)
            setEmail('');
            setPassword('');
        } catch (error) {
            console.error('Logging error', error);
        }
    };

    let navigate = useNavigate();
    const routeChange = () => {
        let path = '/register';
        navigate(path);
    }

    const color = purple[50];

    return (
        <div className="loginForm">
            <Box maxWidth={370} maxHeight={1} mx="auto">
            <Paper elevation={2} sx={{ padding: 4 }}>
            <Typography variant="h6" textAlign="center" mb={3}>
                Zaloguj się, aby kontynuuować
            </Typography>    
            <form onSubmit={handleSubmit}>
                <Stack mb={2}>
                    <TextField
                        label='Email:'
                        type='text'
                        className='form-control'
                        id="email"
                        value={email}
                        color="secondary" 
                        onChange={e => setEmail(e.target.value)} 
                        required  
                     />
                </Stack>
                <Stack mb={2}>
                    <TextField
                        label='Hasło:'
                        type='text' /* na razie type text w hasle do testow (pozniej zmienic na password) */
                        className='form-control'
                        id="password"
                        value={password} 
                        color="secondary" 
                        onChange={e => setPassword(e.target.value)} 
                        required  
                    />
                </Stack> 
                <Stack direction="column" spacing={1}>
                    <Button variant="outlined" color="secondary" type="submit"className="btn btn-primary">Zaloguj</Button>
                    <Button variant="outlined" color="secondary" type="submit" onClick={routeChange}>
                        Nie mam konta
                    </Button>
                </Stack>
            </form>
            </Paper>
            </Box>
        </div>
    )
}; 


export default LoginForm;
