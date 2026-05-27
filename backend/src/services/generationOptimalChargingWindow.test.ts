import { jest } from '@jest/globals';

import type { Interval } from '../types/index.ts';
import { makeInterval } from '../test/testUtils.ts';

const mockGetCurrentHalfHour = jest.fn();
const mockGetDateRange = jest.fn();
const mockFetchGeneration =
  jest.fn<(from: string, to: string) => Promise<Interval[]>>();

jest.unstable_mockModule('../utils/date.ts', () => ({
  getCurrentHalfHour: mockGetCurrentHalfHour,
  getDateRange: mockGetDateRange,
}));

jest.unstable_mockModule('./apiGeneration.ts', () => ({
  fetchGeneration: mockFetchGeneration,
}));

const { findOptimalChargingWindow } =
  await import('./generationOptimalChargingWindow.ts');

const { NotEnoughDataError } = await import('../errors/NotEnoughDataError.ts');

describe('findOptimalChargingWindow test suite', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should select future window with highest average clean energy', async () => {
    mockGetCurrentHalfHour.mockReturnValue(new Date('2026-05-27T01:00:00Z'));

    mockGetDateRange.mockReturnValue({
      from: '2026-05-27T00:00:00.000Z',
      to: '2026-05-30T00:00:00.000Z',
    });

    const mockedIntervals: Interval[] = [
      makeInterval('2026-05-27T00:00Z', '2026-05-27T00:30Z', [
        { fuel: 'wind', perc: 10 },
        { fuel: 'gas', perc: 90 },
      ]),

      makeInterval('2026-05-27T01:00Z', '2026-05-27T01:30Z', [
        { fuel: 'wind', perc: 80 },
        { fuel: 'gas', perc: 20 },
      ]),

      makeInterval('2026-05-27T01:30Z', '2026-05-27T02:00Z', [
        { fuel: 'solar', perc: 70 },
        { fuel: 'gas', perc: 30 },
      ]),

      makeInterval('2026-05-27T02:00Z', '2026-05-27T02:30Z', [
        { fuel: 'wind', perc: 20 },
        { fuel: 'gas', perc: 80 },
      ]),
    ];

    mockFetchGeneration.mockResolvedValue(mockedIntervals);

    const result = await findOptimalChargingWindow(1);

    expect(result).toEqual({
      startDate: '2026-05-27',
      startTime: '01:00',
      endDate: '2026-05-27',
      endTime: '02:00',
      cleanEnergyPercent: 75,
    });
  });

  it('should throw NotEnoughDataError when not enough future slots exist', async () => {
    mockGetCurrentHalfHour.mockReturnValue(new Date('2026-05-27T01:00:00Z'));

    mockGetDateRange.mockReturnValue({
      from: '2026-05-27T00:00:00.000Z',
      to: '2026-05-30T00:00:00.000Z',
    });

    mockFetchGeneration.mockResolvedValue([
      makeInterval('2026-05-27T00:00Z', '2026-05-27T00:30Z', [
        { fuel: 'wind', perc: 50 },
      ]),

      makeInterval('2026-05-27T01:00Z', '2026-05-27T01:30Z', [
        { fuel: 'wind', perc: 50 },
      ]),
    ]);

    await expect(findOptimalChargingWindow(2)).rejects.toBeInstanceOf(
      NotEnoughDataError,
    );
  });
});
