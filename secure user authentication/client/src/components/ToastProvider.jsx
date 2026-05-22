import { Toaster } from 'react-hot-toast';

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: '#1a1033',
          color: '#fff',
          border: '1px solid rgba(255,255,255,0.2)',
        },
      }}
    />
  );
}
