import React from 'react';
import { motion } from 'framer-motion';
import { Inbox } from 'lucide-react';

const EmptyState = ({
    icon: Icon,
    title,
    description,
    actionButton,
    className = '',
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className={`flex flex-col items-center justify-center p-8 bg-linear-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 min-h-75 ${className}`}
        >
            {Icon && (
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.4, type: 'spring', stiffness: 200 }}
                    className="mb-4"
                >
                    <Icon className="w-16 h-16 text-gray-400" />
                </motion.div>
            )}
            <h2 className="text-2xl font-semibold text-gray-800 mb-2 text-center">
                {title}
            </h2>
            <p className="text-gray-600 text-center mb-6 max-w-md">
                {description}
            </p>
            {actionButton && (
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={actionButton.onClick}
                    className="px-6 py-3 bg-linear-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
                >
                    {actionButton.text}
                </motion.button>
            )}
        </motion.div>
    );
};

export default EmptyState;