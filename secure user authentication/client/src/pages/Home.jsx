import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/Button';
import Card from '../components/Card';

const features = [
  { title: 'JWT Security', desc: 'Token-based authentication.' },
  { title: 'Role Access', desc: 'Admin and user protected routes.' },
  { title: 'Session Persistence', desc: 'Stay logged in after refresh.' },
];

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="space-y-12">
      <motion.section initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <h1 className="text-4xl font-bold md:text-6xl">
          Secure Authentication
          <span className="block bg-gradient-to-r from-indigo-300 to-purple-400 bg-clip-text text-transparent">
            Built for Modern Apps
          </span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-white/70">React + Express + MongoDB + JWT</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {isAuthenticated ? (
            <Link to="/dashboard"><Button>Go to Dashboard</Button></Link>
          ) : (
            <>
              <Link to="/register"><Button>Get Started</Button></Link>
              <Link to="/login"><Button variant="outline">Sign In</Button></Link>
            </>
          )}
        </div>
      </motion.section>
      <section className="grid gap-6 md:grid-cols-3">
        {features.map((f) => (
          <Card key={f.title}>
            <h3 className="text-lg font-semibold text-indigo-200">{f.title}</h3>
            <p className="mt-2 text-white/70">{f.desc}</p>
          </Card>
        ))}
      </section>
    </div>
  );
}
