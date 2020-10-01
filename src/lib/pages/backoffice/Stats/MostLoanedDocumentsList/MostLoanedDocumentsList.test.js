import React from 'react';
import { shallow, mount } from 'enzyme';
import { Settings } from 'luxon';
import MostLoanedDocumentsList from './MostLoanedDocumentsList';
import { MemoryRouter } from 'react-router';
import * as testData from '@testData/documents.json';

jest.mock('@components/backoffice/ExportSearchResults');
jest.mock('@config');

Settings.defaultZoneName = 'utc';
const stringDate = '2018-01-01T11:05:00+01:00';

describe('MostLoanedDocumentsList tests', () => {
  let component;
  afterEach(() => {
    if (component) {
      component.unmount();
    }
  });

  it('should load the component', () => {
    const component = shallow(
      <MostLoanedDocumentsList
        data={{ hits: [], total: 0 }}
        fetchMostLoanedDocuments={() => {}}
      />
    );
    expect(component).toMatchSnapshot();
  });

  it('should fetch documents on mount', () => {
    const mockedFetchLoans = jest.fn();
    component = mount(
      <MostLoanedDocumentsList
        data={{ hits: [], total: 0 }}
        fetchMostLoanedDocuments={mockedFetchLoans}
      />
    );
    expect(mockedFetchLoans).toHaveBeenCalled();
  });

  it('should render documents', () => {
    const data = {
      hits: [
        {
          id: 1,
          updated: stringDate,
          created: stringDate,
          pid: 'doc1',
          metadata: {
            ...testData[0],
            pid: 'doc1',
            loan_count: 1,
            extension_count: 1,
            items: { total: 2 },
            eitems: { total: 2 },
            circulation: {
              past_loans_count: 1,
            },
            relations: {},
          },
        },
        {
          id: 2,
          updated: stringDate,
          created: stringDate,
          pid: 'doc2',
          metadata: {
            ...testData[1],
            pid: 'doc2',
            loan_count: 1,
            extension_count: 1,
            items: { total: 2 },
            eitems: { total: 2 },
            circulation: {
              past_loans_count: 1,
            },
            relations: {},
          },
        },
      ],
      total: 2,
    };
    component = mount(
      <MemoryRouter>
        <MostLoanedDocumentsList
          data={data}
          fetchMostLoanedDocuments={() => {}}
        />
      </MemoryRouter>
    );

    const rows = component.find('Item');
    expect(rows).toHaveLength(2);
  });
});
