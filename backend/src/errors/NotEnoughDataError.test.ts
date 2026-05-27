import { NotEnoughDataError } from './NotEnoughDataError.ts';

describe('NotEnoughDataError test suite', () => {
  it('should create error with correct message', () => {
    const err = new NotEnoughDataError(3, 4);

    expect(err).toBeInstanceOf(Error);
    expect(err.name).toBe('NotEnoughDataError');
    expect(err.message).toBe(
      'Not enough future data to calculate 3h window. Required intervals: 6, available: 4.',
    );
  });
});
