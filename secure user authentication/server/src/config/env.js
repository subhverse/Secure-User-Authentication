import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../../.env') });

const required = ['MONGO_URI', 'JWT_SECRET'];

export const validateEnv = () => {
  const missing = required.filter((key) => !process.env[key]?.trim());
  if (missing.length) {
    console.error('\n❌ Missing env:', missing.join(', '));
    console.error('   Copy server/.env.example → server/.env\n');
    process.exit(1);
  }
};
