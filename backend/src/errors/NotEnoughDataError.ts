export class NotEnoughDataError extends Error {
  constructor(hours: number, availableIntervals: number) {
    super(
      `Not enough future data to calculate ${hours}h window. Required intervals: ${hours * 2}, available: ${availableIntervals}.`,
    );
    this.name = 'NotEnoughDataError';
  }
}
