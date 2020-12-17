import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './actions';
import { initialState } from './reducer';
import { loanApi } from '@api/loans';
import { toShortDate } from '@api/date';
import { DateTime } from 'luxon';

jest.mock('@config');
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const mockResponse = {
  data: {
    hits: {
      hits: [
        {
          id: 123,
          updated: '2018-01-01T11:05:00+01:00',
          created: '2018-01-01T11:05:00+01:00',
          metadata: {},
        },
      ],
    },
  },
};

const mockLoanList = jest.fn();
loanApi.list = mockLoanList;

let store;
beforeEach(() => {
  mockLoanList.mockClear();

  store = mockStore({ overdueLoans: initialState });
  store.clearActions();
});

describe('Loans renewed more then 3 times (last week) fetch tests', () => {
  let now = toShortDate(DateTime.local());

  it('should dispatch a loading action when fetching loans', (done) => {
    mockLoanList.mockResolvedValue(mockResponse);

    const expectedAction = {
      type: actions.IS_LOADING,
    };

    store.dispatch(actions.fetchOverdueLoans()).then(() => {
      expect(mockLoanList).toHaveBeenCalledWith(
        `(state:(ITEM_AT_DESK OR ITEM_ON_LOAN OR ITEM_IN_TRANSIT_FOR_PICKUP OR ITEM_IN_TRANSIT_TO_HOUSE) AND end_date:%7B*%20TO%20${now}%7D)`
      );
      const actions = store.getActions();
      expect(actions[0]).toEqual(expectedAction);
      done();
    });
  });

  it('should dispatch a success action when loans fetch succeeds', (done) => {
    mockLoanList.mockResolvedValue(mockResponse);

    const expectedAction = {
      type: actions.SUCCESS,
      payload: mockResponse.data,
    };

    store.dispatch(actions.fetchOverdueLoans()).then(() => {
      expect(mockLoanList).toHaveBeenCalledWith(
        `(state:(ITEM_AT_DESK OR ITEM_ON_LOAN OR ITEM_IN_TRANSIT_FOR_PICKUP OR ITEM_IN_TRANSIT_TO_HOUSE) AND end_date:%7B*%20TO%20${now}%7D)`
      );
      const actions = store.getActions();
      expect(actions[1]).toEqual(expectedAction);
      done();
    });
  });

  it('should dispatch an error action when loans fetch fails', (done) => {
    mockLoanList.mockRejectedValue([500, 'Error']);

    const expectedAction = {
      type: actions.HAS_ERROR,
      payload: [500, 'Error'],
    };

    store.dispatch(actions.fetchOverdueLoans()).then(() => {
      expect(mockLoanList).toHaveBeenCalledWith(
        `(state:(ITEM_AT_DESK OR ITEM_ON_LOAN OR ITEM_IN_TRANSIT_FOR_PICKUP OR ITEM_IN_TRANSIT_TO_HOUSE) AND end_date:%7B*%20TO%20${now}%7D)`
      );
      const actions = store.getActions();
      expect(actions[1]).toEqual(expectedAction);
      done();
    });
  });
});
