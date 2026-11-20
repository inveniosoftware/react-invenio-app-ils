/*
 * SPDX-FileCopyrightText: 2021 CERN.
 * SPDX-License-Identifier: MIT
 */

import { isIdInArray } from '@forms/rjsf/layout/rows';
import { Widgets } from '@rjsf/semantic-ui';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Divider } from 'semantic-ui-react';

/**
 * Overrides the default CheckboxWidget to set as default:
 * - a `Divider` on the top as fake empty label to vertically align checkboxes with other fields
 */
export class RJSFCheckboxWidget extends Component {
  render() {
    const { id, registry } = this.props;
    const formContext = (registry && registry.formContext) || {};
    if (formContext.sectioned && !isIdInArray(id)) {
      // the label | field row already holds the title of the field
      return <Widgets.CheckboxWidget {...this.props} label="Yes" />;
    }
    return (
      <>
        <Divider hidden />
        <Widgets.CheckboxWidget {...this.props} />
      </>
    );
  }
}

RJSFCheckboxWidget.propTypes = {
  id: PropTypes.string,
  registry: PropTypes.object,
};

RJSFCheckboxWidget.defaultProps = {
  id: '',
  registry: { formContext: {} },
};
