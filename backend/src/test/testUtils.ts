import type { Interval } from '../types/index.ts';

// helper function to fast build tests intervals
export function makeInterval(
  from: string,
  to: string,
  mix: Array<{ fuel: string; perc: number }>,
): Interval {
  return { from, to, generationmix: mix };
}
