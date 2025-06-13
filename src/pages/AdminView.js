import React, { useState } from 'react';
import { BsPencil, BsTrash, BsPlusCircle } from 'react-icons/bs';
import AdminMenuModal from '../components/AdminMenuModal';

const AdminView = ({ menuItems, categories, onSaveItem, onDeleteItem, isProcessing }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

    const handleOpenModal = (item = null) => {
        setEditingItem(item);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingItem(null);
    };

    const handleSaveAndClose = async (formData, itemId) => {
        const success = await onSaveItem(formData, itemId);
        if (success) {
            handleCloseModal();
        }
    };

    const handleDelete = (itemId) => {
        if (window.confirm("Are you sure you want to delete this item? This is permanent.")) {
            onDeleteItem(itemId);
        }
    };
    
    return (
        <div className="view-container full-width">
            <main className="main-content">
                <div className="page-card">
                    <div className="page-header">
                        <h2>Menu Management</h2>
                        <button className="add-new-btn" onClick={() => handleOpenModal()}>
                            <BsPlusCircle /> Add New Item
                        </button>
                    </div>
                    <div className="admin-table-container">
                        <table className="admin-menu-table">
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th>Available</th>
                                    <th>Sold</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(menuItems || []).map(item => (
                                    <tr key={item.id}>
                                        {/* --- THIS IS THE CORRECTED PART --- */}
                                        <td>
                                            <img src={item.image || 'https://via.placeholder.com/40'} alt={item.name} className="item-image" />
                                        </td>
                                        <td>{item.name}</td>
                                        <td>{item.category_name}</td>
                                        {/* Ensure price is positive and formatted correctly */}
                                        <td>${Math.abs(item.price).toFixed(2)}</td>
                                        <td>{item.available}</td>
                                        <td>{item.sold}</td>
                                        <td>
                                            <div className="admin-action-buttons">
                                                <button className="admin-action-btn edit" onClick={() => handleOpenModal(item)} title="Edit Item"><BsPencil /></button>
                                                <button className="admin-action-btn delete" onClick={() => handleDelete(item.id)} title="Delete Item"><BsTrash /></button>
                                            </div>
                                        </td>
                                        {/* ------------------------------------- */}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
            
            <AdminMenuModal 
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSave={handleSaveAndClose}
                item={editingItem}
                categories={categories}
                isProcessing={isProcessing}
            />
        </div>
    );
};

export default AdminView;