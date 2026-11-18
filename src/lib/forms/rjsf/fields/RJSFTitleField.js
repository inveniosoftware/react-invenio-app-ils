/*
 * SPDX-FileCopyrightText: 2021 CERN.
 * SPDX-License-Identifier: MIT
 */

import { getUiOptions } from '@rjsf/utils';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';

/**
 * Overrides the default TitleField to set as default:
 * - add `dividing` prop
 */
export class RJSFTitleField extends Component {
  render() {
    const { uiSchema, title } = this.props;
    const { semantic } = getUiOptions(uiSchema);
    return title ? (
      <Header dividing as="h4" {...semantic}>
        {title}
      </Header>
    ) : null;
  }
}

RJSFTitleField.propTypes = {
  uiSchema: PropTypes.object,
  title: PropTypes.string,
};

RJSFTitleField.defaultProps = {
  uiSchema: {},
  title: null,
};
