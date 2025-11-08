import React, { useState } from 'react';
import { BsGrid3X3Gap, BsListUl, BsGraphUp, BsReceipt, BsShieldLock, BsBell, BsPersonCircle, BsSun, BsMoon, BsList, BsX } from 'react-icons/bs';

const Header = ({ activeView, onNavigate, theme, onToggleTheme, notifications = [] }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const unreadCount = notifications.filter(n => !n.read).length;

    const handleNavigation = (view) => {
        onNavigate(view);
        setMobileMenuOpen(false); // Close menu after navigation
    };

    return (
        <header className="header">
            <div className="header-left">
                <div className="logo">
                    <img  src="https://images.deliveryhero.io/image/fd-kh/kh-logos/cm9fa-logo.jpg?width=200&height=200" alt="Kopag Logo" />
                    <h1>Little Duckling</h1>
                </div>
                {/* Desktop Navigation */}
                <nav className="main-nav" role="navigation" aria-label="Main navigation">
                    <button onClick={() => onNavigate('dashboard')} className={`nav-item ${activeView === 'dashboard' ? 'active' : ''}`} aria-current={activeView === 'dashboard' ? 'page' : undefined} aria-label="Dashboard"><BsGrid3X3Gap aria-hidden="true" /> Dashboard</button>
                    <button onClick={() => onNavigate('order-list')} className={`nav-item ${activeView === 'order-list' ? 'active' : ''}`} aria-current={activeView === 'order-list' ? 'page' : undefined} aria-label="Order List"><BsListUl aria-hidden="true" /> Order List</button>
                    <button onClick={() => onNavigate('reports')} className={`nav-item ${activeView === 'reports' ? 'active' : ''}`} aria-current={activeView === 'reports' ? 'page' : undefined} aria-label="Reports"><BsGraphUp aria-hidden="true" /> Reports</button>
                    <button onClick={() => onNavigate('history')} className={`nav-item ${activeView === 'history' ? 'active' : ''}`} aria-current={activeView === 'history' ? 'page' : undefined} aria-label="History"><BsReceipt aria-hidden="true" /> History</button>
                    <button onClick={() => onNavigate('admin')} className={`nav-item ${activeView === 'admin' ? 'active' : ''}`} aria-current={activeView === 'admin' ? 'page' : undefined} aria-label="Admin"><BsShieldLock aria-hidden="true" /> Admin</button>
                </nav>
            </div>
            <div className="header-right">
                <button 
                    className="theme-toggle" 
                    onClick={onToggleTheme}
                    aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                    title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                >
                    {theme === 'light' ? <BsMoon aria-hidden="true" /> : <BsSun aria-hidden="true" />}
                </button>
                <button 
                    className={`header-icon-btn ${activeView === 'notifications' ? 'active' : ''}`}
                    onClick={() => onNavigate('notifications')}
                    aria-label="Notifications" 
                    title="Notifications"
                >
                    <BsBell aria-hidden="true" />
                    {unreadCount > 0 && (
                        <span className="header-badge">{unreadCount}</span>
                    )}
                </button>
                <button className="header-icon-btn" aria-label="User profile" title="Profile">
                    <BsPersonCircle aria-hidden="true" />
                </button>
                {/* Mobile Menu Toggle */}
                <button 
                    className="mobile-menu-toggle" 
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={mobileMenuOpen}
                >
                    {mobileMenuOpen ? <BsX aria-hidden="true" /> : <BsList aria-hidden="true" />}
                </button>
            </div>
            
            {/* Mobile Navigation Menu */}
            {mobileMenuOpen && (
                <div className="mobile-nav-overlay" onClick={() => setMobileMenuOpen(false)} role="presentation">
                    <nav className="mobile-nav" onClick={(e) => e.stopPropagation()} role="navigation" aria-label="Mobile navigation">
                        <button onClick={() => handleNavigation('dashboard')} className={`mobile-nav-item ${activeView === 'dashboard' ? 'active' : ''}`} aria-current={activeView === 'dashboard' ? 'page' : undefined}>
                            <BsGrid3X3Gap aria-hidden="true" /> <span>Dashboard</span>
                        </button>
                        <button onClick={() => handleNavigation('order-list')} className={`mobile-nav-item ${activeView === 'order-list' ? 'active' : ''}`} aria-current={activeView === 'order-list' ? 'page' : undefined}>
                            <BsListUl aria-hidden="true" /> <span>Order List</span>
                        </button>
                        <button onClick={() => handleNavigation('reports')} className={`mobile-nav-item ${activeView === 'reports' ? 'active' : ''}`} aria-current={activeView === 'reports' ? 'page' : undefined}>
                            <BsGraphUp aria-hidden="true" /> <span>Reports</span>
                        </button>
                        <button onClick={() => handleNavigation('history')} className={`mobile-nav-item ${activeView === 'history' ? 'active' : ''}`} aria-current={activeView === 'history' ? 'page' : undefined}>
                            <BsReceipt aria-hidden="true" /> <span>History</span>
                        </button>
                        <button onClick={() => handleNavigation('admin')} className={`mobile-nav-item ${activeView === 'admin' ? 'active' : ''}`} aria-current={activeView === 'admin' ? 'page' : undefined}>
                            <BsShieldLock aria-hidden="true" /> <span>Admin</span>
                        </button>
                    </nav>
                </div>
            )}
        </header>
    );
};
export default Header;
