import React, { useState, useRef } from 'react';
import { BsSearch, BsChevronLeft, BsChevronRight, BsInboxes, BsClock } from 'react-icons/bs';

// Import all necessary child components
import OrderSidebar from '../components/OrderSidebar';
import MenuItemCard from '../components/MenuItemCard';
import LoadingSpinner from '../components/LoadingSpinner';

// A sub-component for the cards in the top "Open Orders" slider
const OrderBillCard = ({ order, onSettleBill }) => {
    // Calculate the total for this specific bill, including a 10% tax
    const total = (order.items || []).reduce((sum, item) => sum + (item.price * item.quantity), 0) * 1.10;
    
    return (
        <div className="order-bill-card" onClick={() => onSettleBill(order)}>
            <div className="order-bill-header">
                <h4>Table {order.table_number}</h4>
                <span className={`status-badge ${order.status === 'Waiting' ? 'status-waiting' : 'status-ready'}`}>{order.status}</span>
            </div>
            <p className="order-bill-customer">{order.customer_name}</p>
            <div className="order-bill-footer">
                <span className="order-bill-amount">${total.toFixed(2)}</span>
            </div>
        </div>
    );
};

// The main Dashboard component
const DashboardView = ({
    liveOrders, onSettleBill, menuItems, categories,
    cart, onUpdateQuantity, onAddToCart,
    customerName, setCustomerName, selectedTable, setSelectedTable,
    onPlaceOrder, isProcessing, isSettlingBill, onProceedToPayment,
    onNavigate
}) => {
    
    const [activeCategoryName, setActiveCategoryName] = useState('All Categories');
    const [searchTerm, setSearchTerm] = useState('');
    
    // Ref for the horizontally scrollable container
    const scrollContainerRef = useRef(null);

    const handleScroll = (scrollOffset) => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollLeft += scrollOffset;
        }
    };

    // Filter menu items based on the active category and search term
    const filteredMenuItems = (menuItems || []).filter(item =>
        (activeCategoryName === 'All Categories' || item.category_name === activeCategoryName) &&
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="view-container">
            <main className="main-content">
                <div className="dashboard-header">
                    <h1>Dashboard</h1>
                    <p>Welcome! Manage your orders and menu efficiently.</p>
                </div>

                <div className="open-orders-section">
                    <div className="order-list-header">
                        <h3>Open Orders</h3>
                        <a onClick={() => onNavigate('order-list')} className="see-all-link">See All</a>
                    </div>
                    
                    <div className="order-slider-container">
                        {(liveOrders || []).length > 0 && (
                            <button className="slider-nav-btn prev" onClick={() => handleScroll(-300)}><BsChevronLeft /></button>
                        )}
                        
                        <div className="order-cards-container" ref={scrollContainerRef}>
                            {(liveOrders || []).length > 0 ? (
                                (liveOrders || []).map(order => <OrderBillCard key={order.id} order={order} onSettleBill={onSettleBill} />)
                            ) : (
                                <div className="empty-state">
                                    <div className="empty-state-icon"><BsClock /></div>
                                    <h3>No Open Orders</h3>
                                    <p>All orders have been completed or there are no active orders</p>
                                </div>
                            )}
                        </div>

                        {(liveOrders || []).length > 0 && (
                             <button className="slider-nav-btn next" onClick={() => handleScroll(300)}><BsChevronRight /></button>
                        )}
                    </div>
                </div>
                
                <div className="menu-section">
                     <div className="menu-controls">
                        <div className="category-tabs">
                            <button className={activeCategoryName === 'All Categories' ? 'active category-tab-btn' : 'category-tab-btn'} onClick={() => setActiveCategoryName('All Categories')}>All Categories</button>
                            {(categories || []).map(cat => (
                                <button key={cat.id} className={activeCategoryName === cat.name ? 'active category-tab-btn' : 'category-tab-btn'} onClick={() => setActiveCategoryName(cat.name)}>
                                    {cat.name}
                                </button>
                            ))}
                        </div>
                        <div className="menu-search-bar">
                            <BsSearch color="var(--text-secondary)" />
                            <input type="text" placeholder="Search menu items..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                        </div>
                    </div>

                    <div className="menu-grid">
                        {filteredMenuItems.length > 0 ? (
                            filteredMenuItems.map(item => <MenuItemCard key={item.id} item={item} onAddToCart={onAddToCart} />)
                        ) : (
                            <div className="empty-state" style={{ gridColumn: '1 / -1' }}>
                                <div className="empty-state-icon"><BsInboxes /></div>
                                <h3>No Items Found</h3>
                                <p>Try adjusting your search or category filter</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <OrderSidebar
                cart={cart}
                onUpdateQuantity={onUpdateQuantity}
                customerName={customerName}
                setCustomerName={setCustomerName}
                selectedTable={selectedTable}
                setSelectedTable={setSelectedTable}
                isSettlingBill={isSettlingBill}
                onPlaceOrder={onPlaceOrder}
                onProceedToPayment={onProceedToPayment}
                isProcessing={isProcessing}
            />
        </div>
    );
};

export default DashboardView;