import { jest } from '@jest/globals';

process.env.CARBON_API_BASE_URL = 'https://api.example.test';

import axios from 'axios';

import { fetchGeneration } from './apiGeneration.ts';

describe('fetchGeneration test suite', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('should call external API with correct URL and return response data', async () => {
    const intervals = [
      {
        from: '2026-05-27T00:00Z',
        to: '2026-05-27T00:30Z',
        generationmix: [{ fuel: 'wind', perc: 50 }],
      },
    ];

    const getSpy = jest.spyOn(axios, 'get').mockResolvedValue({
      data: { data: intervals },
    } as never);

    const result = await fetchGeneration(
      '2026-05-27T00:30:00.000Z',
      '2026-05-30T00:00:00.000Z',
    );

    expect(getSpy).toHaveBeenCalledWith(
      'https://api.example.test/generation/2026-05-27T00:30:00.000Z/2026-05-30T00:00:00.000Z',
    );

    expect(result).toEqual(intervals);
  });
});
