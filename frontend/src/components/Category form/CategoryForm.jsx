import React, { useState } from 'react';
import CategoryService from '../../services/CategoryService';
import Button from '@mui/material/Button';

import FormControl from '@mui/material/FormControl';
import { TextField } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

const CategoryForm = ({ onCategoryAdded }) => {
    const [categoryName, setCategoryName] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newCategory = { categoryName };
        try {
            await CategoryService.addCategory(newCategory);
            onCategoryAdded();
            setCategoryName('');
        } catch (error) {
            console.error('Error adding category:', error);
        }
    };

    return (
        <div className="container">
            <Box maxWidth={250} mx="auto">
                <h2>Dodaj Kategorie</h2>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                        <TextField 
                            label="Nazwa"
                            value={categoryName}
                            onChange={e => setCategoryName(e.target.value)}
                            fullWidth
                            required
                            margin="normal"
                        />
                        <Button variant="outlined" color="secondary" type="submit" className="btn btn-primary">Dodaj</Button>
                    </Stack>
                </form>
            </Box>
        </div>
    );
};

export default CategoryForm;