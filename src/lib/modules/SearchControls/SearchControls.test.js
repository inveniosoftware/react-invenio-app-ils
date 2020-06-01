import React from 'react';
import { shallow } from 'enzyme';
import * as testData from '@testData/documents.json';

import { SearchControls } from './SearchControls';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const data = {
  hits: {
    total: 2,
    hits: [{ metadata: testData[0] }, { metadata: testData[1] }],
  },
};

let store;
beforeEach(() => {
  store = mockStore({
    isLoading: false,
    data: data,
    hasError: false,
  });
  store.clearActions();
});

describe('SearchControls tests', () => {
  let component;
  afterEach(() => {
    if (component) {
      component.unmount();
    }
  });

  it('should load the SearchControls component', () => {
    const component = shallow(<SearchControls modelName={'documents'} />);
    expect(component).toMatchSnapshot();
  });
});
