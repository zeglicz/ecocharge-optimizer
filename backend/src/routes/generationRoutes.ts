import { Router } from 'express';

import { getDateRange } from '../utils/date.ts';
import { fetchGeneration } from '../services/apiGeneration.ts';
import { groupAndAverage } from '../services/generationAggregate.ts';
import { findOptimalChargingWindow } from '../services/generationOptimalChargingWindow.ts';

const router = Router();

router.get('/daily', async (_, res) => {
  try {
    const days = getDateRange(3);
    const intervals = await fetchGeneration(days.from, days.to);
    const data = groupAndAverage(intervals);

    res.status(200).json({
      status: 'success',
      data,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ status: 'error', message: 'Failed to fetch generation data' });
  }
});

router.get('/charging-window', async (req, res) => {
  const raw = req.query.hours;

  const hours = Number(raw);

  if (
    typeof raw !== 'string' ||
    !Number.isInteger(hours) ||
    hours < 1 ||
    hours > 6
  ) {
    return res.status(400).json({
      status: 'fail',
      message: 'hours must be an integer between 1 and 6',
    });
  }

  try {
    const data = await findOptimalChargingWindow(hours);

    res.status(200).json({ status: 'success', data });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to calculate charging window',
    });
  }
});

export default router;
