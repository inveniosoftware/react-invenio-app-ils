import React from 'react';
import { shallow, mount } from 'enzyme';
import { BackOfficeRoutes } from '@routes/urls';
import OverbookedDocumentsList from './OverbookedDocumentsList';
import testData from '@testData/documents.json';

jest.mock('react-router-dom');
let mockViewDetails = jest.fn();

BackOfficeRoutes.documentDetailsFor = jest.fn(pid => `url/${pid}`);

const data = {
  hits: [
    {
      id: 1,
      pid: 'doc1',
      metadata: testData[0],
    },
    {
      id: 2,
      pid: 'doc2',
      metadata: testData[1],
    },
  ],
  total: 2,
};

describe('OverbookedDocumentsList tests', () => {
  let component;
  afterEach(() => {
    mockViewDetails.mockClear();
    if (component) {
      component.unmount();
    }
  });

  it('should load the details component', () => {
    const component = shallow(
      <OverbookedDocumentsList
        data={{ hits: [], total: 0 }}
        fetchOverbookedDocuments={() => {}}
      />
    );
    expect(component).toMatchSnapshot();
  });

  it('should fetch documents on mount', () => {
    const mockedFetchLoans = jest.fn();
    component = mount(
      <OverbookedDocumentsList
        data={{ hits: [], total: 0 }}
        fetchOverbookedDocuments={mockedFetchLoans}
      />
    );
    expect(mockedFetchLoans).toHaveBeenCalled();
  });

  it('should render show a message with no documents', () => {
    component = mount(
      <OverbookedDocumentsList
        data={{ hits: [], total: 0 }}
        fetchOverbookedDocuments={() => {}}
      />
    );

    expect(component).toMatchSnapshot();
    const message = component
      .find('Message')
      .filterWhere(element => element.prop('data-test') === 'no-results');
    expect(message).toHaveLength(1);
  });

  it('should render documents', () => {
    component = mount(
      <OverbookedDocumentsList
        data={data}
        fetchOverbookedDocuments={() => {}}
      />
    );

    expect(component).toMatchSnapshot();
    const rows = component
      .find('TableRow')
      .filterWhere(
        element =>
          element.prop('data-test') === 'doc1' ||
          element.prop('data-test') === 'doc2'
      );
    expect(rows).toHaveLength(2);

    const footer = component
      .find('TableRow')
      .filterWhere(element => element.prop('data-test') === 'footer');
    expect(footer).toHaveLength(0);
  });
});
