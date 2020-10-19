import * as testData from '@testData/documents.json';
import { shallow } from 'enzyme';
import React from 'react';
import DocumentListEntry from './DocumentListEntry';

it('should render correctly', () => {
  const data = {
    metadata: {
      ...testData[0],
      pid: '13',
      eitems: { hits: [], total: 0 },
      circulation: {
        available_items_for_loan_count: 0,
      },
    },
  };

  const component = shallow(<DocumentListEntry metadata={data.metadata} />);
  expect(component).toMatchSnapshot();
});
