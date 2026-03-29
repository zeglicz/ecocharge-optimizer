import express from 'express';
import 'dotenv/config';

import generationRouter from './routes/generationRoutes.ts';

const app = express();

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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`backend running on port: ${PORT}`));
