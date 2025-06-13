import React, { useState } from 'react';
import { BsSearch, BsEye } from 'react-icons/bs';
import ReceiptModal from '../components/ReceiptModal'; // Import the modal

const HistoryView = ({ historyData }) => {
    const [searchTerm, setSearchTerm] = useState('');
    
    // --- NEW STATE to manage the modal ---
    const [selectedTransaction, setSelectedTransaction] = useState(null);

    const safeHistoryData = historyData || [];

    const filteredHistory = safeHistoryData.filter(item => 
        item.transaction_uid?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.customer_name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleViewDetails = (transaction) => {
        setSelectedTransaction(transaction);
    };

    const handleCloseModal = () => {
        setSelectedTransaction(null);
    };

    return (
        <div className="view-container full-width">
            <main className="main-content">
                <div className="page-card">
                    <div className="page-header">
                        <h2>Transaction History</h2>
                        <div className="menu-search-bar">
                            <BsSearch />
                            <input type="text" placeholder="Search by ID or Customer..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                        </div>
                    </div>

                    <div className="table-responsive">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Transaction ID</th>
                                    <th>Date</th>
                                    <th>Customer</th>
                                    <th>Total</th>
                                    <th style={{ textAlign: 'right' }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredHistory.length > 0 ? (
                                    filteredHistory.map(item => (
                                        <tr key={item.id}>
                                            <td data-label="Transaction ID" className="order-id">{item.transaction_uid}</td>
                                            <td data-label="Date">{new Date(item.created_at).toLocaleString()}</td>
                                            <td data-label="Customer">{item.customer_name}</td>
                                            <td data-label="Total">${item.total.toFixed(2)}</td>
                                            <td data-label="Action">
                                                <div className="action-buttons">
                                                    {/* This button now calls the handler */}
                                                    <button className="action-btn edit" title="View Details" onClick={() => handleViewDetails(item)}>
                                                        <BsEye />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" style={{ textAlign: 'center', padding: '40px' }}>No transaction history found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            {/* Conditionally render the ReceiptModal when a transaction is selected */}
            {selectedTransaction && (
                <ReceiptModal
                    order={selectedTransaction}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
};

export default HistoryView;