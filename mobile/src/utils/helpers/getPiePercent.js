// @flow

import invariant from 'invariant';

type Data = Array<{
  name: string,
  amount: string
}>;

type ReturnData = Array<{
  name: string,
  percent: string,
}>;

// TODO: Find solution for eslint
// TODO: Wrote test for this one
function getPercent(total: ?(string | number), amount: ?(string | number)): number {
  invariant(total != null, 'Total value is required');
  invariant(!isNaN(total), 'Total need to resolve to a number'); // eslint-disable-line
  invariant(amount != null, 'Amount value is required');
  invariant(!isNaN(amount), 'Amount need to resolve to a number'); // eslint-disable-line

  let _total: number;
  let _amount: number;

  if (typeof total === 'number') {
    _total = total
  } else if (typeof total === 'string') {
    _total = parseFloat(total);
  } else {
    _total = 0;
  }

  if (typeof amount === 'number') {
    _amount = amount
  } else if (typeof amount === 'string') {
    _amount = parseFloat(amount);
  } else {
    _amount = 0
  }

  return (_amount / _total) * 100;
}

// TODO: Wrote test for this one
// TODO: MAKE IT IMMUTABLE
export function getPiePercent(data: Data, total: string): ReturnData {
  const arr = data.reduce((prev, current) => {
    const newArr = [...prev, {
      name: current.name,
      percent: getPercent(total, current.amount).toFixed(2)
    }]

    return newArr;
  }, []);

  const arrSorted = [...arr].sort((a, b) => parseFloat(b.percent) - parseFloat(a.percent));

  return arrSorted;
}
