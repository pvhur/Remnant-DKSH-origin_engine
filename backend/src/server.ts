import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { config } from './config/env.js';
import authRoutes from './routes/auth.routes.js';

const app: Express = express();

// Middleware
app.use(cors({
  origin: config.cors.origin,
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Routes
app.use('/api/auth', authRoutes);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal server error',
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

const PORT = config.port;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📝 Environment: ${config.nodeEnv}`);
});

