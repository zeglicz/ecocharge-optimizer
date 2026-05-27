import { jest } from '@jest/globals';
import { getCurrentHalfHour, getDateRange } from './date.ts';

describe('date utils', () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  describe('getDateRange test suite', () => {
    it('should return UTC range from 00:30 to days-later 00:00', () => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date('2026-05-27T12:34:56.000Z'));

      const range = getDateRange(3);

      expect(range.from).toBe('2026-05-27T00:30:00.000Z');
      expect(range.to).toBe('2026-05-30T00:00:00.000Z');
    });
  });

  describe('getCurrentHalfHour test suite', () => {
    it('should round to next full hour when minutes < 30', () => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date('2026-05-27T10:12:00.000Z'));

      const value = getCurrentHalfHour();

      expect(value.toISOString()).toBe('2026-05-27T11:00:00.000Z');
    });

    it('should round to next half hour when minutes >= 30', () => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date('2026-05-27T10:45:00.000Z'));

      const value = getCurrentHalfHour();

      expect(value.toISOString()).toBe('2026-05-27T11:30:00.000Z');
    });
  });
});
