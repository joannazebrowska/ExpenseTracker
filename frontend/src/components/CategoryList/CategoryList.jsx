import React, { useState, useEffect } from 'react';
import CategoryListItem from './CategoryListItem';
import CategoryService from '../../services/CategoryService'

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
            <h2 className="my-4">Lista Kategorii</h2>
            <ul className="list-group">
                {categories.map(category => (
                    <CategoryListItem key={category.id} category={category} onDelete={() => handleDelete(category.id)} onEdit={handleEdit} />
                ))}
            </ul>
        </div>
    );
};
export default CategoryList;