import React, { useState, useEffect } from 'react';
import { BsX } from 'react-icons/bs';
import LoadingSpinner from './LoadingSpinner';

const AdminMenuModal = ({ isOpen, onClose, onSave, item, categories, isProcessing }) => {
    const [formData, setFormData] = useState({ name: '', description: '', price: '', image: '', available: '', category_id: '' });

    useEffect(() => {
        if (isOpen) {
            if (item) {
                setFormData({
                    name: item.name || '', description: item.description || '', price: item.price || '',
                    image: item.image || '', available: item.available || '', category_id: item.category_id || ''
                });
            } else {
                setFormData({ name: '', description: '', price: '', image: '', available: '', category_id: categories[0]?.id || '' });
            }
        }
    }, [item, categories, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const isNumeric = ['price', 'available', 'category_id'].includes(name);
        setFormData(prev => ({ ...prev, [name]: isNumeric ? parseFloat(value) || '' : value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData, item?.id);
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content form-modal">
                <div className="modal-header">
                    <button className="modal-close-btn" onClick={onClose}><BsX /></button>
                    <h3>{item ? 'Edit Menu Item' : 'Add New Menu Item'}</h3>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="modal-body">
                        {/* --- THIS IS THE CORRECTED JSX FOR THE FORM GRID --- */}
                        <div className="form-grid">
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="price">Price ($)</label>
                                <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} required step="0.01" />
                            </div>

                            <div className="form-group full-width">
                                <label htmlFor="description">Description</label>
                                <textarea id="description" name="description" value={formData.description} onChange={handleChange}></textarea>
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="image">Image URL</label>
                                <input type="text" id="image" name="image" value={formData.image} onChange={handleChange} />
                            </div>
                             <div className="form-group">
                                <label htmlFor="available">Available Qty</label>
                                <input type="number" id="available" name="available" value={formData.available} onChange={handleChange} required />
                            </div>

                            <div className="form-group full-width">
                                <label htmlFor="category_id">Category</label>
                                <select id="category_id" name="category_id" value={formData.category_id} onChange={handleChange} required>
                                    {(categories || []).map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className="process-btn" type="submit" disabled={isProcessing}>
                            {isProcessing ? <LoadingSpinner /> : 'Save Item'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminMenuModal;