/*
 * SPDX-FileCopyrightText: 2021-2026 CERN.
 * SPDX-License-Identifier: MIT
 */
import { getDefaultRegistry } from '@rjsf/core';
import _capitalize from 'lodash/capitalize';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';

const { HiddenWidget } = getDefaultRegistry().widgets;

/**
 * Custom field to display a field as a label and the value in the hidden field
 */
export class RJSFLabelField extends Component {
  render() {
    const { fieldPathId, formData } = this.props;
    const { $id } = fieldPathId;
    return (
      <>
        {formData && (
          <Header as="h3" dividing content={_capitalize(formData)} />
        )}
        <HiddenWidget id={$id} value={formData} {...this.props} />
      </>
    );
  }
}

RJSFLabelField.propTypes = {
  formData: PropTypes.string,
  fieldPathId: PropTypes.object,
};

RJSFLabelField.defaultProps = {
  formData: undefined,
  fieldPathId: {
    $id: '',
  },
};
