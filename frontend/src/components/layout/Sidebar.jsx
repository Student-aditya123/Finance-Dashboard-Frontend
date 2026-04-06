import { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, LayoutDashboard, CreditCard, ChevronRight, BarChart3, WatchIcon, Brain, Settings, LogOutIcon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Bar } from 'recharts';

export default function Sidebar({collapsed, setCollapsed}) {
    
    const location = useLocation();

    const menuItems = [
        { name: 'Dashboard', path: '/', icon: BarChart3, label: 'Dashboard' },
        { name: 'Transactions', path: '/transactions', icon: CreditCard, label: 'Transactions' },
        { name: 'Insights', path: '/insights', icon: Brain, label: 'Insights' },
        { name: 'settings', path: '/settings', icon: Settings, label: 'Settings' },
        { name: 'logout', path: '/logout', icon: LogOutIcon, label: 'Logout' },
    ];

    const isActive = (path) => location.pathname.startsWith(path);

    return (
        <div className="h-screen">
            {/* Toggle Button */}
            <button
               onClick={() => setCollapsed(!collapsed)}
               className="absolute -right-3 top-6 bg-slate-800 border border-white/20 p-1 rounded-full"
            >
               <ChevronRight 
                 size={16}
                 className={`text-white transition-transform ${collapsed ? 'rotate-180' : ''}`}
               />
            </button>

            
            <motion.div
                initial={{ x: -300 }}
                // animate={{ x: isOpen ? 0 : -300 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className={`fixed left-0 top-0 h-screen z-50 ${collapsed ? 'w-20' : 'w-64'}  transition-all duration-300 bg-linear-to-b from-slate-900/90 via-slate-800/80 to-slate-900/90 backdrop-blur-3xl border-r border-white/10 shadow-2xl`}
             >   
                {/* Logo Section */}
                <div className="flex items-center justify-center h-20 border-b border-white/10">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-3 px-4"
                    >
                        <div className="w-10 h-10 rounded-lg bg-linear-to-br from-blue-400 to-purple-600 flex items-center justify-center shadow-lg">
                            <span className="text-white font-bold text-lg">$</span>
                        </div>
                        <span className={`${collapsed ? 'hidden' : 'block'}`}>Finance <br />Dashboard</span>
                    </motion.div>
                </div>


                {/* Menu Items */}
                <nav className="p-5 mt-6 flex flex-col gap-3">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.path);

                        return (
                            <Link key={item.path} to={item.path}>
                                <motion.div
                                    whileHover={{ x: 6, scale: 1.02, boxShadow: '0 10px 15px rgba(59,130,246,0.3)' }}
                                    className={`flex items-center justify-start gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 cursor-pointer group ${
                                        collapsed
                                            ? 'justify-center px-2 items-center'
                                            : ''
                                    }`}
                                >
                                    <Icon
                                        size={20}
                                        className={`transition-colors ${
                                            active ? 'text-blue-400' : 'text-white/60 group-hover:text-white/80'
                                        }`}
                                    />
                                    <span
                                        className={`transition-all duration-300 ${
                                            collapsed ? 'hidden' : 'block'
                                        }`}
                                    >
                                        {item.name}
                                    </span>
                                    {active && (
                                        <motion.div
                                            layoutId="activeIndicator"
                                            className="ml-auto"
                                        >
                                            <ChevronRight size={18} className="text-blue-400" />
                                        </motion.div>
                                    )}
                                </motion.div>
                            </Link>
                        );
                    })}
                </nav>
                {/* Premium Footer/Profile Glassmorphism Block */}
                     <div className="absolute bottom-14 left-4 right-2 md:left-2 md:right-2">
                            <motion.div
                                whileHover={{ y: -2, boxShadow: '0 20px 30px rgba(148,163,184,0.25)' }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                                className="flex items-center gap-3 rounded-2xl p-3 md:p-4 bg-white/12 dark:bg-slate-900/40 border border-white/15 dark:border-slate-700/50"
                            >
                                {/* avatar */}
                                <div className="relative">
                                    <div className="h-10 w-10 rounded-full p-0.5 bg-linear-to-br from-cyan-400 to-violet-500">
                                        <div className="h-full w-full rounded-full  overflow-hidden  bg-slate-800 dark:bg-slate-900 flex items-center justify-center">
                                            <img
                                                src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=120&q=80"
                                                alt="avatar"
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                    </div>
                                    {/* <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white/80 dark:border-slate-900 bg-emerald-400 shadow-[0_0_0_3px_rgba(16,185,129,0.25)]" /> */}
                                </div>
                                 
                                 {/* name and profile */}
                                <div className={`${collapsed ? 'hidden' : 'block'} min-w-0 flex-1`}>
                                    <p className="text-white text-sm md:text-base font-medium leading-tight">Aditya Singh</p>
                                    <summary className="flex items-center gap-1 text-xs text-white/60 cursor-pointer select-none">
                                        Admin
                                    </summary>
                                </div>
                            </motion.div>
                     </div>
            </motion.div>

            
        </div>
    );
}