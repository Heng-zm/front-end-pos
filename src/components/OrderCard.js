import React from 'react';

const OrderCard = ({ order }) => {
    const getStatusClass = (status) => {
        switch (status) {
            case 'Canceled': return 'status-canceled';
            case 'Ready to Serve': return 'status-ready';
            case 'Waiting': return 'status-waiting';
            case 'Completed': return 'status-completed';
            default: return '';
        }
    };

    return (
        <div className="order-card">
            <div className="order-card-header">
                <h4>{order.name}</h4>
                <span>{order.id}</span>
            </div>
            <div className="order-card-body">
                <p>{order.items} items • Table {order.table}</p>
                <span className={`status-badge ${getStatusClass(order.status)}`}>{order.status}</span>
            </div>
        </div>
    );
};

export default OrderCard;