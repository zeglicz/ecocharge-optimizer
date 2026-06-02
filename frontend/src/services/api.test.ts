import axios from 'axios';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fetchChargingWindow, fetchGeneration } from './api';

vi.mock('axios');

const mockedAxios = vi.mocked(axios, true);

describe('api service test suite', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('fetchGeneration', () => {
    it('should return generation data from daily endpoint', async () => {
      const payload = {
        status: 'success',
        data: [
          {
            date: '2026-05-27',
            sources: { wind: 40 },
            cleanEnergyPercent: 40,
          },
        ],
      };

      mockedAxios.get.mockResolvedValue({ data: payload });

      const result = await fetchGeneration();

      expect(result).toEqual(payload);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        `${import.meta.env.VITE_API_URL}/api/v1/generation/daily`,
      );
    });
  });

  describe('fetchChargingWindow', () => {
    it('should return charging window data for provided hours', async () => {
      const payload = {
        status: 'success',
        data: {
          startDate: '2026-05-27',
          startTime: '01:00',
          endDate: '2026-05-27',
          endTime: '03:00',
          cleanEnergyPercent: 75,
        },
      };

      mockedAxios.get.mockResolvedValue({ data: payload });

      const result = await fetchChargingWindow(2);

      expect(result).toEqual(payload);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        `${import.meta.env.VITE_API_URL}/api/v1/generation/charging-window?hours=2`,
      );
    });
  });
});
