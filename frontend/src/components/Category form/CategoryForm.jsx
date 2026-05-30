import React, { useState } from 'react';
import CategoryService from '../../services/CategoryService';
import Button from '@mui/material/Button';

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
            <h2 className="my-4">Dodaj Kategorie</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="categoryName" className="form-label">Nazwa:</label>
                    <input type="text" className="form-control" id="categoryName" value={categoryName} onChange={e => setCategoryName(e.target.value)} required />
                </div>
                <Button variant="outlined" type="submit" className="btn btn-primary">Dodaj Kategorie</Button>
            </form>
        </div>
    );
};

export default CategoryForm;