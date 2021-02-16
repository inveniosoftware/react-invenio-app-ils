import {
  ArrayFieldTemplateWithWrapper,
  FieldTemplateWithWrapper,
  ObjectFieldTemplateWithGrid,
} from '@forms/rjsf/RJSFCustomTemplates';
import { RJSFReferencedDocument } from '@forms/rjsf/widgets/RJSFReferencedDocument';
import { RJSFReferencedPatron } from '@forms/rjsf/widgets/RJSFReferencedPatron';
import { RJSFVocabulary } from '@forms/rjsf/widgets/RJSFVocabulary';
import { RJSFVocabularySearch } from '@forms/rjsf/widgets/RJSFVocabularySearch';
import Form from '@rjsf/semantic-ui';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Button, Container, Divider } from 'semantic-ui-react';

const widgets = {
  referencedDocument: RJSFReferencedDocument,
  referencedPatron: RJSFReferencedPatron,
  vocabularySearch: RJSFVocabularySearch,
  vocabulary: RJSFVocabulary,
};

export class RJSForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      errors: {},
    };
  }

  getGenericError(message) {
    return { Error: { __errors: [message] } };
  }

  onError(error) {
    let extraErrors = {};
    const errors = _get(error, 'response.data.errors', []);
    if (_isEmpty(errors)) {
      // show a generic error message
      const message = _get(error, 'response.data.message', 'Unknown error');
      extraErrors = this.getGenericError(message);
    } else {
      // prepare errors for the form
      for (const fieldError of errors) {
        // if the field is empty, the error was thrown by the backend
        // after validating via Marshmallow loaders
        if (_isEmpty(fieldError.field)) {
          // it should be displayed only at the top of the form
          extraErrors = this.getGenericError(fieldError.message);
          break;
        }
        extraErrors[fieldError.field] = {
          __errors: [fieldError.message],
        };
      }
    }
    this.setState({ isLoading: false, errors: extraErrors });
  }

  onSubmit = async ({ formData }, _) => {
    const {
      sendSuccessNotification,
      submitAction,
      successCallback,
      successMessage,
    } = this.props;

    try {
      this.setState({ isLoading: true });
      const response = await submitAction(formData);

      // scroll to top to see success notification
      window.scrollTo(0, 0);
      sendSuccessNotification('Success!', successMessage);
      successCallback && successCallback(response);
    } catch (error) {
      // scroll to top to see errors
      window.scrollTo(0, 0);
      this.onError(error);
    }
  };

  render() {
    const { schema, uiSchema, formData } = this.props;
    const { errors, isLoading } = this.state;
    return (
      <Form
        schema={schema}
        uiSchema={uiSchema}
        formData={formData}
        widgets={widgets}
        extraErrors={errors}
        ObjectFieldTemplate={ObjectFieldTemplateWithGrid}
        FieldTemplate={FieldTemplateWithWrapper}
        ArrayFieldTemplate={ArrayFieldTemplateWithWrapper}
        onSubmit={this.onSubmit}
      >
        <Container textAlign="right">
          <Divider hidden />
          <Button
            primary
            name="submit"
            type="submit"
            content="Submit"
            loading={isLoading}
          />
        </Container>
      </Form>
    );
  }
}

RJSForm.propTypes = {
  schema: PropTypes.object.isRequired,
  uiSchema: PropTypes.object.isRequired,
  formData: PropTypes.object,
  submitAction: PropTypes.func.isRequired,
  successCallback: PropTypes.func,
  sendSuccessNotification: PropTypes.func.isRequired,
  successMessage: PropTypes.string.isRequired,
};

RJSForm.defaultProps = {
  formData: {},
  successCallback: null,
};
