import { validateEnv } from './config/env.js';
import app from './app.js';
import { connectDB } from './config/db.js';

validateEnv();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  const server = app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
    console.log(`   API health: http://localhost:${PORT}/api/health`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`\n❌ Port ${PORT} is already in use. Close the other app or change PORT in .env\n`);
    } else {
      console.error('Server error:', err.message);
    }
    process.exit(1);
  });
};

startServer();
