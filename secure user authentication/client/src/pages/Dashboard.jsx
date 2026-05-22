import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';
import { getAdminStats } from '../services/api';
import Card from '../components/Card';
import Button from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Dashboard() {
  const { user, isAdmin } = useAuth();
  const [stats, setStats] = useState(null);
  const [loadingStats, setLoadingStats] = useState(false);

  useEffect(() => {
    if (!isAdmin) return;
    (async () => {
      setLoadingStats(true);
      try {
        const { data } = await getAdminStats();
        setStats(data);
      } catch {
        toast.error('Could not load admin stats');
      } finally {
        setLoadingStats(false);
      }
    })();
  }, [isAdmin]);

  return (
    <div className="space-y-6">
      <Card>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="mt-2 text-white/70">Welcome, <span className="text-indigo-300">{user?.name}</span></p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl bg-white/5 p-4"><p className="text-sm text-white/60">Email</p><p>{user?.email}</p></div>
          <div className="rounded-xl bg-white/5 p-4"><p className="text-sm text-white/60">Role</p><p className="capitalize">{user?.role}</p></div>
        </div>
        <Link to="/profile" className="mt-6 inline-block"><Button variant="outline">Edit Profile</Button></Link>
      </Card>
      {isAdmin && (
        <Card>
          <h2 className="text-xl font-semibold text-purple-200">Admin Panel</h2>
          {loadingStats ? <LoadingSpinner /> : stats && (
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl bg-purple-500/20 p-4"><p className="text-sm text-white/60">Total users</p><p className="text-2xl font-bold">{stats.totalUsers}</p></div>
              <div className="rounded-xl bg-indigo-500/20 p-4"><p className="text-sm text-white/60">Admins</p><p className="text-2xl font-bold">{stats.admins}</p></div>
              <div className="rounded-xl bg-white/10 p-4"><p className="text-sm text-white/60">Users</p><p className="text-2xl font-bold">{stats.regularUsers}</p></div>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
