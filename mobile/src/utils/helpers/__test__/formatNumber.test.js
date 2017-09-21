// @noflow

import { thousandSpace, toMoney, moneyThousand } from '../formatNumber';

describe('#thousandSpace()', () => {
  it('should return space between thousand', () => {
    expect(thousandSpace('10000')).toBe('10 000');
    expect(thousandSpace('100000')).toBe('100 000');
    expect(thousandSpace('100000000')).toBe('100 000 000');
    expect(thousandSpace('5675.87')).toBe('5 675.87');
  });

  it('should return space between thousand also if this is a number who is provided', () => {
    expect(thousandSpace(99999)).toBe('99 999');
    expect(thousandSpace(11123899)).toBe('11 123 899');
  })

  it('should return an error if no value provided', () => {
    function call() {
      thousandSpace();
    }

    expect(call).toThrowError('Value is required');
  })
})

describe('#toMoney', () => {
  it('should return 2 number after the decimals', () => {
    expect(toMoney('3727.67')).toBe('3727.67');
    expect(toMoney('84727.6799')).toBe('84727.68');
  });

  it('should return an error if no value provided', () => {
    function call() {
      toMoney();
    }

    expect(call).toThrowError('Value is required');
  })
});

describe('#moneyThousand()', () => {
  it('should should return a string with number separated by thousand and max 2 number after decimals', () => {
    expect(moneyThousand('3727.67')).toBe('3 727.67');
    expect(moneyThousand('99727.6799')).toBe('99 727.68');
  });

  it('should return an error if no value provided', () => {
    function call() {
      moneyThousand();
    }

    expect(call).toThrowError('Value is required');
  })
})
