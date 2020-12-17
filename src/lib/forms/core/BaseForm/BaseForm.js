import { ErrorMessage } from '@forms/core/ErrorMessage';
import { Formik, getIn } from 'formik';
import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Button, Form, Header } from 'semantic-ui-react';
import { removeEmptyValues } from './RecordSerializer';

export class BaseForm extends Component {
  submitSerializer = (values) => {
    const { pid, submitSerializer } = this.props;
    const { _submitButton, ...rawValues } = values;
    const newRecord = !!pid;
    const serializedValues = submitSerializer
      ? submitSerializer(rawValues, newRecord)
      : { ...rawValues };
    return [serializedValues, _submitButton];
  };

  onSubmit = async (values, actions) => {
    const {
      pid,
      editApiMethod,
      createApiMethod,
      sendSuccessNotification,
      successSubmitMessage,
      successCallback,
    } = this.props;
    const [submitValues, submitButton] = this.submitSerializer(values);
    try {
      actions.setSubmitting(true);
      const response = pid
        ? await editApiMethod(pid, submitValues)
        : await createApiMethod(submitValues);

      sendSuccessNotification('Success!', successSubmitMessage);
      if (successCallback) {
        successCallback(response, submitButton);
      }
    } catch (error) {
      const errors = getIn(error, 'response.data.errors', []);

      if (_isEmpty(errors)) {
        const message = getIn(
          error,
          'response.data.message',
          getIn(error, 'message', 'Unknown error')
        );
        actions.setSubmitting(false);
        actions.setErrors({ message });
      } else {
        const errorData = error.response.data;
        const payload = {};
        for (const fieldError of errorData.errors) {
          payload[fieldError.field] = fieldError.message;
        }
        actions.setErrors(payload);
        actions.setSubmitting(false);
      }
    }
  };

  submitForm = (event, buttonName, submitForm, values) => {
    if (values) {
      values._submitButton = buttonName;
    }
    removeEmptyValues(values);
    submitForm();
  };

  renderButtons = (isSubmitting, submitForm, values) => {
    const buttons = getIn(this.props, 'buttons', []);

    return buttons.map(({ name, ...props }) => (
      <Button
        key={name}
        name={name}
        disabled={isSubmitting}
        type="button"
        {...props}
      />
    ));
  };

  render() {
    const {
      buttons,
      initialValues,
      title,
      onSubmit,
      children,
      validationSchema,
    } = this.props;
    return (
      <>
        <Header textAlign="center">{title}</Header>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit || this.onSubmit}
          validationSchema={validationSchema}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {({ isSubmitting, handleSubmit, submitForm, values }) => (
            <Form
              onSubmit={(event) =>
                this.submitForm(event, 'submit', submitForm, values)
              }
              loading={isSubmitting}
            >
              <ErrorMessage />
              {children}
              {buttons ? (
                this.renderButtons(isSubmitting, submitForm, values)
              ) : (
                <Button
                  primary
                  disabled={isSubmitting}
                  name="submit"
                  type="submit"
                  content="Submit"
                />
              )}
            </Form>
          )}
        </Formik>
      </>
    );
  }
}

BaseForm.propTypes = {
  children: PropTypes.node,
  initialValues: PropTypes.object,
  successSubmitMessage: PropTypes.string,
  successCallback: PropTypes.func,
  sendSuccessNotification: PropTypes.func.isRequired,
  createApiMethod: PropTypes.func,
  editApiMethod: PropTypes.func,
  submitSerializer: PropTypes.func,
  title: PropTypes.string,
  pid: PropTypes.string,
  validationSchema: PropTypes.object,
  onSubmit: PropTypes.func,
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    })
  ),
};

BaseForm.defaultProps = {
  children: null,
  initialValues: null,
  successSubmitMessage: '',
  successCallback: null,
  createApiMethod: null,
  editApiMethod: null,
  submitSerializer: null,
  title: '',
  pid: '',
  validationSchema: null,
  onSubmit: null,
  buttons: null,
};
