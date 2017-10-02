// @noflow

import { fromJS } from 'immutable';

import { getPiePercent } from '../getPiePercent';

describe('#getPiePercent()', () => {
  const data = [
    {
      name: 'Neo',
      amount: '678.23',
    },
    {
      name: 'Ripple',
      amount: '34.57',
    },
    {
      name: 'Bitcoin',
      amount: '2003.40',
    },
    {
      name: 'Litecoin',
      amount: '455.55',
    },
  ];

  it('should return an error if no total provided', () => {
    function call() {
      getPiePercent(fromJS(data));
    }

    expect(call).toThrowError('Total value is required');
  })

  it('should return an error if provided an array not a Immutable.List', () => {
    function call() {
      getPiePercent(data, '3171.75');
    }

    expect(call).toThrowError('You must provided a Immutable.List');
  });

  it('should return a Immutable.List of Immutable.Map and also sort by percent', () => {
    expect(getPiePercent(fromJS(data), '3171.75')).toEqual(
      fromJS([
        {
          name: 'Bitcoin',
          percent: '63.16',
        },
        {
          name: 'Neo',
          percent: '21.38',
        },
        {
          name: 'Litecoin',
          percent: '14.36',
        },
        {
          name: 'Ripple',
          percent: '1.09',
        },
      ]),
    );

    expect(getPiePercent(fromJS(data.slice(0, data.length - 1)), '2716.2')).toEqual(
      fromJS([
        {
          name: 'Bitcoin',
          percent: '73.76',
        },
        {
          name: 'Neo',
          percent: '24.97',
        },
        {
          name: 'Ripple',
          percent: '1.27',
        },
      ]),
    );
  });
});
