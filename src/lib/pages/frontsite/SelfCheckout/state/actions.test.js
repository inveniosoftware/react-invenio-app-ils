import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './actions';
import { initialState } from './reducer';
import { itemApi } from '@api/items';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const itemApiListMock = jest.fn();
itemApi.list = itemApiListMock;

const lowerCasedBarcode = 'cm-145123';
const upperCasedBarcode = lowerCasedBarcode.toUpperCase();

const expectedPayload = { pid: 'item-pid', barcode: upperCasedBarcode };
const response = {
  data: {
    hits: [expectedPayload],
  },
};

let store;
beforeEach(() => {
  itemApiListMock.mockClear();

  store = mockStore(initialState);
  store.clearActions();
});

describe('SelfCheck Out test', () => {
  it('should dispatch an action updating the payload result item', async () => {
    itemApiListMock.mockResolvedValue(response);

    const expectedAction1 = {
      type: actions.SEARCH_IS_LOADING,
    };
    const expectedAction2 = {
      type: actions.SEARCH_ITEM_SUCCESS,
      payload: expectedPayload,
    };
    await store.dispatch(actions.selfCheckOutSearch(lowerCasedBarcode));
    expect(store.getActions()[0]).toEqual(expectedAction1);
    expect(store.getActions()[1]).toEqual(expectedAction2);
    expect(itemApiListMock).toHaveBeenCalledWith(
      itemApi.query().withBarcode(upperCasedBarcode).qs()
    );
  });

  it('should dispatch an error action when the search fails', async () => {
    const errorMsg = 'Error message';
    itemApiListMock.mockImplementation(() => {
      throw new Error(errorMsg);
    });

    const expectedAction1 = {
      type: actions.SEARCH_IS_LOADING,
    };
    const expectedAction2 = {
      type: actions.SEARCH_HAS_ERROR,
      payload: new Error(errorMsg),
    };

    await store.dispatch(actions.selfCheckOutSearch('syntax error query'));
    expect(store.getActions()[0]).toEqual(expectedAction1);
    expect(store.getActions()[1]).toEqual(expectedAction2);
  });
});
