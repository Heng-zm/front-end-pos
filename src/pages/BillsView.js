import React from 'react';

const BillsView = ({ liveOrders, onSettleBill }) => {
    const billsToSettle = (liveOrders || []).filter(order => order.status === 'Ready to Serve');
    return (<div className="view-container full-width"><main className="main-content"><div className="page-card"><div className="page-header"><h2>Settle Bills</h2></div><div className="bills-grid">{billsToSettle.length > 0 ? billsToSettle.map(bill => { const total = bill.items.reduce((s, i) => s + i.price * i.quantity, 0) * 1.10; return (<div key={bill.id} className="bill-card" onClick={() => onSettleBill(bill)}><h3>Table {bill.table_number}</h3><p className="bill-customer">{bill.customer_name}</p><div className="bill-card-footer"><p className="bill-amount">${total.toFixed(2)}</p><button className="settle-btn">Settle</button></div></div>)}) : <p>No bills are ready to be settled.</p>}</div></div></main></div>);
};
export default BillsView;