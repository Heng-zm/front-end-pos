import React from 'react';
import { BsPlus } from 'react-icons/bs';

const MenuItemCard = ({ item, onAddToCart }) => {
    const isAvailable = item.available > 0;
    const isLowStock = isAvailable && item.available <= 5;

    return (
        <div className={`menu-item-card ${!isAvailable ? 'unavailable' : ''}`}>
            {isLowStock && <div className="low-stock-badge">Low Stock</div>}
            <img src={item.image || 'https://via.placeholder.com/250'} alt={item.name} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '12px', marginBottom: '12px' }}/>
            <div className="item-info">
                <h4 style={{ margin: '0 0 4px', fontSize: '1rem' }}>{item.name}</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '0 0 12px', lineHeight: 1.5, height: '54px', overflow: 'hidden' }}>{item.description}</p>
                <div className="item-stock">
                    <span>{item.available} Available</span>
                    <span>•</span>
                    <span>{item.sold} Sold</span>
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                <span style={{ fontSize: '1.25rem', fontWeight: 600 }}>
                    {/* Bug Fix: Ensure price is positive and formatted */}
                    ${Math.abs(item.price).toFixed(2)}
                </span>
                {isAvailable ? (
                    <button className="add-btn" onClick={() => onAddToCart(item)} style={{ background: 'var(--primary-blue)', color: 'white', border: 'none', width: '40px', height: '40px', borderRadius: '12px', fontSize: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
                        <BsPlus />
                    </button>
                ) : null}
            </div>
        </div>
    );
};

export default MenuItemCard;