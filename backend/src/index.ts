import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import generationRouter from './routes/generationRoutes.ts';

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN,
    methods: ['GET'],
  }),
);

app.use('/api/v1/generation', generationRouter);

app.use((req, res) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server`,
  });
});

app.use((err, res) => {
  console.error(err);
  res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

const PORT = process.env.PORT || 7650;
app.listen(PORT, () => console.log(`backend running on port: ${PORT}`));
