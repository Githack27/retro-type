import express from 'express';
import cors from 'cors';
import cookieSession from 'cookie-session';
import dotenv from 'dotenv';
import apiRoutes from './routes/index.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure session cookies that clear when browser is closed (no maxAge/expires)
app.use(
  cookieSession({
    name: 'session',
    keys: [process.env.SESSION_SECRET || 'retro_type_default_secret_key_98765'],
    maxAge: undefined, // Browser session cookie (clears on browser close!)
    httpOnly: true,
    secure: false, // Set to true if HTTPS in production
    sameSite: 'lax',
  })
);

// CORS setup (for direct API access if needed; Next.js rewrite also handles proxying)
app.use(
  cors({
    origin: ['http://localhost:3000', 'https://retro-type-three.vercel.app'],
    credentials: true,
  })
);

// Mount API routes
app.use('/api', apiRoutes);

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error occurred:', err.message || err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
  });
});

export default app;
