import mongoose from 'mongoose';

let connectionPromise;

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/jaibaba';

export function connectDB() {
  if (mongoose.connection.readyState === 1) {
    return Promise.resolve(mongoose.connection);
  }

  if (!connectionPromise) {
    connectionPromise = mongoose.connect(MONGO_URI).catch((error) => {
      connectionPromise = null;
      throw error;
    });
  }

  return connectionPromise;
}
