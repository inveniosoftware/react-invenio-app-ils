import { RJSFDocumentRequestProvider } from '@forms/rjsf/fields/RJSFDocumentRequestProvider';
import { RJSFTitleField } from '@forms/rjsf/fields/RJSFTitleField';
import {
  FieldTemplateWithWrapper,
  ObjectFieldTemplateWrapperGrid,
} from '@forms/rjsf/RJSFCustomTemplates';
import { RJSFReferencedAcqVendor } from '@forms/rjsf/widgets/RJSFReferencedAcqVendor';
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
import { removeEmptyValues } from './RecordSerializer';

const customWidgets = {
  referencedDocument: RJSFReferencedDocument,
  referencedPatron: RJSFReferencedPatron,
  referencedAcqVendor: RJSFReferencedAcqVendor,
  vocabularySearch: RJSFVocabularySearch,
  vocabulary: RJSFVocabulary,
  documentRequestProvider: RJSFDocumentRequestProvider,
};

const customFields = {
  TitleField: RJSFTitleField,
  documentRequestProvider: RJSFDocumentRequestProvider,
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

    formData = removeEmptyValues(formData);

    try {
      this.setState({ isLoading: true });
      const response = await submitAction(formData);

      sendSuccessNotification('Success!', successMessage);
      successCallback && successCallback(response);
    } catch (error) {
      this.onError(error);
    }
    // scroll to top to see success/errors after backend call
    window.scrollTo(0, 0);
  };

  render() {
    const { schema, uiSchema, formData } = this.props;
    const { errors, isLoading } = this.state;
    return (
      <Form
        schema={schema}
        uiSchema={uiSchema}
        formData={formData}
        widgets={customWidgets}
        fields={customFields}
        transformErrors={(errors) => {
          // scroll to top to see errors triggered by client validation
          window.scrollTo(0, 0);
          return errors;
        }}
        extraErrors={errors}
        ObjectFieldTemplate={ObjectFieldTemplateWrapperGrid}
        FieldTemplate={FieldTemplateWithWrapper}
        // ArrayFieldTemplate={ArrayFieldTemplateWithWrapper}
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
