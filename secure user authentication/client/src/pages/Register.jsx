import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { register as registerApi } from '../services/api';
import { useAuth } from '../hooks/useAuth';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [submitting, setSubmitting] = useState(false);
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      toast.error('Passwords do not match');
      return;
    }
    setSubmitting(true);
    try {
      const { data } = await registerApi({ name: form.name, email: form.email, password: form.password });
      loginUser(data);
      toast.success('Account created!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || err.response?.data?.errors?.[0]?.msg || 'Registration failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="mx-auto max-w-md">
      <h1 className="text-3xl font-bold">Create account</h1>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <Input label="Full name" required value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <Input label="Email" type="email" required value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <Input label="Password" type="password" required minLength={6} value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <Input label="Confirm password" type="password" required value={form.confirm}
          onChange={(e) => setForm({ ...form, confirm: e.target.value })} />
        <Button type="submit" className="w-full" disabled={submitting}>
          {submitting ? 'Creating...' : 'Register'}
        </Button>
      </form>
      <p className="mt-4 text-center text-sm text-white/70">
        <Link to="/login" className="text-indigo-300 hover:underline">Sign in</Link>
      </p>
    </Card>
  );
}
