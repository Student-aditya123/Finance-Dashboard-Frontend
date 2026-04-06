import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';
import Navbar from './Navbar.jsx';

export default function Layout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(true); 
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    return (
        <div className="flex h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
            {/* Sidebar */}
            <motion.div
                initial={{ x: -300 }}
                animate={{ x: sidebarOpen ? 0 : -300 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className={`hidden md:block fixed md:relative h-screen ${
                    collapsed ? 'w-20' : 'w-64'} transition-all duration-300 z-40`}
            >
                <Sidebar 
                    collapsed={collapsed} 
                    setCollapsed={setCollapsed} 
                    closesidebar={() => setSidebarOpen(false)}
               />
            </motion.div>

            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 md:hidden z-30"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <motion.div
                initial={{ x: -256 }}
                animate={{ x: sidebarOpen ? 0 : -256 }}
                transition={{ duration: 0.3 }}
                className="fixed md:hidden h-screen w-64 z-40"
            >
                <Sidebar 
                    collapsed={collapsed} 
                    setCollapsed={setCollapsed} 
                    closesidebar={() => setSidebarOpen(false)}
                />
            </motion.div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                <Navbar collapsed={collapsed} />

                {/* Content Area */}
                <motion.main
                    key = {location.pathname}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-1 overflow-y-auto px-4 md:px-8 py-6 md:py-8 scroll-smooth"
                >
                    
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </motion.main>
            </div>
        </div>
    );
}