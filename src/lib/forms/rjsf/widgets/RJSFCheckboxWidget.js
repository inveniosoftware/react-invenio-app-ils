import { Widgets } from '@rjsf/semantic-ui';
import React, { Component } from 'react';
import { Divider } from 'semantic-ui-react';

/**
 * Overrides the default CheckboxWidget to set as default:
 * - a `Divider` on the top as fake empty label to vertically align checkboxes with other fields
 */
export class RJSFCheckboxWidget extends Component {
  render() {
    return (
      <>
        <Divider hidden />
        <Widgets.CheckboxWidget {...this.props} />
      </>
    );
  }
}
