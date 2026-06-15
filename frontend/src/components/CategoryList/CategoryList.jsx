import React, { useState, useEffect } from 'react';
import CategoryListItem from './CategoryListItem';
import CategoryService from '../../services/CategoryService'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { Tab } from 'bootstrap';

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        fetchCategories();
    }, []);
    const fetchCategories = async () => {
        try {
            const categoriesData = await CategoryService.getAllCategories();
            setCategories(categoriesData);
        } catch (error) {
            console.error('error fetching categories:', error);
        }
    };
    const handleDelete = async (id) => {
        try {
            await CategoryService.deleteCategory(id);
            fetchCategories();
        } catch (error) {
            console.error('error deleting categories:', error)
        }
    };
    const handleEdit = () => {
        fetchCategories();
    };

    return (
        <div className="container">
            <Box maxWidth={330} mx="auto" mt={6}>
                <h2 className="my-4">Lista Kategorii</h2>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Nazwa</TableCell>
                                <TableCell>Edytuj / Usuń</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {categories.map(category => (
                                <CategoryListItem key={category.id} category={category} onDelete={() => handleDelete(category.id)} onEdit={handleEdit} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </div>
    );
};
export default CategoryList;