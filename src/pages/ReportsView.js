import React from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS, CategoryScale, LinearScale, PointElement,
    LineElement, BarElement, ArcElement, Title, Tooltip, Legend,
} from 'chart.js';

// Register all necessary Chart.js components to be used in the charts
ChartJS.register(
    CategoryScale, LinearScale, PointElement, LineElement,
    BarElement, ArcElement, Title, Tooltip, Legend
);

const ReportsView = ({ historyData, menuItems }) => {
    // Use || [] to prevent errors if the props are not yet loaded (undefined)
    const safeHistory = historyData || [];
    const safeMenu = menuItems || [];

    // --- 1. Data for Daily Sales Line Chart ---
    const salesByDate = safeHistory.reduce((acc, order) => {
        const date = new Date(order.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        acc[date] = (acc[date] || 0) + order.total;
        return acc;
    }, {});
    const salesChartLabels = Object.keys(salesByDate).sort((a,b) => new Date(a) - new Date(b));
    const dailySalesChartData = {
        labels: salesChartLabels,
        datasets: [{
            label: 'Daily Sales ($)',
            data: salesChartLabels.map(label => salesByDate[label]),
            fill: true,
            backgroundColor: 'rgba(0, 98, 255, 0.2)',
            borderColor: 'rgba(0, 98, 255, 1)',
            tension: 0.3,
        }]
    };

    // --- 2. Data for Top Selling Items Bar Chart ---
    const topSellingItems = [...safeMenu].sort((a, b) => b.sold - a.sold).slice(0, 5);
    const topItemsChartData = {
        labels: topSellingItems.map(item => item.name),
        datasets: [{
            label: 'Units Sold',
            data: topSellingItems.map(item => item.sold),
            backgroundColor: 'rgba(0, 98, 255, 0.7)',
            borderColor: 'rgba(0, 98, 255, 1)',
            borderWidth: 1,
        }]
    };

    // --- 3. Data for Revenue by Category Pie Chart ---
    const revenueByCategory = safeMenu.reduce((acc, item) => {
        const category = item.category_name || 'Uncategorized';
        const revenue = (item.sold || 0) * item.price;
        acc[category] = (acc[category] || 0) + revenue;
        return acc;
    }, {});
    const categoryRevenueChartData = {
        labels: Object.keys(revenueByCategory),
        datasets: [{
            label: 'Revenue',
            data: Object.values(revenueByCategory),
            backgroundColor: ['#0062FF', '#22C55E', '#F97316', '#EF4444', '#8B5CF6'],
            hoverOffset: 4
        }]
    };
    
    // --- Universal Chart Options (handles light/dark mode) ---
    const getChartOptions = (titleText, isBar = false) => ({
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: isBar ? 'y' : 'x',
        plugins: {
            title: { display: true, text: titleText, color: document.body.classList.contains('dark') ? '#f7fafc' : '#1a202c' },
            legend: { labels: { color: document.body.classList.contains('dark') ? '#f7fafc' : '#1a202c' } }
        },
        scales: {
            y: {
                ticks: { color: document.body.classList.contains('dark') ? '#a0aec0' : '#718096' },
                grid: { color: document.body.classList.contains('dark') ? '#4a5568' : '#e2e8f0' }
            },
            x: {
                ticks: { color: document.body.classList.contains('dark') ? '#a0aec0' : '#718096' },
                grid: { display: isBar } // Only show horizontal grid lines for bar chart
            }
        }
    });
    
    const pieChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: { display: true, text: 'Revenue by Category', color: document.body.classList.contains('dark') ? '#f7fafc' : '#1a202c' },
            legend: { position: 'top', labels: { color: document.body.classList.contains('dark') ? '#f7fafc' : '#1a202c' } }
        }
    };

    return (
        <div className="view-container full-width">
            <main className="main-content">
                <div className="page-card">
                    <div className="page-header"><h2>Reports</h2></div>
                    <div className="reports-grid">
                        <div className="chart-card">
                            <div className="chart-container">
                                <Line options={getChartOptions('Daily Sales Trend')} data={dailySalesChartData} />
                            </div>
                        </div>
                        <div className="chart-card">
                            <div className="chart-container">
                                <Bar options={getChartOptions('Top 5 Selling Items', true)} data={topItemsChartData} />
                            </div>
                        </div>
                        <div className="chart-card">
                            <div className="chart-container">
                                <Pie options={pieChartOptions} data={categoryRevenueChartData} />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ReportsView;