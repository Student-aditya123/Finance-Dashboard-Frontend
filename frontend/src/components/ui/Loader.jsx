import React from 'react';
import { motion } from 'framer-motion';
import { Loader } from 'lucide-react';

const Loader = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-50">
            <motion.div
                className="bg-linear-to-br from-white/20 to-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
                <Loader size={48} className="text-white drop-shadow-lg" />
            </motion.div>
        </div>
    );
};

export default Loader;