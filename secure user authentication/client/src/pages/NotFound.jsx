import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/Button';

export default function NotFound() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass mx-auto max-w-lg p-12 text-center">
      <p className="text-6xl font-bold text-indigo-400">404</p>
      <h1 className="mt-4 text-2xl font-bold">Page not found</h1>
      <Link to="/" className="mt-8 inline-block"><Button>Go Home</Button></Link>
    </motion.div>
  );
}
