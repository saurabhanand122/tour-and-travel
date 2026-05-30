import mongoose from 'mongoose';

let connectionPromise;

export function connectDB() {
  const mongoUri = process.env.MONGO_URI || (!process.env.VERCEL ? 'mongodb://127.0.0.1:27017/jaibaba' : '');

  if (!mongoUri) {
    throw new Error('MONGO_URI is not configured');
  }

  if (mongoose.connection.readyState === 1) {
    return Promise.resolve(mongoose.connection);
  }

  if (!connectionPromise) {
    connectionPromise = mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 5000 }).catch((error) => {
      connectionPromise = null;
      throw error;
    });
  }

  return connectionPromise;
}
