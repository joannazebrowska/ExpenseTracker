import React, { useState } from 'react';
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

import { IconButton, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const CategoryListItem = ({category, onDelete, onEdit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedCategoryName, setEditedCategoryName] = useState(category.categoryName)
    const handleEdit = async () => {
        setIsEditing(true);
    };
    const handleSave = async () => {
        const editedCategory = { ...category, categoryName: editedCategoryName };
        try {
            await CategoryService.updateCategory(category.id, editedCategory);
            setIsEditing(false);
            onEdit();
        } catch (error) {
            console.error('Error updating category:', error);
        }
    };
    const handleCancel = () => {
        setIsEditing(false);
        setEditedCategoryName(category.categoryName);
    };
    return (
        <TableRow className="category-table">
            {isEditing ? (
                <>
                    <TableCell className="col">
                        <TextField type="text" id="outlined-basic" variant="outlined" color="secondary" value={editedCategoryName} onChange={e => setEditedCategoryName(e.target.value)} required />
                    </TableCell>
                    <TableCell>
                        <Button size="small" variant="outlined" color="secondary" onClick={handleSave}>Zapisz</Button>
                        <Button size="small" variant="outlined" color="secondary" onClick={handleCancel}>Anuluj</Button>
                    </TableCell>
                </>
            ) : (
                <>
                    <TableCell>{category.categoryName}</TableCell>
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
export default CategoryListItem;
