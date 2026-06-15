import React, { useState, useEffect} from 'react';
import ExpenseService from '../../services/ExpenseService';
import CategoryService from '../../services/CategoryService';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { IconButton, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import 'dayjs/locale/pl';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const ExpenseListItem = ({expense, onDelete, onEdit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(expense.name)
    const [editedAmount, setEditedAmount] = useState(expense.amount)
    const [editedDate, setEditedDate] = useState(expense.date ? dayjs(expense.date) : null)
    const [editedCategoryId, setEditedCategoryId] = useState(expense.categoryId ?? '')
    const [categories, setCategories] = useState([])
    const handleEdit = async () => {
        setIsEditing(true);
    };
    const handleSave = async () => {
        const formatedDate = editedDate.format('YYYY-MM-DD');

        const editedExpense = { ...expense, name: editedName, amount: parseFloat(editedAmount), date: formatedDate, categoryId: editedCategoryId === "" ? null : parseInt(editedCategoryId)};
        try {
            await ExpenseService.updateExpense(expense.id, editedExpense);
            setIsEditing(false);
            onEdit();
        } catch (error) {
            console.error('Error updating expense:', error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        const categoriesData = await CategoryService.getAllCategories();
        setCategories(categoriesData)
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditedName(expense.name);
        setEditedAmount(expense.amount);
        setEditedDate(dayjs(expense.date));
        setEditedCategoryId(expense.categoryId)
    };
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pl">
        <TableRow className="expense-table">
            {isEditing ? (
                <>
                    <TableCell className="col">
                        <TextField id="outlined-basic" variant="outlined" color="secondary" type="text" className="form-control" value={editedName} onChange={e => setEditedName(e.target.value)} required />
                    </TableCell>
                    <TableCell className="col">
                        <TextField id="outlined-basic" variant="outlined" color="secondary" type="number" className="form-control" value={editedAmount} onChange={e => setEditedAmount(e.target.value)} required />
                    </TableCell>
                    <TableCell className="col">
                        <DatePicker slotProps={{textField:{color: 'secondary'}}} value={editedDate} onChange={(newDate) => setEditedDate(newDate)} required />
                    </TableCell>
                    <TableCell>
                        <Select labelId="category-label" color='secondary' id="category-select" value={editedCategoryId} onChange={e => setEditedCategoryId(e.target.value)} required>
                            <MenuItem value="">brak</MenuItem>
                            {categories.map(c => (
                                <MenuItem key={c.id} value={c.id}>{c.categoryName}</MenuItem>
                            ))}
                        </Select>
                    </TableCell>
                    <TableCell className="col-auto">
                        <Button size="small" variant="outlined" color="secondary" onClick={handleSave}>Zapisz</Button>
                        <Button size="small" variant="outlined" color="secondary" onClick={handleCancel}>Anuluj</Button>
                    </TableCell>
                </>
            ) : (
                <>
                    <TableCell>{expense.name}</TableCell>
                    <TableCell>{expense.amount}</TableCell>
                    <TableCell>{expense.date}</TableCell>
                    <TableCell>{expense.categoryName || "brak"}</TableCell>
                    <TableCell>
                        <IconButton onClick={handleEdit}>
                            <EditIcon />
                        </IconButton>
                        <IconButton onClick={onDelete}>
                            <DeleteIcon />
                        </IconButton>
                    </TableCell>
                </>
            )}
        </TableRow>
        </LocalizationProvider>
    );
};
export default ExpenseListItem;
