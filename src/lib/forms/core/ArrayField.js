import { FieldArray, getIn } from 'formik';
import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Button, Form, Icon } from 'semantic-ui-react';

export class ArrayField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstItemCreated: false,
    };
  }

  renderFormField = props => {
    const {
      form: { values },
      ...arrayHelpers
    } = props;
    const {
      fieldPath,
      addButtonLabel,
      defaultNewValue,
      label,
      renderArrayItem,
      startWithItem,
      ...uiProps
    } = this.props;

    const { firstItemCreated } = this.state;
    if (_isEmpty(values[fieldPath]) && startWithItem && !firstItemCreated) {
      this.setState({ firstItemCreated: !firstItemCreated });
      arrayHelpers.push(defaultNewValue);
    }

    return (
      <Form.Field {...uiProps}>
        <label>{label}</label>
        {getIn(values, fieldPath, []).map((value, index) => {
          const arrayPath = fieldPath;
          const indexPath = index;
          const key = `${arrayPath}.${indexPath}`;
          return (
            <div key={key}>
              {renderArrayItem({ arrayPath, indexPath, key, ...props })}
            </div>
          );
        })}
        <Button
          basic
          secondary
          type="button"
          onClick={() => arrayHelpers.push(defaultNewValue)}
        >
          <Icon name="add" />
          {addButtonLabel}
        </Button>
      </Form.Field>
    );
  };

  render() {
    const { fieldPath } = this.props;
    return <FieldArray name={fieldPath} component={this.renderFormField} />;
  }
}

ArrayField.propTypes = {
  fieldPath: PropTypes.string.isRequired,
  label: PropTypes.string,
  addButtonLabel: PropTypes.string,
  defaultNewValue: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    .isRequired,
  renderArrayItem: PropTypes.func.isRequired,
  startWithItem: PropTypes.bool,
};

ArrayField.defaultProps = {
  label: '',
  addButtonLabel: 'Add new row',
  startWithItem: false,
};
