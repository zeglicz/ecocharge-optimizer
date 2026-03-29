import type { Interval } from '../types/index.ts';
import { CLEAN_SOURCES } from '../constants/energy.ts';

interface DayData {
  date: string;
  sources: Record<string, number>;
  cleanEnergyPercent: number;
}

export function groupAndAverage(intervals: Interval[]): DayData[] {
  // 1. Group the intervals by date
  const grouped: Record<string, Interval[]> = {};

  for (const interval of intervals) {
    const date = interval.from.slice(0, 10); // "2025-03-28T00:00Z" -> "2025-03-28"

    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push(interval);
  }

  // 2. Calculate the average for each date
  const result: DayData[] = [];

  for (const [date, dayIntervals] of Object.entries(grouped)) {
    const totals: Record<string, number> = {};

    for (const interval of dayIntervals) {
      for (const source of interval.generationmix) {
        totals[source.fuel] = (totals[source.fuel] ?? 0) + source.perc;
      }
    }

    const count = dayIntervals.length;
    const sources: Record<string, number> = {};

    for (const [fuel, total] of Object.entries(totals)) {
      sources[fuel] = parseFloat((total / count).toFixed(2));
    }

    const cleanEnergyPercent = parseFloat(
      CLEAN_SOURCES.reduce(
        (sum, fuel) => sum + (sources[fuel] ?? 0),
        0,
      ).toFixed(2),
    );

    result.push({ date, sources, cleanEnergyPercent });
  }

  return result.sort((a, b) => a.date.localeCompare(b.date));
}
