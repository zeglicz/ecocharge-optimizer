import { jest } from '@jest/globals';
import express from 'express';
import request from 'supertest';
import type {
  DateRange,
  Interval,
  OptimalChargingWindowResult,
} from '../types/index.ts';

const mockGetDateRange = jest.fn<() => DateRange>();
const mockFetchGeneration =
  jest.fn<(from: string, to: string) => Promise<Interval[]>>();
const mockGroupAndAverage = jest.fn<(intervals: Interval[]) => unknown[]>();
const mockFindOptimalChargingWindow =
  jest.fn<(hours: number) => Promise<OptimalChargingWindowResult>>();

jest.unstable_mockModule('../utils/date.ts', () => ({
  getDateRange: mockGetDateRange,
}));

jest.unstable_mockModule('../services/apiGeneration.ts', () => ({
  fetchGeneration: mockFetchGeneration,
}));

jest.unstable_mockModule('../services/generationAggregate.ts', () => ({
  groupAndAverage: mockGroupAndAverage,
}));

jest.unstable_mockModule(
  '../services/generationOptimalChargingWindow.ts',
  () => ({
    findOptimalChargingWindow: mockFindOptimalChargingWindow,
  }),
);

const { NotEnoughDataError } = await import('../errors/NotEnoughDataError.ts');
const { default: generationRouter } = await import('./generationRoutes.ts');

describe('generationRoutes test suite', () => {
  const app = express();
  app.use('/api/v1/generation', generationRouter);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /daily', () => {
    it('should return 200 with aggregated data', async () => {
      mockGetDateRange.mockReturnValue({
        from: '2026-05-27T00:00:00.000Z',
        to: '2026-05-30T00:00:00.000Z',
      });

      const intervals: Interval[] = [{ from: 'a', to: 'b', generationmix: [] }];
      const aggregated = [
        { date: '2026-05-27', sources: { wind: 50 }, cleanEnergyPercent: 50 },
      ];

      mockFetchGeneration.mockResolvedValue(intervals);
      mockGroupAndAverage.mockReturnValue(aggregated);

      const res = await request(app).get('/api/v1/generation/daily');

      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        status: 'success',
        data: aggregated,
      });
      expect(mockFetchGeneration).toHaveBeenCalledWith(
        '2026-05-27T00:00:00.000Z',
        '2026-05-30T00:00:00.000Z',
      );
      expect(mockGroupAndAverage).toHaveBeenCalledWith(intervals);
    });

    it('should return 500 when fetching fails', async () => {
      mockGetDateRange.mockReturnValue({
        from: '2026-05-27T00:00:00.000Z',
        to: '2026-05-30T00:00:00.000Z',
      });
      mockFetchGeneration.mockRejectedValue(new Error('network down'));

      const res = await request(app).get('/api/v1/generation/daily');

      expect(res.status).toBe(500);
      expect(res.body).toEqual({
        status: 'error',
        message: 'Failed to fetch generation data',
      });
    });
  });

  describe('GET /charging-window', () => {
    it('should return 400 for invalid hours query', async () => {
      const res = await request(app).get(
        '/api/v1/generation/charging-window?hours=0',
      );

      expect(res.status).toBe(400);
      expect(res.body).toEqual({
        status: 'fail',
        message: 'hours must be an integer between 1 and 6',
      });
    });

    it('should return 200 with optimal charging window', async () => {
      const payload: OptimalChargingWindowResult = {
        startDate: '2026-05-27',
        startTime: '01:00',
        endDate: '2026-05-27',
        endTime: '02:00',
        cleanEnergyPercent: 75,
      };

      mockFindOptimalChargingWindow.mockResolvedValue(payload);

      const res = await request(app).get(
        '/api/v1/generation/charging-window?hours=1',
      );

      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        status: 'success',
        data: payload,
      });
      expect(mockFindOptimalChargingWindow).toHaveBeenCalledWith(1);
    });

    it('should return 422 when not enough data', async () => {
      mockFindOptimalChargingWindow.mockRejectedValue(
        new NotEnoughDataError(2, 1),
      );

      const res = await request(app).get(
        '/api/v1/generation/charging-window?hours=2',
      );

      expect(res.status).toBe(422);
      expect(res.body).toEqual({
        status: 'fail',
        message:
          'Not enough future data to calculate 2h window. Required intervals: 4, available: 1.',
      });
    });

    it('should return 500 on unexpected error', async () => {
      mockFindOptimalChargingWindow.mockRejectedValue(new Error('unexpected'));

      const res = await request(app).get(
        '/api/v1/generation/charging-window?hours=2',
      );

      expect(res.status).toBe(500);
      expect(res.body).toEqual({
        status: 'error',
        message: 'Failed to calculate charging window',
      });
    });
  });
});
