import app from './app.js';
import { connectDB } from './config/db.js';

const PORT = process.env.PORT || 5000;

if (!process.env.VERCEL) {
  connectDB()
  .then(() => {
    console.log('MongoDB Connected Successfully!');

    app.listen(PORT, () => {
      console.log(`Server running in development mode on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Database connection error:', err.message);
    process.exit(1);
  });
}

export default app;
