// @noflow

import reducer, { StateRecord } from '../app';
import { toggleSearchBar, toggleTheme } from '../../actions/app';

describe('App Reducer', () => {
  describe('Initial State', () => {
    it('should return the initialState on default', () => {
      const state = new StateRecord();

      expect(reducer(state, { type: 'INITIAL' })).toMatchSnapshot();
    });
  })

  describe('#toggleSearchBar()', () => {
    it('should toggle the searchBar to true if the state was false', () => {
      const state = new StateRecord();

      expect(reducer(state, toggleSearchBar())).toMatchSnapshot();
    });

    it('should toggle the searchBar to false if the state was true', () => {
      let state = new StateRecord();

      state = reducer(state, toggleSearchBar());
      state = reducer(state, toggleSearchBar());

      expect(state).toMatchSnapshot();
    });
  });

  describe('#toggleTheme()', () => {
    it('should put darkTheme to false if was true before and theme to light one', () => {
      const state = new StateRecord();

      expect(reducer(state, toggleTheme())).toMatchSnapshot();
    });

    it('should put darkTheme to true if was false before and theme to dark one', () => {
      let state = new StateRecord();

      state = reducer(state, toggleTheme());
      state = reducer(state, toggleTheme());

      expect(state).toMatchSnapshot();
    });
  });
});
