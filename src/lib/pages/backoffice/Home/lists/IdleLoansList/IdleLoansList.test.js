import { BackOfficeRoutes } from '@routes/urls';
import testData from '@testData/loans.json';
import { mount, shallow } from 'enzyme';
import React from 'react';
import IdleLoansList from './IdleLoansList';

jest.mock('react-router-dom');
jest.mock('@config/invenioConfig');
BackOfficeRoutes.loanDetailsFor = jest.fn(pid => `url/${pid}`);
let mockViewDetails = jest.fn();

const data = {
  hits: [
    {
      id: 1,
      pid: 'loan1',
      metadata: testData[0],
    },
    {
      id: 2,
      pid: 'loan2',
      metadata: testData[1],
    },
  ],
  total: 2,
};

let component;
afterEach(() => {
  if (component) {
    mockViewDetails.mockClear();
    component.unmount();
  }
});

describe('IdleLoansList tests', () => {
  it('should load the details component', () => {
    const component = shallow(
      <IdleLoansList
        data={{ hits: [], total: 0 }}
        isLoading={false}
        fetchIdlePendingLoans={() => {}}
      />
    );
    expect(component).toMatchSnapshot();
  });

  it('should fetch loans on mount', () => {
    const mockedFetchLoans = jest.fn();
    component = mount(
      <IdleLoansList
        data={{ hits: [], total: 0 }}
        isLoading={false}
        fetchIdlePendingLoans={mockedFetchLoans}
      />
    );
    expect(mockedFetchLoans).toHaveBeenCalled();
  });

  it('should render show a message with no loans', () => {
    component = mount(
      <IdleLoansList
        data={{ hits: [], total: 0 }}
        isLoading={false}
        fetchIdlePendingLoans={() => {}}
      />
    );

    expect(component).toMatchSnapshot();
    const message = component
      .find('Message')
      .filterWhere(element => element.prop('data-test') === 'no-results');
    expect(message).toHaveLength(1);
  });
});
