import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { Button } from 'semantic-ui-react';

export class SubForm extends Component {
  render() {
    const {
      initialValues,
      initialErrors,
      initialStatus,
      validationSchema,
      onSubmit,
      render,
      basePath,
      submitButtonText,
      onRemove,
    } = this.props;
    return (
      <Formik
        enableReinitialize
        initialValues={initialValues}
        initialErrors={initialErrors}
        initialStatus={initialStatus}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ submitForm }) => (
          <>
            {render(basePath)}
            <Button
              secondary
              type="button"
              onClick={submitForm}
              content={submitButtonText}
            />
            {onRemove && (
              <Button negative type="button" icon="trash" onClick={onRemove} />
            )}
          </>
        )}
      </Formik>
    );
  }
}

SubForm.propTypes = {
  basePath: PropTypes.string.isRequired,
  initialValues: PropTypes.object,
  onRemove: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
  submitButtonText: PropTypes.string,
  initialErrors: PropTypes.array,
  initialStatus: PropTypes.string,
  validationSchema: PropTypes.object,
  render: PropTypes.func,
};

SubForm.defaultProps = {
  submitButtonText: 'Save',
  initialValues: null,
  onRemove: null,
  initialErrors: null,
  initialStatus: null,
};
