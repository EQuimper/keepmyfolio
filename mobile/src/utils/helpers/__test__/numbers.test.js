// @noflow

import { thousandSpace, toMoney, moneyThousand, isNumeric } from '../numbers';

describe('#thousandSpace()', () => {
  it('should return space between thousand', () => {
    expect(thousandSpace('10000')).toBe('10 000');
    expect(thousandSpace('100000')).toBe('100 000');
    expect(thousandSpace('100000000')).toBe('100 000 000');
    expect(thousandSpace('5675.87')).toBe('5 675.87');
    expect(thousandSpace(0)).toBe('0');
  });

  it('should return space between thousand also if this is a number who is provided', () => {
    expect(thousandSpace(99999)).toBe('99 999');
    expect(thousandSpace(11123899)).toBe('11 123 899');
  });

  it('should return an error if no value provided', () => {
    function call() {
      thousandSpace();
    }

    expect(call).toThrowError('Value is required');
  });
});

describe('#toMoney', () => {
  it('should return 2 number after the decimals', () => {
    expect(toMoney('3727.67')).toBe('3727.67');
    expect(toMoney('84727.6799')).toBe('84727.68');
    expect(toMoney('2138.899999')).toBe('2138.90');
    expect(toMoney(0)).toBe('0.00');
  });

  it('should return an error if value cannot be parse to a number', () => {
    function call() {
      toMoney('hello world');
    }

    expect(call).toThrowError('Cannot parse number');
  });

  it('should return an error if no value provided', () => {
    function call() {
      toMoney();
    }

    expect(call).toThrowError('Value is required');
  });
});

describe('#moneyThousand()', () => {
  it('should should return a string with number separated by thousand and max 2 number after decimals', () => {
    expect(moneyThousand('3727.67')).toBe('3 727.67');
    expect(moneyThousand('99727.6799')).toBe('99 727.68');
    expect(moneyThousand(0)).toBe('0.00');
  });

  it('should return an error if no value provided', () => {
    function call() {
      moneyThousand();
    }

    expect(call).toThrowError('Value is required');
  });
});

describe('#isNumeric()', () => {
  it('should throw error if value not provided', () => {
    function call() {
      isNumeric();
    }

    expect(call).toThrowError('isNumeric need a value to work');
  });

  it('should return true if value is a number', () => {
    expect(isNumeric(2)).toBe(true);
    expect(isNumeric(5677.54)).toBe(true);
    expect(isNumeric(9999)).toBe(true);
  });

  it('should return true if value is a string but can be parse to a number', () => {
    expect(isNumeric('2')).toBe(true);
    expect(isNumeric('5677.54')).toBe(true);
    expect(isNumeric('9999')).toBe(true);
  });

  it('should return false if value is a string but cannot be parse to a number', () => {
    expect(isNumeric('hello')).toBe(false);
    expect(isNumeric('wow')).toBe(false);
    expect(isNumeric('hahahah')).toBe(false);
  });

  it('should return false if value is something else than a string or number', () => {
    expect(isNumeric([1, 2])).toBe(false);
    expect(isNumeric({ name: 'hello' })).toBe(false);
  });
});
