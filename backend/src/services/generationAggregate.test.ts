import { groupAndAverage } from './generationAggregate.ts';
import type { Interval } from '../types/index.ts';
import { makeInterval } from '../test/testUtils.ts';

describe('groupAndAverage test suite', () => {
  it('should group intervals by day and calculate average source shares', () => {
    const intervals: Interval[] = [
      makeInterval('2026-05-27T00:00Z', '2026-05-27T00:30Z', [
        { fuel: 'wind', perc: 40 },
        { fuel: 'gas', perc: 60 },
      ]),
      makeInterval('2026-05-27T00:30Z', '2026-05-27T01:00Z', [
        { fuel: 'wind', perc: 20 },
        { fuel: 'gas', perc: 80 },
      ]),
      makeInterval('2026-05-28T00:00Z', '2026-05-28T00:30Z', [
        { fuel: 'solar', perc: 10 },
        { fuel: 'gas', perc: 90 },
      ]),
    ];

    const result = groupAndAverage(intervals);

    expect(result).toEqual([
      {
        date: '2026-05-27',
        sources: {
          wind: 30,
          gas: 70,
        },
        cleanEnergyPercent: 30,
      },
      {
        date: '2026-05-28',
        sources: {
          solar: 10,
          gas: 90,
        },
        cleanEnergyPercent: 10,
      },
    ]);
  });

  it('should round values to 2 decimals', () => {
    const intervals: Interval[] = [
      makeInterval('2026-05-27T00:00Z', '2026-05-27T00:30Z', [
        { fuel: 'wind', perc: 33.333 },
      ]),
      makeInterval('2026-05-27T00:30Z', '2026-05-27T01:00Z', [
        { fuel: 'wind', perc: 66.666 },
      ]),
    ];

    const [day] = groupAndAverage(intervals);

    expect(day.sources.wind).toBe(50);
    expect(day.cleanEnergyPercent).toBe(50);
  });

  it('should return days sorted ascending by date', () => {
    const intervals: Interval[] = [
      makeInterval('2026-05-29T00:00Z', '2026-05-29T00:30Z', [
        { fuel: 'wind', perc: 50 },
      ]),
      makeInterval('2026-05-27T00:00Z', '2026-05-27T00:30Z', [
        { fuel: 'wind', perc: 50 },
      ]),
    ];

    const result = groupAndAverage(intervals);

    expect(result.map((d) => d.date)).toEqual(['2026-05-27', '2026-05-29']);
  });
});
