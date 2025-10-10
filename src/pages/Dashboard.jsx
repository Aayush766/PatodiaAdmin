import React, { useState, useEffect } from 'react';
import { getProducts, getMessages } from '../api';
import { ShoppingBag, MessageSquare, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const StatCard = ({ icon, title, value, linkTo }) => (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
        <div className="flex justify-between items-start">
            <div>
                <p className="text-sm font-medium text-slate-500">{title}</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">{value}</p>
            </div>
            <div className="bg-indigo-100 text-indigo-600 p-3 rounded-full">
                {icon}
            </div>
        </div>
        <Link to={linkTo} className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 mt-4 inline-flex items-center group">
            View All <ArrowRight size={16} className="ml-1 transform group-hover:translate-x-1 transition-transform" />
        </Link>
    </div>
);

const Dashboard = () => {
    const [productCount, setProductCount] = useState(0);
    const [messageCount, setMessageCount] = useState(0);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const productResponse = await getProducts();
                setProductCount(productResponse.data.length);

                const messageResponse = await getMessages();
                setMessageCount(messageResponse.data.length);
            } catch (error) {
                console.error("Failed to fetch dashboard stats", error);
            }
        };

        fetchStats();
    }, []);

    return (
        <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-6">Dashboard</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard 
                    icon={<ShoppingBag />} 
                    title="Total Products" 
                    value={productCount} 
                    linkTo="/products" 
                />
                <StatCard 
                    icon={<MessageSquare />} 
                    title="Contact Messages" 
                    value={messageCount} 
                    linkTo="/messages" 
                />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 mt-8">
                <h2 className="text-xl font-semibold text-slate-800">Welcome back!</h2>
                <p className="text-slate-600 mt-2">
                    Here's a quick overview of your website's activity. Use the sidebar to manage products and view messages.
                </p>
            </div>
        </div>
    );
};

export default Dashboard;