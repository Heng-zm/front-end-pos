import React from 'react';
import { BsCheckCircle } from 'react-icons/bs';

const OrderListView = ({ liveOrders, onUpdateStatus }) => {
    
    const getStatusClass = (status) => {
        switch (status) {
            case 'Ready to Serve': return 'status-ready';
            case 'Waiting': return 'status-waiting';
            default: return '';
        }
    };

    return (
        <div className="view-container full-width">
            <main className="main-content">
                <div className="page-card">
                    <div className="page-header">
                        <h2>Live Orders</h2>
                    </div>

                    <div className="table-responsive">
                        {/* --- THIS IS THE CORRECTED TABLE STRUCTURE --- */}
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Customer</th>
                                    <th>Table</th>
                                    <th>Status</th>
                                    <th>Created At</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(liveOrders || []).length > 0 ? (
                                    (liveOrders || []).map(order => (
                                        <tr key={order.id}>
                                            <td data-label="Order ID" className="order-id">{order.order_uid}</td>
                                            <td data-label="Customer">{order.customer_name}</td>
                                            <td data-label="Table">{order.table_number}</td>
                                            <td data-label="Status">
                                                <span className={`status-badge ${getStatusClass(order.status)}`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td data-label="Created">{new Date(order.created_at).toLocaleTimeString()}</td>
                                            <td data-label="Action">
                                                <div className="action-buttons">
                                                    {order.status === 'Waiting' && (
                                                        <button className="action-btn ready" onClick={() => onUpdateStatus(order.id, 'Ready to Serve')} title="Mark as Ready">
                                                            <BsCheckCircle />
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" style={{ textAlign: 'center', padding: '40px' }}>
                                            There are no live orders at the moment.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default OrderListView;