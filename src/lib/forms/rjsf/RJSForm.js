import {
  FieldTemplateWithWrapper,
  ObjectFieldTemplateWithGrid,
} from '@forms/rjsf/RJSFCustomTemplates';
import { RJSFVocabulary } from '@forms/rjsf/widgets/RJSFVocabulary';
import { RJSFVocabularySearch } from '@forms/rjsf/widgets/RJSFVocabularySearch';
import Form from '@rjsf/semantic-ui';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Button, Container, Divider } from 'semantic-ui-react';

const widgets = {
  vocabularySearch: RJSFVocabularySearch,
  vocabulary: RJSFVocabulary,
};

export class RJSForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {},
    };
  }

  onError(error) {
    const errors = _get(error, 'response.data.errors', []);
    if (_isEmpty(errors)) {
      // TODO: unknown error here
      const messages = _get(error, 'response.data.message', {});
      const message = _get(messages, 'Unknown', 'Unknown error');
      throw new Error(message);
    } else {
      // prepare errors for the form
      const errorData = error.response.data;
      const extraErrors = {};
      for (const fieldError of errorData.errors) {
        extraErrors[fieldError.field] = {
          __errors: [fieldError.message],
        };
      }
      this.setState({ errors: extraErrors });
    }
  }

  onSubmit = async ({ formData }, _) => {
    const { submitAction, successCallback } = this.props;
    try {
      const response = await submitAction(formData);

      // sendSuccessNotification('Success!', successMessage);
      successCallback && successCallback(response);
    } catch (error) {
      this.onError(error);
    }
  };

  render() {
    const { schema, uiSchema, formData } = this.props;
    const { errors } = this.state;
    return (
      <Form
        schema={schema}
        uiSchema={uiSchema}
        formData={formData}
        widgets={widgets}
        extraErrors={errors}
        ObjectFieldTemplate={ObjectFieldTemplateWithGrid}
        FieldTemplate={FieldTemplateWithWrapper}
        // ArrayFieldTemplate={ArrayFieldTemplateWithWrapper}
        onSubmit={this.onSubmit}
      >
        <Container textAlign="right">
          <Divider hidden />
          <Button primary name="submit" type="submit" content="Submit" />
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
  // successMessage: PropTypes.string.isRequired,
};

RJSForm.defaultProps = {
  formData: {},
  successCallback: null,
};
