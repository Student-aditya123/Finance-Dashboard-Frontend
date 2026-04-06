import { useState } from 'react';
import { Search, Moon, Sun, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar({collapsed}) {
    const [isDark, setIsDark] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);

    return (
        <motion.nav
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className={`sticky top-0 z-50 w-full ${collapsed ? 'md:pl-20' : 'md:pl-64'} transition-all duration-300 backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border-b border-white/20 dark:border-slate-700/20 shadow-lg ${
                 isDark ? 'dark' : ''
             }`}
        >
            <div className="w-full px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 gap-6">
                    {/* Page Title */}
                    <h1 className="text-xl font-bold bg-linear-to-r  from-blue-600 to-purple-600 bg-clip-text text-transparent whitespace-nowrap">
                        Finance Dashboard
                    </h1>

                    {/* Search Bar */}
                    <div className="hidden md:flex flex-1 max-w-md">
                        <div className="relative w-full">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="SearchTransactions..."
                                className="w-full h-10 pl-10  pr-4 rounded-xl bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl border border-white/20 dark:border-slate-700/20 focus:outline-none focus:ring-2  focus:ring-blue-500  whitespace-nowrap text-sm transition-all shadow-inner"
                            />
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center gap-3">
                        {/* Theme Toggle */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsDark(!isDark)}
                            className="p-2 rounded-lg bg-linear-to-br from-yellow-400/20 to-orange-400/20 dark:from-blue-500/20 dark:to-purple-500/20 hover:from-yellow-400/30 hover:to-orange-400/30 dark:hover:from-blue-500/30 dark:hover:to-purple-500/30 transition-all"
                        >
                            {isDark ? (
                                <Sun className="w-5 h-5 text-yellow-500" />
                            ) : (
                                <Moon className="w-5 h-5 text-slate-600" />
                            )}
                        </motion.button>

                        {/* User Avatar */}
                        <div className="relative">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                onClick={() => setShowUserMenu(!showUserMenu)}
                                className="w-10 h-10 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm hover:shadow-lg transition-shadow"
                            >
                                A
                            </motion.button>

                            {/* User Dropdown Menu */}
                            {showUserMenu && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="absolute right-0 mt-2 w-48 bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/20 p-3 space-y-2"
                                >
                                    <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700/50 text-sm text-gray-700 dark:text-gray-200 transition-colors">
                                        Profile
                                    </button>
                                    <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700/50 text-sm text-gray-700 dark:text-gray-200 transition-colors">
                                        Settings
                                    </button>
                                    <hr className="my-2 border-gray-200 dark:border-slate-700/30" />
                                    <button className="w-full flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-sm text-red-600 dark:text-red-400 transition-colors">
                                        <LogOut className="w-4 h-4" />
                                        Logout
                                    </button>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </motion.nav>
    );
}