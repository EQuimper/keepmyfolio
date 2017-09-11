// @noflow

import { getIfPercentNegative } from '../getIfPercentNegative';

describe('#getIfPercentNegative()', () => {
  it('should return true if the percent is negative', () => {
    expect(getIfPercentNegative('-0.22')).toBe(true);
  });

  it('should return false if the percent is positive', () => {
    expect(getIfPercentNegative('2.40')).toBe(false);
  });

  it('should return Percent value is required if no percent provided', () => {
    function call() {
      return getIfPercentNegative();
    }

    expect(call).toThrowError('Percent value is required');
  })
});
