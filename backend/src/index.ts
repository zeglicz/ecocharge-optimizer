import express from 'express';
import 'dotenv/config';

import generationRouter from './routes/generationRoutes.ts';

const app = express();

app.use('/api/v1/generation', generationRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`backend running on port: ${PORT}`));
