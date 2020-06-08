import reducer, { initialState } from './reducer';
import { IS_LOADING, SUCCESS, HAS_ERROR } from './actions';

describe('Fetch available items reducer', () => {
  it('should have initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should change loading state on loading action', () => {
    const action = {
      type: IS_LOADING,
    };
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('should change data state on success action', () => {
    const items = [
      {
        id: 987,
        metadata: {
          barcode: '9865745223',
          document_pid: 1342,
          document: {
            pid: 1342,
          },
          status: 'CAN_CIRCULATE',
          internal_location_pid: 1,
          internal_location: {
            name: 'A library',
            pid: 1,
          },
        },
      },
      {
        id: 988,
        metadata: {
          barcode: '9865745224',
          document_pid: 1342,
          document: {
            pid: 1342,
          },
          status: 'CAN_CIRCULATE',
          internal_location_pid: 1,
          internal_location: {
            name: 'A library',
            pid: 1,
          },
        },
      },
    ];
    const action = {
      type: SUCCESS,
      payload: items,
    };
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: false,
      data: items,
      hasError: false,
    });
  });

  it('should change error state on error action', () => {
    const action = {
      type: HAS_ERROR,
      payload: 'Error',
    };
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: false,
      error: 'Error',
      hasError: true,
    });
  });
});
