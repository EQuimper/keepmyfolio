// @noflow

import { getPiePercent } from '../getPiePercent';

describe('#getPiePercent()', () => {
  const data = [
    {
      name: 'Neo',
      amount: '678.23'
    },
    {
      name: 'Ripple',
      amount: '34.57',
    },
    {
      name: 'Bitcoin',
      amount: '2003.40'
    },
    {
      name: 'Litecoin',
      amount: '455.55'
    }
  ]

  it('should return an array of obj<name, percent>', () => {
    expect(getPiePercent(data, '3171.75')).toEqual([
      {
        name: 'Neo',
        percent: '21.38'
      },
      {
        name: 'Ripple',
        percent: '1.09',
      },
      {
        name: 'Bitcoin',
        percent: '63.16'
      },
      {
        name: 'Litecoin',
        percent: '14.36'
      }
    ])
  });
});
