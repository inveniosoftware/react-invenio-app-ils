import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import { Accordion, Form, Icon } from 'semantic-ui-react';
import { ErrorIcon } from './ErrorIcon';

export class AccordionField extends Component {
  state = { active: false };

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
      <Accordion styled fluid index={0}>
        <Accordion.Title
          as="label"
          onClick={() => this.handleClick(active)}
          active={active}
        >
          <Icon name="dropdown" />
          {hasError && <ErrorIcon />}
          <label>{label}</label>
        </Accordion.Title>
        <Form.Field required={required}>
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
