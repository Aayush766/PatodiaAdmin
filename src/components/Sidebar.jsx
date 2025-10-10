import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, MessageSquare, LogOut } from 'lucide-react';
import logo from '../assets/logo.png';

const Sidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('isAuthenticated');
        navigate('/login');
    };

    const navLinkClasses = ({ isActive }) =>
        `flex items-center px-4 py-2.5 rounded-md transition-colors duration-200 text-sm font-medium ${
            isActive ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
        }`;

    return (
        <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
            <div className="p-4 border-b border-slate-200 flex items-center gap-3">
                <img src={logo} alt="Logo" className="w-8 h-8" />
                <span className="text-xl font-bold text-slate-800">Patodia Exports</span>
            </div>
            <nav className="flex-1 p-4 space-y-2">
                <NavLink to="/" className={navLinkClasses} end><LayoutDashboard size={20} className="mr-3" /> Dashboard</NavLink>
                <NavLink to="/products" className={navLinkClasses}><ShoppingBag size={20} className="mr-3" /> Products</NavLink>
                <NavLink to="/messages" className={navLinkClasses}><MessageSquare size={20} className="mr-3" /> Messages</NavLink>
            </nav>
            <div className="p-4 border-t border-slate-200">
                <button onClick={handleLogout} className="flex items-center w-full px-4 py-2.5 text-left text-slate-600 rounded-md hover:bg-slate-100 text-sm font-medium">
                    <LogOut size={20} className="mr-3" /> Logout
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;