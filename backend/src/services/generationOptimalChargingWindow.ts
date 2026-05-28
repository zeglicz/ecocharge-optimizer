import type { Interval, OptimalChargingWindowResult } from '../types/index.ts';
import { CLEAN_SOURCES } from '../constants/energy.ts';

import { getCurrentHalfHour, getDateRange } from '../utils/date.ts';
import { fetchGeneration } from './apiGeneration.ts';
import { NotEnoughDataError } from '../errors/NotEnoughDataError.ts';

function calcCleanPercent(intervals: Interval[]): number {
  const avg =
    intervals.reduce((sum, interval) => {
      const clean = interval.generationmix
        .filter((s) => CLEAN_SOURCES.includes(s.fuel))
        .reduce((s, source) => s + source.perc, 0);
      return sum + clean;
    }, 0) / intervals.length;

  return parseFloat(avg.toFixed(2));
}

export async function findOptimalChargingWindow(
  hours: number,
): Promise<OptimalChargingWindowResult> {
  const days = getDateRange(3);
  const allIntervals = await fetchGeneration(days.from, days.to);
  const currentHalfHour = getCurrentHalfHour();
  const futureIntervals = allIntervals.filter(
    (interval) => new Date(interval.from) >= currentHalfHour,
  );

  const windowSize = hours * 2;

  if (futureIntervals.length < windowSize) {
    throw new NotEnoughDataError(hours, futureIntervals.length);
  }

  let bestScore = -1;
  let bestStart = 0;

  for (let i = 0; i <= futureIntervals.length - windowSize; i++) {
    const window = futureIntervals.slice(i, i + windowSize);
    const score = calcCleanPercent(window);

    if (score > bestScore) {
      bestScore = score;
      bestStart = i;
    }
  }

  const firstInterval = futureIntervals[bestStart];
  const lastInterval = futureIntervals[bestStart + windowSize - 1];

  return {
    startDate: firstInterval.from.slice(0, 10),
    startTime: firstInterval.from.slice(11, 16),
    endDate: lastInterval.to.slice(0, 10),
    endTime: lastInterval.to.slice(11, 16),
    cleanEnergyPercent: bestScore,
  };
}
