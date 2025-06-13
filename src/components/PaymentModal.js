import React, { useState } from 'react';
import LoadingSpinner from './LoadingSpinner';

// --- MOCK DATA FOR PAYMENT METHODS ---
// In a real app, this would come from a configuration file or an API
const paymentMethods = [
    {
        id: 'alipayplus',
        name: 'Alipay+',
        logo: 'https://i.imgur.com/22S2T5k.png', // Main Alipay+ logo URL
        isGroup: true,
        discount: 'Instant Discount',
        partners: [ // URLs for the small partner logos
            'https://i.imgur.com/w9mJcM5.png', // GCash
            'https://i.imgur.com/G55n1ka.png', // Alipay
            'https://i.imgur.com/zW32nNa.png', // AlipayHK
            // ... add more partner logos here
        ]
    },
    { id: 'gcash', name: 'GCash', logo: 'https://i.imgur.com/w9mJcM5.png', description: 'Alipay+ Partner' },
    { id: 'alipay', name: '支付宝', logo: 'https://i.imgur.com/G55n1ka.png', description: 'Alipay+ Partner' },
    { id: 'alipayhk', name: 'AlipayHK', logo: 'https://i.imgur.com/zW32nNa.png', description: 'Alipay+ Partner' }
];

const PaymentModal = ({ total, onConfirm, onCancel, isProcessing }) => {
    const [selectedMethod, setSelectedMethod] = useState('alipayplus'); // Default to Alipay+

    // We'll use hardcoded values for subtotal and shipping for this example UI
    const subtotal = total / 1.1; // Assume 10% was tax, which we'll call shipping
    const shipping = total - subtotal;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h3>Payment Method</h3>
                </div>
                
                <div className="payment-methods-list">
                    {paymentMethods.map((method) => (
                        <div
                            key={method.id}
                            className={`payment-method-option ${selectedMethod === method.id ? 'selected' : ''}`}
                            onClick={() => setSelectedMethod(method.id)}
                        >
                            <img 
                                src={method.logo} 
                                alt={method.name} 
                                className={`payment-method-logo ${method.id === 'alipayplus' ? 'alipay-logo' : ''}`}
                            />
                            <div className="payment-method-details">
                                <p>
                                    {method.name}
                                    {method.discount && <span className="discount-tag">{method.discount}</span>}
                                </p>
                                {method.description && <span>{method.description}</span>}
                                {method.isGroup && (
                                    <div className="partner-logos">
                                        {method.partners.map((p, i) => <img key={i} src={p} alt="partner" />)}
                                        <span>...</span>
                                    </div>
                                )}
                            </div>
                            <div className="custom-radio">
                                {selectedMethod === method.id && <div className="custom-radio-check"></div>}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="payment-summary">
                    <div className="payment-summary-line">
                        <span>Subtotal</span>
                        <span>USD {subtotal.toFixed(2)}</span>
                    </div>
                    <div className="payment-summary-line">
                        <span>Express Shipping</span>
                        <span>USD {shipping.toFixed(2)}</span>
                    </div>
                     <div className="payment-summary-line">
                        <span>Total</span>
                        <span>USD {total.toFixed(2)}</span>
                    </div>
                </div>

                <div className="payment-footer">
                    <div className="total-to-pay">
                        <p>Total to pay</p>
                        <span>USD {total.toFixed(2)}</span>
                    </div>
                    <button className="process-btn checkout-btn" onClick={onConfirm} disabled={isProcessing}>
                        {isProcessing ? <LoadingSpinner /> : 'Checkout'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentModal;