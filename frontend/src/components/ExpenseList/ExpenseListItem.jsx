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

import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


const ExpenseListItem = ({expense, onDelete, onEdit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(expense.name)
    const [editedAmount, setEditedAmount] = useState(expense.amount)
    const [editedDate, setEditedDate] = useState(expense.date)
    const [editedCategoryId, setEditedCategoryId] = useState(expense.categoryId)
    const [categories, setCategories] = useState([])
    const handleEdit = async () => {
        setIsEditing(true);
    };
    const handleSave = async () => {
        const editedExpense = { ...expense, name: editedName, amount: parseFloat(editedAmount), date: editedDate, categoryId: editedCategoryId === "" ? null : parseInt(editedCategoryId)};
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
        setEditedDate(expense.date);
        setEditedCategoryId(expense.categoryId)
    };
    return (
        <TableRow className="expense-table">
            {isEditing ? (
                <>
                    <TableCell className="col">
                        <input type="text" className="form-control" value={editedName} onChange={e => setEditedName(e.target.value)} required />
                    </TableCell>
                    <TableCell className="col">
                        <input type="number" className="form-control" value={editedAmount} onChange={e => setEditedAmount(e.target.value)} required />
                    </TableCell>
                    <TableCell className="col">
                        <input type="date" className="form-control" value={editedDate} onChange={e => setEditedDate(e.target.value)} required />
                    </TableCell>
                    <TableCell>
                        <select className="form-control" value={editedCategoryId} onChange={e => setEditedCategoryId(e.target.value)} required>
                            <option value="">brak</option>
                            {categories.map(c => (
                                <option key={c.id} value={c.id}>{c.categoryName}</option>
                            ))}
                        </select>
                    </TableCell>
                    <TableCell className="col-auto">
                        <button className="btn btn-success me-2" onClick={handleSave}>Zapisz</button>
                        <button className="btn btn-secondary" onClick={handleCancel}>Anuluj</button>
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
    );
};
export default ExpenseListItem;
