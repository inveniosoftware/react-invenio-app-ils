import { BackOfficeRoutes } from '@routes/urls';
import { mount } from 'enzyme';
import React from 'react';
import ItemPendingLoans from './ItemPendingLoans';

jest.mock('react-router-dom');
jest.mock('@config');
BackOfficeRoutes.loanDetailsFor = jest.fn((pid) => `url/${pid}`);

describe('ItemPendingLoans tests', () => {
  let component;
  afterEach(() => {
    if (component) {
      component.unmount();
    }
  });

  const item = {
    pid: 222,
    metadata: {
      document_pid: 111,
      pid: 222,
    },
  };

  it('should render show a message with no requested loans', () => {
    component = mount(
      <ItemPendingLoans
        itemDetails={item}
        data={{ hits: [], total: 0 }}
        fetchPendingLoans={() => {}}
        performCheckoutAction={() => {}}
      />
    );

    expect(component).toMatchSnapshot();
    const message = component
      .find('Message')
      .filterWhere((element) => element.prop('data-test') === 'no-results');
    expect(message).toHaveLength(1);
  });
});
