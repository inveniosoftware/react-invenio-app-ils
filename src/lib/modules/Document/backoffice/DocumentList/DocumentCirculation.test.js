import * as testData from '@testData/documents.json';
import { shallow } from 'enzyme';
import React from 'react';
import DocumentCirculation from './DocumentCirculation';

describe('DocumentCirculation tests', () => {
  let component;
  afterEach(() => {
    if (component) {
      component.unmount();
    }
  });

  const document = {
    metadata: {
      ...testData[0],
      items: { total: 2 },
      circulation: { available_items_for_loan_count: 2 },
    },
  };

  it('should load the DocumentCirculation component', () => {
    const component = shallow(<DocumentCirculation document={document} />);
    expect(component).toMatchSnapshot();
  });
});
