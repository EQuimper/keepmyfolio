// @noflow

import { addNewHolding } from '../../actions/cryptos';
import reducer, { StateRecord } from '../cryptos';

describe('Cryptos Reducer', () => {
  describe('#addNewHolding()', () => {
    const holding1 = {
      amountOfCoin: '2',
      cryptoId: 'bitcoin',
      dateBuy: new Date('Sat Sep 30 2017 12:49:28 GMT-0400 (EDT)'),
      id: 'Q3J5cHRvOmJpdGNvaW4=',
      name: 'Bitcoin',
      priceByCoin: '4325.7',
      priceTotalPay: '8651.40',
    };

    const holding2 = {
      amountOfCoin: '1',
      cryptoId: 'bitcoin',
      dateBuy: new Date('Sat Sep 30 2017 12:49:28 GMT-0400 (EDT)'),
      id: 'Q3J5cHRvOmJpdGNvaW4=',
      name: 'Bitcoin',
      priceByCoin: '4325.7',
      priceTotalPay: '4325.7',
    };

    const holding3 = {
      amountOfCoin: '20',
      cryptoId: 'neo',
      dateBuy: new Date('Sat Sep 30 2017 12:49:28 GMT-0400 (EDT)'),
      id: 'Q3J5cHRvOm5lbw==',
      name: 'NEO',
      priceByCoin: '32.2396',
      priceTotalPay: '644.79',
    };

    it('should add a holding', () => {
      const state = new StateRecord();
      expect(
        reducer(state, addNewHolding(holding1))
      ).toMatchSnapshot();
    });

    it('should add an existing type of coin a new holding', () => {
      let state = new StateRecord();
      state = reducer(state, addNewHolding(holding1));
      expect(state).toMatchSnapshot();
      state = reducer(state, addNewHolding(holding2));
      expect(state).toMatchSnapshot();
    })

    it('should add new coin on top of the old state', () => {
      let state = new StateRecord();
      state = reducer(state, addNewHolding(holding1));
      expect(state).toMatchSnapshot();
      state = reducer(state, addNewHolding(holding2));
      expect(state).toMatchSnapshot();
      state = reducer(state, addNewHolding(holding3));
      expect(state).toMatchSnapshot();
    })
  });
});
