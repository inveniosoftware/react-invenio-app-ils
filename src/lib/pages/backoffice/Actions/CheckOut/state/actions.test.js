/*
 * SPDX-FileCopyrightText: 2020 CERN.
 * SPDX-License-Identifier: MIT
 */

import { ADD as ADD_NOTIFICATION } from '@components/Notifications/actions';
import { checkOutItem } from '@modules/Items/backoffice';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './actions';
import { initialState } from './reducer';

jest.mock('@modules/Items/backoffice', () => ({
  ...jest.requireActual('@modules/Items/backoffice'),
  checkOutItem: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

let store;
beforeEach(() => {
  store = mockStore(initialState);
  store.clearActions();
});

describe('Check Out tests', () => {
  it('should dispatch an action updating the result message', async () => {
    const expectedAction = {
      type: actions.UPDATE_RESULT_MESSAGE,
      payload: 'No results found',
    };
    await store.dispatch(actions.updateResultMessage('No results found'));
    expect(store.getActions()[0]).toEqual(expectedAction);
  });
  it('should dispatch an action to clear results', async () => {
    const expectedAction = {
      type: actions.CLEAR_RESULTS,
    };
    await store.dispatch(actions.clearResults());
    expect(store.getActions()[0]).toEqual(expectedAction);
  });

  describe('checkOutItems', () => {
    const makeItem = (pid, status = 'CAN_CIRCULATE') => ({
      metadata: {
        pid,
        pidType: 'pitmid',
        status,
        barcode: `barcode-${pid}`,
        document_pid: 'doc-1',
        document: { title: 'A title' },
        circulation: {},
      },
    });
    const notifications = () =>
      store
        .getActions()
        .filter((action) => action.type === ADD_NOTIFICATION)
        .map((action) => action.payload);

    beforeEach(() => {
      checkOutItem.mockReset();
    });

    it('should send one notification per outcome', async () => {
      checkOutItem
        .mockResolvedValueOnce({ changes: [] })
        .mockResolvedValueOnce({ changes: ['the status was changed'] })
        .mockRejectedValueOnce({
          response: { data: { message: 'Item not available' } },
        });
      const items = [
        makeItem('1'),
        makeItem('2'),
        makeItem('3'),
        makeItem('4', 'FOR_REFERENCE_ONLY'),
      ];

      await store.dispatch(actions.checkOutItems(items, '7', 'Jane Doe'));

      expect(checkOutItem).toHaveBeenCalledTimes(3);
      expect(notifications().map(({ type }) => type)).toEqual([
        'success',
        'warning',
        'error',
      ]);
      expect(notifications()[2].title).toEqual('Not checked out (2 of 4)');
      expect(store.getActions()).toContainEqual({
        type: actions.CHECKOUT_LIST_DONE,
        payload: ['1', '2'],
      });
    });

    it('should only send a success notification when all are checked out', async () => {
      checkOutItem.mockResolvedValue({ changes: [] });

      await store.dispatch(
        actions.checkOutItems([makeItem('1')], '7', 'Jane Doe')
      );

      expect(notifications()).toHaveLength(1);
      expect(notifications()[0]).toMatchObject({
        type: 'success',
        title: 'Checked out to Jane Doe (patron 7) (1 of 1)',
        content: 'A title (barcode-1)',
      });
    });
  });
});
