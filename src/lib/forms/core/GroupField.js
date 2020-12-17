import React from 'react';
import PropTypes from 'prop-types';
import { Field, getIn } from 'formik';
import { Form } from 'semantic-ui-react';

export class GroupField extends React.Component {
  hasGroupErrors = (errors) => {
    const { fieldPath } = this.props;
    for (const field in errors) {
      if (field.startsWith(fieldPath)) {
        return true;
      }
    }
    return false;
  };

  renderBasicField = (action, classNames, children) => {
    return (
      <div className={classNames.join(' ')}>
        {action && <div className="group-action">{action}</div>}
        {children}
      </div>
    );
  };

  renderFormField = (props) => {
    const {
      action,
      basic,
      border,
      children,
      fieldPath,
      ...uiProps
    } = this.props;
    const errors = getIn(props, 'form.errors');
    const classNames = ['form-group'];
    if (border) {
      classNames.push('border');
    }
    if (fieldPath && this.hasGroupErrors(errors)) {
      classNames.push('error');
    }

    if (basic) {
      return this.renderBasicField(action, classNames, children);
    }

    return (
      <Form.Group className={classNames.join(' ')} {...uiProps}>
        {action && <div className="group-action">{action}</div>}
        {children}
      </Form.Group>
    );
  };

  render() {
    const { fieldPath } = this.props;
    return <Field name={fieldPath} component={this.renderFormField} />;
  }
}

GroupField.propTypes = {
  border: PropTypes.bool,
  fieldPath: PropTypes.string,
  action: PropTypes.node,
  children: PropTypes.node,
  basic: PropTypes.bool,
};

GroupField.defaultProps = {
  border: false,
  children: null,
};
