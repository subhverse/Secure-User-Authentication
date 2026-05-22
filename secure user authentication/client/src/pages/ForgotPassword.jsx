import { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      toast.success('Reset link sent (UI ready — add email API on backend later)');
      setSubmitting(false);
    }, 600);
  };

  return (
    <Card className="mx-auto max-w-md">
      <h1 className="text-3xl font-bold">Reset password</h1>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <Input label="Email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        <Button type="submit" className="w-full" disabled={submitting}>
          {submitting ? 'Sending...' : 'Send reset link'}
        </Button>
      </form>
      <p className="mt-4 text-center text-sm"><Link to="/login" className="text-indigo-300 hover:underline">Back to login</Link></p>
    </Card>
  );
}
