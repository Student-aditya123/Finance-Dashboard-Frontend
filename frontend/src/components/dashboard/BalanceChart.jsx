import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';

// Sample data for balance over time
const data = [
    { date: 'Jan', balance: 4000 },
    { date: 'Feb', balance: 3000 },
    { date: 'Mar', balance: 5000 },
    { date: 'Apr', balance: 4500 },
    { date: 'May', balance: 6000 },
    { date: 'Jun', balance: 5500 },
];

// Custom Tooltip Component
const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gray-700 backdrop-blur-md rounded-lg p-3 shadow-lg border border-blue-700"
            >
                <p className="text-sm font-medium text-gray-700">{`Date: ${label}`}</p>
                <p className="text-sm text-blue-600">{`Balance: $${payload[0].value}`}</p>
            </motion.div>
        );
    }
    return null;
};

const BalanceChart = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-800 backdrop-blur-lg rounded-2xl p-6  shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-gray-700"
        >
            <div className="flex items-center mb-4 space-y-2">
                <TrendingUp className="w-6 h-6 text-blue-800 mr-2" />
                <h2 className="text-xl font-bold text-blue-800">Balance Over Time</h2>
            </div>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <defs>
                        <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="date" stroke="#6B7280" />
                    <YAxis stroke="#6B7280" />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                        type="monotone"
                        dataKey="balance"
                        stroke="url(#balanceGradient)"
                        strokeWidth={3}
                        dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, stroke: '#3B82F6', strokeWidth: 2, fill: '#FFFFFF' }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </motion.div>
    );
};

export default BalanceChart;