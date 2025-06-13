import React from 'react';
import { BsDash, BsPlus } from 'react-icons/bs';

const OrderDetailsItem = ({ item, onUpdateQuantity }) => (
    <div className="order-details-item">
        <img src={item.image || 'https://via.placeholder.com/60'} alt={item.name} />
        
        {/* Main container for text content */}
        <div className="item-info">
            <p className="item-name">{item.name}</p>
            
            {/* Flex container for the bottom row (controls and price) */}
            <div className="quantity-controls-price">
                <div className="quantity-control">
                    <button onClick={() => onUpdateQuantity(item.id, -1)} title="Decrease quantity">
                        <BsDash />
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => onUpdateQuantity(item.id, 1)} title="Increase quantity">
                        <BsPlus />
                    </button>
                </div>

                <span className="item-price">
                    ${(item.price * item.quantity).toFixed(2)}
                </span>
            </div>
        </div>
    </div>
);

export default OrderDetailsItem;