import React from 'react';
import { BsX, BsPrinter } from 'react-icons/bs'; // Make sure BsX is imported

const ReceiptModal = ({ order, onClose }) => {
    if (!order) return null;

    const handlePrint = () => window.print();

    // ... (logic for items, subtotal, etc. is correct from previous responses) ...
    const items = order.items || [];
    const subtotal = order.subtotal || 0;
    const tax = order.tax || 0;
    const total = order.total || 0;

    return (
        <div className="modal-overlay receipt-modal">
            <div className="modal-content">
                {/* --- THIS IS THE CORRECTED BUTTON --- */}
                <button className="modal-close-btn" onClick={onClose} title="Close">
                    <BsX />
                </button>
                {/* ------------------------------------- */}
                
                <div className="receipt-printable-area">
                    <div className="modal-header">
                        <h3>Transaction Receipt</h3>
                    </div>
                    
                    <div className="receipt-header">
                        <h3>Kopag Restaurant</h3>
                        <p>Thank you for your purchase!</p>
                    </div>

                    <dl className="receipt-details-grid">
                        <dt>ID:</dt><dd>{order.transaction_uid || order.id}</dd>
                        <dt>Date:</dt><dd>{new Date(order.created_at).toLocaleString()}</dd>
                        <dt>Customer:</dt><dd>{order.customer_name}</dd>
                        <dt>Table:</dt><dd>{order.table_number}</dd>
                    </dl>
                    
                    <div className="receipt-items-list">
                        {items.map((item, index) => (
                            <div key={item.id || index} className="receipt-item">
                                <span className="name">{item.quantity}x {item.name}</span>
                                <span className="price">${((item.price || item.price_at_sale) * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                    </div>

                    <dl className="receipt-details-grid receipt-summary">
                        <dt>Subtotal</dt><dd>${subtotal.toFixed(2)}</dd>
                        <dt>Tax (10%)</dt><dd>${tax.toFixed(2)}</dd>
                        <dt style={{fontSize: '1.25rem', fontWeight: 700}}>Total</dt>
                        <dd style={{fontSize: '1.25rem', fontWeight: 700}}>${total.toFixed(2)}</dd>
                    </dl>
                </div>

                <div className="receipt-actions">
                    <button className="process-btn" onClick={handlePrint}>
                        <BsPrinter style={{ marginRight: '8px' }} /> Print Receipt
                    </button>
                    <button className="process-btn secondary" onClick={onClose}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReceiptModal;