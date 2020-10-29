import { AccordionField } from '@forms/core/AccordionField';
import { ArrayField } from '@forms/core/ArrayField';
import { GroupField } from '@forms/core/GroupField';
import { StringField } from '@forms/core/StringField';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { DeleteActionButton } from './DeleteActionButton';
import { BooleanField } from '@forms/core/BooleanField';

export class UrlsField extends Component {
  renderFormField = ({ arrayPath, indexPath, ...arrayHelpers }) => {
    const { withRestriction } = this.props;
    const objectPath = `${arrayPath}.${indexPath}`;
    return (
      <GroupField
        border
        grouped
        widths="equal"
        action={
          <DeleteActionButton onClick={() => arrayHelpers.remove(indexPath)} />
        }
      >
        <StringField required label="Url" fieldPath={`${objectPath}.value`} />
        <StringField
          label="Description"
          fieldPath={`${objectPath}.description`}
        />
        {withRestriction && (
          <BooleanField
            rightLabel="Login required"
            fieldPath={`${objectPath}.login_required`}
            toggle
          />
        )}
      </GroupField>
    );
  };

  render() {
    const { withRestriction } = this.props;
    return (
      <AccordionField
        label="Urls"
        fieldPath="urls"
        content={
          <ArrayField
            fieldPath="urls"
            defaultNewValue={{
              value: undefined,
              description: undefined,
              login_required: withRestriction ? true : undefined,
            }}
            renderArrayItem={this.renderFormField}
            addButtonLabel="Add new url"
          />
        }
      />
    );
  }
}

UrlsField.propTypes = {
  withRestriction: PropTypes.bool,
};

UrlsField.defaultProps = {
  withRestriction: false,
};
