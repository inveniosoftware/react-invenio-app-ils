import { mount } from 'enzyme';
import React from 'react';
import { SeriesMetadataExtensions } from './SeriesMetadataExtensions';

jest.mock('@config');

describe('SeriesMetadataExtensions tests', () => {
  let component;
  afterEach(() => {
    if (component) {
      component.unmount();
    }
  });

  const extensions = {
    'fooObject:fooProp': 'fooValue',
    'barObject:barProp': 'barValue',
  };

  it('should render the SeriesMetadataExtensions', () => {
    component = mount(<SeriesMetadataExtensions extensions={extensions} />);
    expect(component).toMatchSnapshot();
    const rows = component.find('SeriesMetadataExtensions').find('TableRow');
    expect(rows).toHaveLength(2);
  });
});
