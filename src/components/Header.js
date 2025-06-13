import React from 'react';
import { BsGrid3X3Gap, BsListUl, BsGraphUp, BsReceipt, BsShieldLock, BsBell, BsPersonCircle, BsSun, BsMoon } from 'react-icons/bs';

const Header = ({ activeView, onNavigate, theme, onToggleTheme }) => {
    // This component now has a simplified structure, the notification logic would be added back here if needed.
    return (
        <header className="header">
            <div className="header-left">
                <div className="logo">
                    <img  src="https://images.deliveryhero.io/image/fd-kh/kh-logos/cm9fa-logo.jpg?width=200&height=200" alt="Kopag Logo" />
                    <h1>Little Duckling</h1>
                </div>
                <nav className="main-nav">
                    <button onClick={() => onNavigate('dashboard')} className={`nav-item ${activeView === 'dashboard' ? 'active' : ''}`}><BsGrid3X3Gap /> Dashboard</button>
                    <button onClick={() => onNavigate('order-list')} className={`nav-item ${activeView === 'order-list' ? 'active' : ''}`}><BsListUl /> Order List</button>
                    <button onClick={() => onNavigate('reports')} className={`nav-item ${activeView === 'reports' ? 'active' : ''}`}><BsGraphUp /> Reports</button>
                    <button onClick={() => onNavigate('history')} className={`nav-item ${activeView === 'history' ? 'active' : ''}`}><BsReceipt /> History</button>
                    <button onClick={() => onNavigate('admin')} className={`nav-item ${activeView === 'admin' ? 'active' : ''}`}><BsShieldLock /> Admin</button>
                </nav>
            </div>
            <div className="header-right">
                <button className="theme-toggle" onClick={onToggleTheme}>{theme === 'light' ? <BsMoon /> : <BsSun />}</button>
                <BsBell className="icon" />
                <BsPersonCircle className="icon" />
            </div>
        </header>
    );
};
export default Header;