import HiddenWidget from '@rjsf/core/dist/cjs/components/widgets/HiddenWidget';
import _capitalize from 'lodash/capitalize';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';

/**
 * Custom field to display a field as a label and the value in the hidden field
 */
export class RJSFLabelField extends Component {
  render() {
    const { idSchema, formData } = this.props;
    const { $id } = idSchema;
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
  idSchema: PropTypes.object,
};

RJSFLabelField.defaultProps = {
  formData: undefined,
  idSchema: {
    $id: '',
  },
};
