import React from 'react';
import { mount } from 'enzyme';
import { SearchBarILS as SearchBar } from './SearchBarILS';

const mockedOnSearchHandler = jest.fn();

describe('SearchBar tests', () => {
  let component;
  afterEach(() => {
    mockedOnSearchHandler.mockClear();
    component.unmount();
  });

  it('should match snapshot', () => {
    component = mount(
      <SearchBar onSearchHandler={() => {}} placeholder="Search" />
    );
    expect(component).toMatchSnapshot();
  });

  it('should call onSearchHandler only on `enter` key press', () => {
    component = mount(
      <SearchBar placeholder="Search" onSearchHandler={mockedOnSearchHandler} />
    );

    const input = component.find('Input').find('input');
    input.simulate('keypress', { key: 'Enter' });
    expect(mockedOnSearchHandler).toHaveBeenCalled();

    mockedOnSearchHandler.mockClear();

    input.simulate('keypress', { key: 'Backspace' });
    expect(mockedOnSearchHandler).not.toHaveBeenCalled();
  });

  it('should call executeSearch on button click', () => {
    component = mount(
      <SearchBar onSearchHandler={mockedOnSearchHandler} placeholder="Search" />
    );
    const input = component.find('Input').find('Icon').find('i');
    input.simulate('click');
    expect(mockedOnSearchHandler).toHaveBeenCalled();
  });
});
