import React, { useState, useMemo, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';

// Import all necessary components and page views
import Header from './components/Header';
import PaymentModal from './components/PaymentModal';
import ReceiptModal from './components/ReceiptModal';
import LoadingFullscreen from './components/LoadingFullscreen';
import DashboardView from './pages/DashboardView';
import HistoryView from './pages/HistoryView';
import BillsView from './pages/BillsView';
import OrderListView from './pages/OrderListView';
import ReportsView from './pages/ReportsView';
import AdminView from './pages/AdminView';

// Import the main stylesheet
import './App.css';

const API_URL = 'https://back-end-pos.onrender.com/api';
const WS_URL = 'ws:http://localhost:5000';

function App() {
    // --- STATE MANAGEMENT ---

    // UI State
    const [theme, setTheme] = useState('light');
    const [activeView, setActiveView] = useState('dashboard');
    const [isLoading, setIsLoading] = useState(true);
    const [isProcessing, setIsProcessing] = useState(false);
    
    // Transaction & Order State
    const [cart, setCart] = useState([]);
    const [transactionState, setTransactionState] = useState('ordering'); // 'ordering', 'settling-bill', 'payment', 'receipt'
    const [customerName, setCustomerName] = useState('');
    const [selectedTable, setSelectedTable] = useState('');
    const [lastCompletedOrder, setLastCompletedOrder] = useState(null);
    const [paymentDetails, setPaymentDetails] = useState(null);

    // Data State (loaded from API)
    const [menuItems, setMenuItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [historyData, setHistoryData] = useState([]);
    const [liveOrders, setLiveOrders] = useState([]);
    const [notifications, setNotifications] = useState([]);
    
    // --- DATA FETCHING & REAL-TIME LOGIC ---
    
    const fetchData = async (isInitial = false) => {
        try {
            const responses = await Promise.all([
                fetch(`${API_URL}/menu`), fetch(`${API_URL}/history`),
                fetch(`${API_URL}/live-orders`), fetch(`${API_URL}/categories`)
            ]);
            if (responses.some(res => !res.ok)) throw new Error('A network response was not ok');
            const [menu, history, orders, cats] = await Promise.all(responses.map(res => res.json()));
            setMenuItems(menu.data); setHistoryData(history.data); setLiveOrders(orders.data); setCategories(cats.data);
            if (isInitial) toast.success("System is online and connected!");
        } catch (error) { toast.error("Could not load data from the server."); } 
        finally { setIsLoading(false); }
    };
    
    useEffect(() => { setIsLoading(true); fetchData(true); }, []);
    
    useEffect(() => {
        const ws = new WebSocket(WS_URL);
        ws.onopen = () => console.log('WebSocket connected.');
        ws.onmessage = (event) => { const msg = JSON.parse(event.data); toast.success(msg.message || 'System data updated!', { icon: '🔄' }); fetchData(); };
        ws.onclose = () => console.log('WebSocket disconnected.');
        ws.onerror = () => toast.error('Real-time connection failed.');
        return () => ws.close();
    }, []);

    useEffect(() => { document.body.className = theme; }, [theme]);
    
    // --- COMPUTED VALUES ---
    
    const { subtotal, tax, total } = useMemo(() => {
        const sub = (cart || []).reduce((s, i) => s + i.price * i.quantity, 0);
        const t = sub * 0.10; return { subtotal: sub, tax: t, total: sub + t };
    }, [cart]);

    // --- EVENT HANDLERS ---
    
    const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');
    const addNotification = (type, message) => setNotifications(p => [{ id: Date.now(), type, message, date: new Date(), read: false }, ...p]);
    const handleNotificationsRead = () => setNotifications(p => p.map(n => ({ ...n, read: true })));
    const resetOrderState = () => { setCart([]); setCustomerName(''); setSelectedTable(''); setLastCompletedOrder(null); setTransactionState('ordering'); setPaymentDetails(null); };

    const handleAddToCart = (item) => {
        if (transactionState === 'settling-bill') { toast.error("Cannot add items while settling a bill."); return; }
        if (item.available === 0) { toast.error(`${item.name} is out of stock!`); return; }
        setMenuItems(p => p.map(i => i.id === item.id ? { ...i, available: i.available - 1 } : i));
        setCart(p => { const e = p.find(i => i.id === item.id); if (e) return p.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i); return [...p, { ...item, quantity: 1 }]; });
    };

    const handleUpdateQuantity = (itemId, change) => {
        if (transactionState === 'settling-bill') return;
        setMenuItems(prev => prev.map(i => i.id === itemId ? { ...i, available: i.available - change } : i));
        setCart(prev => prev.map(i => i.id === itemId ? { ...i, quantity: Math.max(0, i.quantity + change) } : i).filter(i => i.quantity > 0));
    };

    const handleNewOrder = async () => {
        if (!customerName || !selectedTable) { toast.error("Customer Name and Table are required."); return; }
        setIsProcessing(true);
        try {
            await fetch(`${API_URL}/orders`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ customerName, tableNumber: selectedTable, items: cart }) });
            addNotification('new-order', `New order placed for Table ${selectedTable}.`);
            resetOrderState();
        } catch (err) { toast.error(err.message); } 
        finally { setIsProcessing(false); }
    };
    
    const handleSettleBill = (order) => { if (!order || !order.items) return; setActiveView('dashboard'); setCart(order.items); setCustomerName(order.customer_name); setSelectedTable(order.table_number); setTransactionState('settling-bill'); toast.info(`Loaded Bill for Table ${order.table_number}.`); };
    const handleProceedToPayment = () => { setPaymentDetails({ subtotal, shipping: tax, total }); setTransactionState('payment'); };

    const handleConfirmPayment = async () => {
        setIsProcessing(true);
        const orderToSettle = liveOrders.find(o => parseInt(o.table_number) === parseInt(selectedTable));
        if (!orderToSettle) { toast.error("Could not find open order."); setIsProcessing(false); return; }
        try {
            const res = await fetch(`${API_URL}/transactions`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ cart, customerName, tableNumber: selectedTable, subtotal, tax, total, orderId: orderToSettle.id }) });
            const result = await res.json();
            if (!res.ok) throw new Error(result.error);
            const completedOrder = { ...result.data, items: cart, ...paymentDetails };
            setLastCompletedOrder(completedOrder);
            setTransactionState('receipt');
        } catch (err) { toast.error(`Payment failed: ${err.message}`); } 
        finally { setIsProcessing(false); }
    };
    
    const handleUpdateOrderStatus = async (orderId, status) => { await fetch(`${API_URL}/orders/${orderId}/status`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) }); };
    
    const handleSaveMenuItem = async (data, id) => {
        setIsProcessing(true);
        const url = id ? `${API_URL}/menu/${id}` : `${API_URL}/menu`;
        const method = id ? 'PUT' : 'POST';
        try {
            const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
            if (!res.ok) throw new Error((await res.json()).error);
            return true;
        } catch(err) { toast.error(err.message); return false; } 
        finally { setIsProcessing(false); }
    };

    const handleDeleteMenuItem = async (id) => { setIsProcessing(true); try { await fetch(`${API_URL}/menu/${id}`, { method: 'DELETE' }); } catch(err) { toast.error(err.message); } finally { setIsProcessing(false); }};
    
    const renderView = () => {
        if (isLoading) return <LoadingFullscreen />;
        switch (activeView) {
            case 'order-list': return <OrderListView liveOrders={liveOrders} onUpdateStatus={handleUpdateOrderStatus} />;
            case 'history': return <HistoryView historyData={historyData} />;
            case 'bills': return <BillsView liveOrders={liveOrders} onSettleBill={handleSettleBill} />;
            case 'reports': return <ReportsView historyData={historyData} menuItems={menuItems} />;
            case 'admin': return <AdminView menuItems={menuItems} categories={categories} onSaveItem={handleSaveMenuItem} onDeleteItem={handleDeleteMenuItem} isProcessing={isProcessing} />;
            default:
                return (
                    <DashboardView
                        menuItems={menuItems} categories={categories} cart={cart}
                        onUpdateQuantity={handleUpdateQuantity} onAddToCart={handleAddToCart}
                        customerName={customerName} setCustomerName={setCustomerName}
                        selectedTable={selectedTable} setSelectedTable={setSelectedTable}
                        onPlaceOrder={handleNewOrder} isProcessing={isProcessing}
                        isSettlingBill={transactionState === 'settling-bill'}
                        onProceedToPayment={handleProceedToPayment}
                        onNavigate={setActiveView}
                    />
                );
        }
    };

    return (
        <>
            <Toaster position="top-center" reverseOrder={false} toastOptions={{ className: 'toast-notification' }} />
            <div className={`pos-system ${theme}`}>
                <div className="app-layout">
                    <Header activeView={activeView} onNavigate={setActiveView} theme={theme} onToggleTheme={toggleTheme} notifications={notifications} onNotificationsRead={handleNotificationsRead} />
                    {renderView()}
                </div>
                {transactionState === 'payment' && paymentDetails && (
                    <PaymentModal
                        subtotal={paymentDetails.subtotal}
                        shipping={paymentDetails.shipping}
                        total={paymentDetails.total}
                        onCancel={resetOrderState}
                        onConfirm={handleConfirmPayment}
                        isProcessing={isProcessing}
                    />
                )}
                {transactionState === 'receipt' && ( <ReceiptModal order={lastCompletedOrder} onClose={resetOrderState} /> )}
            </div>
        </>
    );
}

export default App;
