import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import Button from './Button';

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass mx-4 mt-4 flex flex-wrap items-center justify-between gap-4 px-6 py-4"
    >
      <Link to="/" className="text-xl font-bold text-white">
        Secure<span className="text-indigo-300">Auth</span>
      </Link>
      <div className="flex flex-wrap items-center gap-3 md:gap-5">
        {user ? (
          <>
            <Link to="/dashboard" className="text-white/90 hover:text-white">Dashboard</Link>
            <Link to="/profile" className="text-white/90 hover:text-white">Profile</Link>
            {isAdmin && (
              <span className="rounded-full bg-purple-500/30 px-3 py-1 text-xs text-purple-200">Admin</span>
            )}
            <Button onClick={handleLogout} className="!py-2 !px-4 text-sm">Logout</Button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-white/90 hover:text-white">Login</Link>
            <Link to="/register"><Button className="!py-2 !px-4 text-sm">Register</Button></Link>
          </>
        )}
      </div>
    </motion.nav>
  );
}
