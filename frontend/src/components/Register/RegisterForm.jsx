import React, { useState } from 'react';
import AuthService from '../../services/AuthService';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import { TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const RegisterForm = ({ }) => {

    let navigate = useNavigate();
    const routeChange = () => {
        let path = '/auth';
        navigate(path)
    }
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [open, setOpen] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await AuthService.register(email, password)
            setEmail('');
            setPassword('');
            setOpen(true);
            setTimeout(() => routeChange(), 2000);
        } catch (error) {
            console.error('Registering error', error);
        }
    };

        return (
            <div className="registerForm">
                <Box maxWidth={370} mx="auto" mt={4}>
                    <Paper elevation={2} sx={{padding: 4}}>
                        <Typography variant='h6' textAlign={'center'} mb={3}>
                            Zarejestruj się
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <Stack spacing={1} mb={2}>
                                <TextField
                                    label = 'Email:'
                                    className='form-label'
                                    type='text'
                                    className='form-control'
                                    id="email"
                                    color="secondary"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                />
                                <TextField
                                    label = 'Hasło:'
                                    className='form-label'
                                    input type='text'
                                    className='form-control'
                                    id="password"
                                    color="secondary"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                />
                            </Stack>
                            <Stack direction={'column'} spacing={1}>
                                <Button variant="outlined" type="submit" color="secondary"  className="btn btn-primary">Zarejestruj</Button>
                            </Stack>
                        </form>
                    </Paper>
                </Box>
                <Snackbar
                open={open}
                autoHideDuration={2000}
                message="Konto utworzone. Przekierowanie..."
                />
            </div>
        )
};

export default RegisterForm;