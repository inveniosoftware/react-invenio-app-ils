import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FastField, Field, getIn } from 'formik';
import { Form, Card, Icon, Label } from 'semantic-ui-react';
import { ESSelector } from '@modules/ESSelector';
import _isEmpty from 'lodash/isEmpty';
import _has from 'lodash/has';

export class SelectorField extends Component {
  state = {
    // eslint-disable-next-line react/no-unused-state
    value: null,
  };

  renderEmpty = () => {
    const { emptyHeader, emptyDescription } = this.props;
    return <Card header={emptyHeader} description={emptyDescription} />;
  };

  defaultRenderSelection = (selection, removeSelection) => {
    const { multiple } = this.props;
    return (
      <Card fluid={!multiple} key={selection.id}>
        <Card.Content>
          <Card.Header as="a" onClick={() => removeSelection(selection)}>
            {selection.title}
            <Icon name="delete" />
          </Card.Header>
          <Card.Meta>{selection.extra}</Card.Meta>
          <Card.Description>{selection.description}</Card.Description>
        </Card.Content>
      </Card>
    );
  };

  defaultRenderGroup = (selections, renderSelection, removeSelection) => {
    if (_isEmpty(selections)) {
      return this.renderEmpty();
    }

    return (
      <Card.Group>
        {selections.map(selection =>
          renderSelection(selection, removeSelection)
        )}
      </Card.Group>
    );
  };

  onSelectionsUpdate = (selections, setFieldValue) => {
    const { multiple, fieldPath } = this.props;
    // eslint-disable-next-line react/no-unused-state
    this.setState({ value: selections });
    if (!multiple) {
      let data = {};
      if (selections.length > 0) {
        data = _has(selections[0], 'metadata')
          ? selections[0].metadata
          : selections[0];
      }
      setFieldValue(fieldPath, data);
    }
  };

  hasFieldError(errors, name, value) {
    const error = errors[name];
    return !_isEmpty(error);
  }

  renderFormField = ({ form: { errors, setFieldValue, values } }) => {
    const {
      fieldPath,
      errorPath,
      emptyHeader,
      emptyDescription,
      label,
      required,
      multiple,
      optimized,
      placeholder,
      serializer,
      renderGroup,
      renderSelection,
      width,
      ...selectorProps
    } = this.props;
    const selections = [];
    const value = getIn(values, fieldPath);
    if (multiple) {
      for (const record of value) {
        if (!_isEmpty(record)) {
          selections.push(serializer({ metadata: record }));
        }
      }
    } else {
      if (!_isEmpty(value)) {
        selections.push(serializer({ metadata: value }));
      }
    }
    const hasFieldError = this.hasFieldError(errors, errorPath, value);
    const error = errors[errorPath];
    const placeholderText =
      !multiple && selections.length > 0 ? selections[0].title : placeholder;
    return (
      <Form.Field required={required} error={hasFieldError} width={width}>
        {label && <label htmlFor={fieldPath}>{label}</label>}
        {hasFieldError && !_isEmpty(error) && (
          <Label prompt pointing="below">
            {error}
          </Label>
        )}
        <ESSelector
          id={fieldPath}
          name={fieldPath}
          multiple={multiple}
          initialSelections={selections}
          renderSelections={renderGroup}
          renderSelection={renderSelection}
          onSelectionsUpdate={selections =>
            this.onSelectionsUpdate(selections, setFieldValue)
          }
          serializer={serializer}
          placeholder={placeholderText}
          {...selectorProps}
        />
      </Form.Field>
    );
  };

  render() {
    const { optimized, fieldPath } = this.props;
    const FormikField = optimized ? FastField : Field;
    return <FormikField name={fieldPath} component={this.renderFormField} />;
  }
}

SelectorField.propTypes = {
  emptyDescription: PropTypes.string,
  emptyHeader: PropTypes.string,
  errorPath: PropTypes.string.isRequired,
  fieldPath: PropTypes.string.isRequired,
  label: PropTypes.string,
  optimized: PropTypes.bool,
  serializer: PropTypes.func.isRequired,
  renderGroup: PropTypes.func,
  renderSelection: PropTypes.func,
  required: PropTypes.bool,
  multiple: PropTypes.bool,
  placeholder: PropTypes.string,
  width: PropTypes.number,
};

SelectorField.defaultProps = {
  emptyHeader: 'Nothing selected',
  emptyDescription: 'Please select a value before saving.',
  optimized: false,
  width: 16,
  placeholder: '',
  multiple: false,
  required: false,
  renderSelection: null,
  renderGroup: null,
  label: '',
};
