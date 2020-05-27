import React from 'react';
import { shallow, mount } from 'enzyme';
import DocumentCard from './DocumentCard';

jest.mock('react-router-dom');

describe('DocumentsCard tests', () => {
  let component;
  afterEach(() => {
    if (component) {
      component.unmount();
    }
  });

  it('should load the details component', () => {
    const mockedFetchDocuments = jest.fn();

    const component = shallow(
      <DocumentCard
        data={0}
        isLoading={false}
        fetchRequestedWithAvailableItems={mockedFetchDocuments}
      />
    );
    expect(component).toMatchSnapshot();
  });

  it('should render stats with 2 records', () => {
    const mockedFetchDocuments = jest.fn();
    const data = 2;

    component = mount(
      <DocumentCard
        isLoading={false}
        data={data}
        fetchRequestedWithAvailableItems={mockedFetchDocuments}
      />
    );

    expect(component).toMatchSnapshot();
    const stats = component.find('span').prop('data-test');
    expect(stats).toEqual(data);
  });
});
