import { invenioConfig } from '@config';
import { shallow } from 'enzyme';
import React from 'react';
import { InvenioILSApp } from '../../lib';

jest.mock('@config');

describe('Config override tests', () => {
  it('should use the default value', () => {
    expect(invenioConfig.CIRCULATION.extensionsMaxCount).toEqual(3);
  });

  it('should override the default values', () => {
    const config = {
      circulation: { extensionsMaxCount: 42 },
    };
    shallow(<InvenioILSApp config={config} />);
    expect(invenioConfig.setValue).toHaveBeenCalledWith(config);
  });
});
