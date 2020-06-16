import { mount } from 'enzyme';
import React from 'react';
import { DocumentMetadataExtensions } from './DocumentMetadataExtensions';

jest.mock('@config/uiConfig');

describe('DocumentMetadataExtensions tests', () => {
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

  it('should render the DocumentMetadataExtensions', () => {
    component = mount(<DocumentMetadataExtensions extensions={extensions} />);
    expect(component).toMatchSnapshot();
    const rows = component.find('DocumentMetadataExtensions').find('TableRow');
    expect(rows).toHaveLength(2);
  });
});
