import { Router } from 'express';

import { getDateRange } from '../utils/date.ts';
import { fetchGeneration } from '../services/apiGeneration.ts';
import { groupAndAverage } from '../services/generationAggregate.ts';

const router = Router();

router.get('/daily', async (_, res) => {
  try {
    const days = getDateRange(3);
    const intervals = await fetchGeneration(days.from, days.to);
    const dailyData = groupAndAverage(intervals);

    res.status(200).json({
      status: 'success',
      dailyData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch generation data' });
  }
});

export default router;
