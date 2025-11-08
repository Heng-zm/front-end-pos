import React from 'react';
import { BsX } from 'react-icons/bs';

const OrderDetailModal = ({ order, onClose }) => {
    if (!order) return null;
    const items = order.items || [];
    const { subtotal, tax, total } = items.reduce((acc, item) => {
        const itemPrice = item.price || item.price_at_sale || 0;
        const itemTotal = itemPrice * item.quantity;
        acc.subtotal += itemTotal;
        acc.tax = acc.subtotal * 0.10;
        acc.total = acc.subtotal + acc.tax;
        return acc;
    }, { subtotal: 0, tax: 0, total: 0 });

    return (
        <div className="modal-overlay order-detail-modal"><div className="modal-content">
            <div className="modal-header"><button className="modal-close-btn" onClick={onClose} title="Close"><BsX /></button><h3>Order Details</h3></div>
            <div className="order-detail-header">
                <h4>{order.order_uid || order.transaction_uid}</h4>
                <p>Customer: {order.customer_name}</p><p>Table: {order.table_number}</p>
                <p>Date: {new Date(order.created_at).toLocaleString()}</p>
            </div>
            <div className="order-detail-items-container">{items.map((item, index) => { const itemPrice = item.price || item.price_at_sale; return (
                <div key={index} className="order-detail-item">
                    <div><div className="item-name">{item.name}</div><div className="item-details">{item.quantity} x ${itemPrice?.toFixed(2)}</div></div>
                    <div className="item-total">${(item.quantity * itemPrice).toFixed(2)}</div>
                </div>); })}
            </div>
            <div className="receipt-total" style={{marginTop: '16px'}}>
                <div className="summary-line"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                <div className="summary-line"><span>Tax (10%)</span><span>${tax.toFixed(2)}</span></div>
                <div className="summary-total"><span>Total</span><span>${total.toFixed(2)}</span></div>
            </div>
        </div></div>
    );
};
export default OrderDetailModal;