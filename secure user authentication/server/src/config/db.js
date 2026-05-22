import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 8000,
    });
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('\n❌ MongoDB failed:', error.message);
    console.error('   Start MongoDB service or fix MONGO_URI in server/.env\n');
    process.exit(1);
  }
};
