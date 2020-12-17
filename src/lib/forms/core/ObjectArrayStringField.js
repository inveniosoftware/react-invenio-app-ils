import { DeleteActionButton } from '@forms/components/DeleteActionButton';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { AccordionField } from './AccordionField';
import { ArrayField } from './ArrayField';
import { GroupField } from './GroupField';
import { StringField } from './StringField';

export class ObjectArrayStringField extends Component {
  renderFormField = ({ arrayPath, indexPath, ...arrayHelpers }) => {
    const objectPath = `${arrayPath}.${indexPath}`;
    const { objectKeysArray } = this.props;
    return (
      <GroupField
        border
        widths="equal"
        action={
          <DeleteActionButton
            size="large"
            onClick={() => arrayHelpers.remove(indexPath)}
          />
        }
      >
        {objectKeysArray.map((keyObj) => (
          <StringField
            inline
            key={keyObj.key}
            label={keyObj.text}
            fieldPath={`${objectPath}.${keyObj.key}`}
            required={keyObj.required || false}
          />
        ))}
      </GroupField>
    );
  };

  renderWithoutAccordion = () => {
    const { label, fieldPath, defaultNewValue, addButtonLabel } = this.props;
    return (
      <ArrayField
        label={label}
        fieldPath={fieldPath}
        defaultNewValue={defaultNewValue}
        renderArrayItem={this.renderFormField}
        addButtonLabel={addButtonLabel}
      />
    );
  };

  render() {
    const {
      basic,
      label,
      fieldPath,
      defaultNewValue,
      addButtonLabel,
    } = this.props;
    return basic ? (
      this.renderWithoutAccordion()
    ) : (
      <AccordionField
        label={label}
        fieldPath={fieldPath}
        content={
          <ArrayField
            fieldPath={fieldPath}
            defaultNewValue={defaultNewValue}
            renderArrayItem={this.renderFormField}
            addButtonLabel={addButtonLabel}
          />
        }
      />
    );
  }
}

ObjectArrayStringField.propTypes = {
  label: PropTypes.string,
  fieldPath: PropTypes.string,
  defaultNewValue: PropTypes.object,
  objectKeysArray: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      text: PropTypes.string,
      required: PropTypes.bool,
    })
  ),
  addButtonLabel: PropTypes.string,
  basic: PropTypes.bool,
};

ObjectArrayStringField.defaultProps = {
  basic: false,
};
