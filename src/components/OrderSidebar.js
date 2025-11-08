import React, { useMemo, useState, useEffect } from 'react';
import { BsCart3, BsX, BsChevronUp } from 'react-icons/bs';
import OrderDetailsItem from './OrderDetailsItem';
import LoadingSpinner from './LoadingSpinner';

const OrderSidebar = ({
    cart, onUpdateQuantity, customerName, setCustomerName, selectedTable,
    setSelectedTable, isSettlingBill, onPlaceOrder, onProceedToPayment, isProcessing
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 1024);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Swipe to close gesture
    const handleTouchStart = (e) => {
        setTouchStart(e.targetTouches[0].clientY);
    };

    const handleTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientY);
    };

    const handleTouchEnd = () => {
        if (touchStart - touchEnd < -50) { // Swipe down threshold
            setIsOpen(false);
        }
    };
    
    const { subtotal, tax, total } = useMemo(() => {
        const sub = (cart || []).reduce((s, i) => s + i.price * i.quantity, 0);
        return { subtotal: sub, tax: sub * 0.10, total: sub * 1.10 };
    }, [cart]);

    const cartItemCount = (cart || []).reduce((sum, item) => sum + item.quantity, 0);

    return (
        <>
            {/* Floating Cart Button (Mobile Only) */}
            {isMobile && !isOpen && (
                <button 
                    className="floating-cart-btn" 
                    onClick={() => setIsOpen(true)}
                    aria-label="Open cart"
                >
                    <BsCart3 />
                    {cartItemCount > 0 && (
                        <span className="cart-badge">{cartItemCount}</span>
                    )}
                    {total > 0 && (
                        <span className="cart-total">${total.toFixed(2)}</span>
                    )}
                </button>
            )}

            {/* Backdrop Overlay (Mobile Only) */}
            {isMobile && isOpen && (
                <div 
                    className="sidebar-overlay" 
                    onClick={() => setIsOpen(false)}
                    role="presentation"
                />
            )}

            {/* Order Sidebar */}
            <aside 
                className={`order-sidebar ${isMobile && isOpen ? 'open' : ''} ${isMobile && !isOpen ? 'closed' : ''}`}
                onTouchStart={isMobile ? handleTouchStart : undefined}
                onTouchMove={isMobile ? handleTouchMove : undefined}
                onTouchEnd={isMobile ? handleTouchEnd : undefined}
            >
            <div className="sidebar-header">
                <div className="sidebar-header-top">
                    <h3>{isSettlingBill ? 'Settle Bill' : 'New Order'}</h3>
                    {isMobile && (
                        <button 
                            className="sidebar-close-btn"
                            onClick={() => setIsOpen(false)}
                            aria-label="Close cart"
                        >
                            <BsChevronUp />
                        </button>
                    )}
                </div>
                <div className="customer-info">
                    <input 
                        type="text" 
                        placeholder="Customer Name *" 
                        value={customerName} 
                        onChange={e => setCustomerName(e.target.value)} 
                        disabled={isSettlingBill}
                        required
                        aria-label="Customer Name"
                        className={!customerName && cart.length > 0 ? 'input-warning' : ''}
                    />
                    <input 
                        type="number" 
                        placeholder="Table Number *" 
                        value={selectedTable} 
                        onChange={e => setSelectedTable(e.target.value)} 
                        disabled={isSettlingBill}
                        required
                        min="1"
                        aria-label="Table Number"
                        className={!selectedTable && cart.length > 0 ? 'input-warning' : ''}
                    />
                    {cart.length > 0 && (!customerName || !selectedTable) && (
                        <p className="validation-hint">* Please fill in all required fields</p>
                    )}
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
                        <div className="empty-state">
                            <div className="empty-state-icon"><BsCart3 /></div>
                            <h3>Cart is Empty</h3>
                            <p>Start adding items from the menu to create an order</p>
                        </div>
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
        </>
    );
};

export default OrderSidebar;
