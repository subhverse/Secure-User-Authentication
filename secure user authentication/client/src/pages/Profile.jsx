import { useState } from 'react';
import toast from 'react-hot-toast';
import { updateProfile } from '../services/api';
import { useAuth } from '../hooks/useAuth';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';

export default function Profile() {
  const { user, updateUser } = useAuth();
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '' });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const { data } = await updateProfile(form);
      updateUser(data);
      toast.success('Profile updated!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="mx-auto max-w-lg">
      <h1 className="text-3xl font-bold">Profile</h1>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <Input label="Full name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <Input label="Email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <div className="rounded-xl bg-white/5 p-4"><p className="text-sm text-white/60">Role</p><p className="capitalize">{user?.role}</p></div>
        <Button type="submit" disabled={submitting}>{submitting ? 'Saving...' : 'Save changes'}</Button>
      </form>
    </Card>
  );
}
