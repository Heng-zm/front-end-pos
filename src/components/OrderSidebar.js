import React, { useMemo } from 'react';
import OrderDetailsItem from './OrderDetailsItem';
import LoadingSpinner from './LoadingSpinner';

const OrderSidebar = ({
    cart, onUpdateQuantity, customerName, setCustomerName, selectedTable,
    setSelectedTable, isSettlingBill, onPlaceOrder, onProceedToPayment, isProcessing
}) => {
    
    const { subtotal, tax, total } = useMemo(() => {
        const sub = (cart || []).reduce((s, i) => s + i.price * i.quantity, 0);
        return { subtotal: sub, tax: sub * 0.10, total: sub * 1.10 };
    }, [cart]);

    return (
        <aside className="order-sidebar">
            <div className="sidebar-header">
                <h3>{isSettlingBill ? 'Settle Bill' : 'New Order'}</h3>
                <div className="customer-info">
                    <input type="text" placeholder="Customer Name" value={customerName} onChange={e => setCustomerName(e.target.value)} disabled={isSettlingBill} />
                    <input type="number" placeholder="Table Number" value={selectedTable} onChange={e => setSelectedTable(e.target.value)} disabled={isSettlingBill} />
                </div>
            </div>
            
            <div className="sidebar-scrollable-content">
                <div className="order-details">
                    <h3>Order Details</h3>
                    {(cart || []).length > 0 ? (
                        <div className="order-items-container">
                            {(cart || []).map(item => (
                                <OrderDetailsItem key={item.id} item={item} onUpdateQuantity={onUpdateQuantity} />
                            ))}
                        </div>
                    ) : (
                        <p className="empty-cart-message">Add items from the menu.</p>
                    )}
                </div>
            </div>

            {(cart || []).length > 0 && (
                <div className="sidebar-footer">
                     <div className="order-summary">
                        <div className="summary-line"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                        <div className="summary-line"><span>Tax (10%)</span><span>${tax.toFixed(2)}</span></div>
                     </div>
                     <div className="summary-total">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                    <div className="action-button-container">
                        {isSettlingBill ? (
                            <button className="process-btn" onClick={onProceedToPayment}>Proceed to Payment</button>
                        ) : (
                            <button className="process-btn" onClick={onPlaceOrder} disabled={isProcessing || !customerName || !selectedTable}>
                                {isProcessing ? <LoadingSpinner /> : 'Place Order'}
                            </button>
                        )}
                    </div>
                </div>
            )}
        </aside>
    );
};

export default OrderSidebar;