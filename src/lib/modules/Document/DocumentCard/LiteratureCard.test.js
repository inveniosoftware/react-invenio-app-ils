import React from 'react';
import { mount } from 'enzyme';
import testData from '@testData/documents.json';
import DocumentCard from './DocumentCard';

describe('BookCard tests', () => {
  let component;
  afterEach(() => {
    if (component) {
      component.unmount();
    }
  });

  const bookData = {
    metadata: {
      ...testData[0],
      title: 'Lorem',
      edition: '12',
      authors: ['Author1', 'Author2'],
      imageSize: 'small',
      imageCover: '',
      circulation: { has_items_for_loan: 2 },
      eitems: { total: 2 },
    },
  };

  it('should render the BookCard', () => {
    component = mount(<DocumentCard data={bookData} />);
    expect(component).toMatchSnapshot();

    const rows = component
      .find('BookCard')
      .find('Card')
      .filterWhere(
        element => element.prop('data-test') === bookData.metadata.pid
      );
    expect(rows).toHaveLength(1);
  });
});
