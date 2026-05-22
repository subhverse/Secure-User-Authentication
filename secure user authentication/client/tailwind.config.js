/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'app-gradient': 'linear-gradient(135deg, #0f0a1e 0%, #1a1033 40%, #2d1b69 100%)',
      },
      boxShadow: { glass: '0 8px 32px rgba(0, 0, 0, 0.37)' },
    },
  },
  plugins: [],
};
