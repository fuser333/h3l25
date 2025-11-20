import React from 'react';
import { motion } from 'framer-motion';

const variants = {
    primary: 'bg-coral text-white hover:bg-coral-dark',
    secondary: 'bg-forest text-white hover:bg-forest-secondary',
    outline: 'bg-transparent border-2 border-forest text-forest hover:bg-forest/10',
};

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`px-8 py-3.5 rounded-lg font-semibold transition-colors duration-200 ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </motion.button>
    );
};

export default Button;
