import React, { useState, useEffect} from 'react';
import ExpenseService from '../../services/ExpenseService';
import CategoryService from '../../services/CategoryService';

import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import { TextField } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import 'dayjs/locale/pl';

const ExpenseForm = ({ onExpenseAdded }) => {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState('');
    const [date, setDate] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        const categoriesData = await CategoryService.getAllCategories();
        setCategories(categoriesData)
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formatedDate = date.format('YYYY-MM-DD');

        const newExpense = { name, amount: parseFloat(amount), categoryId: parseInt(categoryId), date: formatedDate };
        try {
            await ExpenseService.addExpense(newExpense);
            onExpenseAdded();
            setName('');
            setAmount('');
            setCategoryId('');
            setDate(null);
        } catch (error) {
            console.error('Error adding expense:', error);
        }
    };

    return (
        <div className="container">
            <Box maxWidth={500} maxHeight={100} mx="auto">
            <h2 className="my-4">Dodaj Wydatek</h2>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                        

                        <TextField
                            label="Nazwa wydatku"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            fullWidth
                            color='secondary'
                            required
                            margin="normal"
                        />

                        <TextField
                            label="Cena"
                            type="number"
                            value={amount}
                            onChange={e => setAmount(e.target.value)}
                            fullWidth
                            color='secondary'
                            required
                            margin="normal"
                        />

                        <FormControl color='secondary' fullWidth>
                        <InputLabel>Kategoria</InputLabel>
                        <Select
                            labelId="category-label"
                            id="category-select"
                            value={categoryId}
                            label="Kategoria"
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
                        >
                            <MenuItem value="">brak</MenuItem>
                            {categories.map(c => (
                            <MenuItem key={c.id} value={c.id}>
                                {c.categoryName}
                            </MenuItem>
                            ))}
                        </Select>
                        </FormControl>

                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pl">
                        <DatePicker
                            label="Data"
                            value={date}
                            onChange={(newVal) => setDate(newVal)}
                            fullWidth
                            required
                            margin="normal"
                            slotProps={{
                                textField: {
                                    color: 'secondary',
                                    // focused: true,
                                }
                            }}
                        />
                        </LocalizationProvider>
                        <Button variant="outlined" color="secondary" type="submit">Dodaj</Button>
                    </Stack>
                </form>
            </Box>
        </div>
    );
};

export default ExpenseForm;