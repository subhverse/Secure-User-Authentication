import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-app-gradient text-white">
      <Navbar />
      <motion.main
        className="container mx-auto px-4 py-8 md:py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Outlet />
      </motion.main>
    </div>
  );
}
