import React, { act } from 'react';
import { shallow, mount } from 'enzyme';
import { HitsSearch } from './HitsSearch';
import { serializeLocation } from './serializer';

jest.mock('./ESSelectorLoanRequest', () => {
  return {
    ESSelectorLoanRequest: () => null,
  };
});

describe('HitsSearch tests', () => {
  const serializer = serializeLocation;

  let component;
  afterEach(() => {
    if (component) {
      component.unmount();
    }
  });

  it('should load the selector component', () => {
    const component = shallow(
      <HitsSearch delay={0} query={() => {}} serializer={serializer} />
    );
    expect(component).toMatchSnapshot();
  });

  it('should search when text input changes', async () => {
    jest.useFakeTimers();
    const mockedApi = jest.fn();

    component = mount(
      <HitsSearch
        delay={0}
        query={mockedApi}
        serializer={serializer}
        alwaysWildcard={false}
      />
    );

    await act(async () => {
      component.find('input').simulate('change', {
        target: { value: 'test' },
      });
      jest.runAllTimers();
    });

    expect(mockedApi).toHaveBeenCalledTimes(1);
    expect(mockedApi.mock.calls[0][0]).toBe('test');

    jest.useRealTimers();
  });

  it('should return no result', async () => {
    jest.useFakeTimers();
    const mockedApi = jest.fn().mockResolvedValue({ data: { hits: [] } });
    const onResults = jest.fn();

    component = mount(
      <HitsSearch
        query={mockedApi}
        delay={0}
        onResults={onResults}
        serializer={serializer}
      />
    );

    await act(async () => {
      component.find('input').simulate('change', {
        target: { value: 'test' },
      });
      jest.runAllTimers();
    });

    expect(onResults).toHaveBeenCalledTimes(1);
    expect(onResults.mock.calls[0][0]).toHaveLength(0);

    jest.useRealTimers();
  });

  it('should return one result', async () => {
    jest.useFakeTimers();
    const mockApi = jest.fn().mockResolvedValue({
      data: {
        hits: [
          {
            id: 1,
            pid: '1',
            metadata: {
              $schema:
                'https://127.0.0.1:5000/schemas/locations/location-v1.0.0.json',
              pid: '1',
              name: 'Central Library',
              address: 'Rue de Meyrin',
              email: 'library@cern.ch',
            },
          },
        ],
      },
    });

    const onResults = jest.fn();

    component = mount(
      <HitsSearch
        query={mockApi}
        delay={0}
        onResults={onResults}
        serializer={serializer}
      />
    );
    await act(async () => {
      component.find('input').simulate('change', {
        target: { value: 'test' },
      });
      jest.runAllTimers();
    });

    expect(onResults).toHaveBeenCalledTimes(1);
    expect(onResults.mock.calls[0][0]).toHaveLength(1);
    expect(onResults.mock.calls[0][0][0].title).toBe('Central Library');
    jest.useRealTimers();
  });
});
