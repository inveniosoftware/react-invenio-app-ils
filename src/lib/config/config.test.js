import { invenioConfig } from '@config';
import { shallow } from 'enzyme';
import React from 'react';
import { InvenioILSApp } from '../../lib';

jest.mock('@config/invenioConfig');

describe('Config override tests', () => {
  it('should use the default value', () => {
    expect(invenioConfig.circulation.extensionsMaxCount).toEqual(3);
  });

  it('should override the default values', () => {
    const config = {
      invenioConfig: { circulation: { extensionsMaxCount: 42 } },
    };
    shallow(<InvenioILSApp config={config} />);
    expect(invenioConfig.circulation.extensionsMaxCount).toEqual(42);
  });
});
