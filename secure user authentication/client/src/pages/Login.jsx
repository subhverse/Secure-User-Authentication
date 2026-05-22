import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { login as loginApi } from '../services/api';
import { useAuth } from '../hooks/useAuth';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [submitting, setSubmitting] = useState(false);
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const { data } = await loginApi(form);
      loginUser(data);
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || 'Login failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="mx-auto max-w-md">
      <h1 className="text-3xl font-bold">Sign in</h1>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <Input label="Email" type="email" required value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <Input label="Password" type="password" required value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <Button type="submit" className="w-full" disabled={submitting}>
          {submitting ? 'Signing in...' : 'Login'}
        </Button>
      </form>
      <p className="mt-4 text-center text-sm text-white/70">
        <Link to="/forgot-password" className="text-indigo-300 hover:underline">Forgot password?</Link>
        {' · '}
        <Link to="/register" className="text-indigo-300 hover:underline">Register</Link>
      </p>
    </Card>
  );
}
