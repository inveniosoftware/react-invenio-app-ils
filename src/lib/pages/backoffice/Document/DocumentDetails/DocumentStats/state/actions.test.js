import { toShortDate } from '@api/date';
import { loanApi } from '@api/loans';
import { DateTime } from 'luxon';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './actions';
import { initialState } from './reducer';

jest.mock('@config');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const mockLoanList = jest.fn();
loanApi.list = mockLoanList;

const ARGS = {
  documentPid: 42,
  fromDate: toShortDate(DateTime.local().minus({ days: 10 })),
  toDate: toShortDate(DateTime.local()),
};

let store;
beforeEach(() => {
  mockLoanList.mockClear();
  store = mockStore(initialState);
  store.clearActions();
});

describe('Document stats fetch tests', () => {
  it('should dispatch a loading action when fetching document stats', () => {
    const expectedAction = {
      type: actions.IS_LOADING,
    };
    store.dispatch(actions.fetchDocumentStats(ARGS)).then((done) => {
      const range = encodeURI(`{${ARGS.fromDate} TO ${ARGS.toDate}}`);
      expect(mockLoanList).toHaveBeenCalledWith(
        `document_pid:${ARGS.documentPid} AND state:(ITEM_RETURNED OR CANCELLED) AND start_date:${range}`
      );
      expect(store.getActions()[0]).toEqual(expectedAction);
    });
  });

  it('should dispatch a success action when document stats fetch succeeds', () => {
    mockLoanList.mockResolvedValue({ data: 'someData' });
    const expectedAction = {
      type: actions.SUCCESS,
      payload: 'someData',
    };

    store.dispatch(actions.fetchDocumentStats(ARGS)).then((done) => {
      const range = encodeURI(`{${ARGS.fromDate} TO ${ARGS.toDate}}`);
      expect(mockLoanList).toHaveBeenCalledWith(
        `document_pid:${ARGS.documentPid} AND state:(ITEM_RETURNED OR CANCELLED) AND start_date:${range}`
      );
      expect(store.getActions()[1]).toEqual(expectedAction);
    });
  });

  it('should dispatch an error action when document stats fetch fails', () => {
    mockLoanList.mockRejectedValue([500, 'Error']);
    const expectedAction = {
      type: actions.HAS_ERROR,
      payload: [500, 'Error'],
    };

    store.dispatch(actions.fetchDocumentStats(ARGS)).then((done) => {
      const range = encodeURI(`{${ARGS.fromDate} TO ${ARGS.toDate}}`);
      expect(mockLoanList).toHaveBeenCalledWith(
        `document_pid:${ARGS.documentPid} AND state:(ITEM_RETURNED OR CANCELLED) AND start_date:${range}`
      );
      expect(store.getActions()[1]).toEqual(expectedAction);
    });
  });
});
