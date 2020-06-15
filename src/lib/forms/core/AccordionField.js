import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import { Accordion, Form, Icon } from 'semantic-ui-react';
import { ErrorIcon } from './ErrorIcon';

export class AccordionField extends Component {
  state = { active: false };

  iconActive = (
    <Icon name="angle down" size="large" style={{ float: 'right' }} />
  );

  iconInactive = (
    <Icon name="angle right" size="large" style={{ float: 'right' }} />
  );

  handleClick = showContent => {
    this.setState({ active: !showContent });
  };

  hasError(errors) {
    const { fieldPath } = this.props;
    if (fieldPath in errors) {
      return true;
    }
    for (const errorPath in errors) {
      if (errorPath.startsWith(fieldPath)) {
        return true;
      }
    }
    return false;
  }

  renderAccordion = props => {
    const {
      form: { errors, status },
    } = props;
    const { required, label, content } = this.props;
    const { active } = this.state;
    const hasError = status ? this.hasError(status) : this.hasError(errors);

    return (
      <Accordion fluid index={0}>
        <Form.Field required={required}>
          <Accordion.Title as="label" onClick={() => this.handleClick(active)}>
            {hasError && <ErrorIcon />}
            <label>{label}</label>
            <span>{active ? this.iconActive : this.iconInactive}</span>
          </Accordion.Title>
          <Accordion.Content active={active}>
            {active && content}
          </Accordion.Content>
        </Form.Field>
      </Accordion>
    );
  };

  render() {
    const { fieldPath } = this.props;
    return <Field name={fieldPath} component={this.renderAccordion} />;
  }
}

AccordionField.propTypes = {
  content: PropTypes.object.isRequired,
  fieldPath: PropTypes.string.isRequired,
  label: PropTypes.string,
  required: PropTypes.bool,
};

AccordionField.defaultProps = {
  label: '',
  required: false,
};
