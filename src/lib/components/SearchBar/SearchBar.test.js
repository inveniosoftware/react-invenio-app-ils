import React from 'react';
import { mount } from 'enzyme';
import SearchBar from './SearchBar';

describe('LoansSearch SearchBar tests', () => {
  let component;
  afterEach(() => {
    component.unmount();
  });

  const currentQueryString = 'The Gulf: The Making of An American Sea';

  it('should render the current query string', () => {
    component = mount(
      <SearchBar
        queryString={currentQueryString}
        updateQueryString={() => {}}
        placeholder="Search"
      />
    );
    expect(component).toMatchSnapshot();
  });

  it('should call executeSearch on key `enter` pressed only', () => {
    const mockedExecuteSearch = jest.fn();
    component = mount(
      <SearchBar
        queryString={currentQueryString}
        updateQueryString={mockedExecuteSearch}
        placeholder="Search"
      />
    );

    const input = component.find('Input').find('input');
    input.simulate('keypress', { key: 'Enter' });
    expect(mockedExecuteSearch).toHaveBeenCalled();

    mockedExecuteSearch.mockClear();

    input.simulate('keypress', { key: 'Backspace' });
    expect(mockedExecuteSearch).not.toHaveBeenCalled();
  });

  it('should call executeSearch on button click', () => {
    const mockedExecuteSearch = jest.fn();
    component = mount(
      <SearchBar
        queryString={currentQueryString}
        updateQueryString={mockedExecuteSearch}
        placeholder="Search"
      />
    );
    const input = component
      .find('Input')
      .find('Icon')
      .find('i');
    input.simulate('click');
    expect(mockedExecuteSearch).toHaveBeenCalled();
  });

  it('should render search bar with query helper', () => {
    const helperFields = [
      {
        name: 'author',
        field: 'authors.full_name',
        defaultValue: 'Doe, John',
      },
      {
        name: 'created',
        field: '_created',
      },
    ];
    const mockedExecuteSearch = jest.fn();
    component = mount(
      <SearchBar
        queryString=""
        updateQueryString={mockedExecuteSearch}
        placeholder="Search"
        queryHelperFields={helperFields}
      />
    );

    expect(component).toMatchSnapshot();

    const listItem = component.find('ListItem');
    expect(listItem).toHaveLength(2);

    expect(
      component
        .find('ListItem')
        .at(0)
        .text()
    ).toEqual('author');
  });
});
