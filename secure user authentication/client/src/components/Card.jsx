import { motion } from 'framer-motion';

export default function Card({ children, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`glass p-6 md:p-8 ${className}`}
    >
      {children}
    </motion.div>
  );
}
