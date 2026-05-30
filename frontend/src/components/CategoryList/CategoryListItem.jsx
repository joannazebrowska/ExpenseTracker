import React, { useState } from 'react';
import CategoryService from '../../services/CategoryService';

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
        <li className="list-group-expense">
            {isEditing ? (
                <div className="row">
                    <div className="col">
                        <input type="text" className="form-control" value={editedCategoryName} onChange={e => setEditedCategoryName(e.target.value)} required />
                    </div>
                    <div className="col-auto">
                        <button className="btn btn-success me-2" onClick={handleSave}>Zapisz</button>
                        <button className="btn btn-secondary" onClick={handleCancel}>Anuluj</button>
                    </div>
                </div>
            ) : (
                <div className="d-flex justify-content-between align-items-center">
                    <span>{category.categoryName}</span>
                    <div>
                        <button className="btn btn-danger me-2" onClick={onDelete}>Usuń</button>
                        <button className="btn btn-primary" onClick={handleEdit}>Edytuj</button>
                    </div>
                </div>
            )}
        </li>
    );
};
export default CategoryListItem;
