import React from 'react';

// Skeleton loader for menu items
export const MenuItemSkeleton = () => (
    <div className="menu-item-card">
        <div className="skeleton" style={{ width: '100%', height: '150px', marginBottom: '12px' }} />
        <div className="skeleton skeleton-text" style={{ width: '80%', marginBottom: '8px' }} />
        <div className="skeleton skeleton-text short" style={{ marginBottom: '12px' }} />
        <div className="skeleton skeleton-text short" style={{ marginBottom: '12px' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'auto' }}>
            <div className="skeleton" style={{ width: '60px', height: '24px' }} />
            <div className="skeleton" style={{ width: '40px', height: '40px', borderRadius: '12px' }} />
        </div>
    </div>
);

// Skeleton loader for order cards
export const OrderCardSkeleton = () => (
    <div className="order-bill-card" style={{ minWidth: '250px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <div className="skeleton" style={{ width: '80px', height: '20px' }} />
            <div className="skeleton" style={{ width: '60px', height: '24px', borderRadius: '6px' }} />
        </div>
        <div className="skeleton skeleton-text" style={{ marginBottom: '16px' }} />
        <div className="skeleton" style={{ width: '70px', height: '24px' }} />
    </div>
);

// Skeleton loader for table rows
export const TableRowSkeleton = ({ columns = 5 }) => (
    <tr>
        {Array.from({ length: columns }).map((_, i) => (
            <td key={i}>
                <div className="skeleton skeleton-text" />
            </td>
        ))}
    </tr>
);

// Generic skeleton card
export const SkeletonCard = ({ height = '300px' }) => (
    <div className="skeleton skeleton-card" style={{ height }} />
);

export default MenuItemSkeleton;
