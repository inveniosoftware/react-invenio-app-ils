import { documentRequestApi } from '@api/documentRequests/documentRequest';
import { delay } from '@api/utils';
import { AuthenticationGuard } from '@authentication/components/AuthenticationGuard';
import { invenioConfig } from '@config';
import { BaseForm } from '@forms/core/BaseForm';
import { YearInputField } from '@forms/core/DateTimeFields';
import { GroupField } from '@forms/core/GroupField';
import { StringField } from '@forms/core/StringField';
import { TextField } from '@forms/core/TextField';
import { VocabularyField } from '@forms/core/VocabularyField';
import { goTo } from '@history';
import { FrontSiteRoutes } from '@routes/urls';
import { getIn } from 'formik';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Overridable from 'react-overridable';
import { Link } from 'react-router-dom';
import { Container, Header, Segment } from 'semantic-ui-react';
import * as Yup from 'yup';

const ERROR_MSGS = {
  publication_year: 'Not a valid year',
};

const RequestSchema = Yup.object().shape({
  title: Yup.string().required(),
  publication_year: Yup.number()
    .typeError(ERROR_MSGS.publication_year)
    .integer(ERROR_MSGS.publication_year),
});

class DocumentRequestForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        title: getIn(props, 'location.state.queryString', ''),
      },
    };
  }

  onSerializeSubmit = values => {
    const {
      user: { id },
    } = this.props;
    return {
      ...values,
      patron_pid: id,
    };
  };

  createDocumentRequest = async data => {
    const response = await documentRequestApi.create(data);
    await delay();
    return response;
  };

  onSubmitSuccess = () => {
    goTo(FrontSiteRoutes.patronProfile);
  };

  renderForm() {
    const { data } = this.state;
    return (
      <BaseForm
        initialValues={data}
        validationSchema={RequestSchema}
        submitSerializer={this.onSerializeSubmit}
        successCallback={this.onSubmitSuccess}
        successSubmitMessage="Your book request has been sent to the library."
        createApiMethod={this.createDocumentRequest}
      >
        <GroupField>
          <StringField
            fieldPath="title"
            label="Title"
            placeholder="Title"
            required
            width={14}
          />
          <VocabularyField
            type={invenioConfig.vocabularies.documentRequests.doc_req_medium}
            fieldPath="medium"
            label="Medium type"
            placeholder="Select medium..."
            required
            width={4}
          />
        </GroupField>
        <StringField
          fieldPath="journal_title"
          label="Journal title"
          placeholder="Journal title"
        />
        <StringField
          fieldPath="authors"
          label="Authors"
          placeholder="Authors"
        />
        <GroupField widths="equal">
          <StringField fieldPath="isbn" label="ISBN" placeholder="ISBN" />
          <StringField fieldPath="issn" label="ISSN" placeholder="ISSN" />
        </GroupField>
        <GroupField widths="equal">
          <StringField
            fieldPath="edition"
            label="Edition"
            placeholder="Edition number"
          />
          <StringField
            fieldPath="volume"
            label="Volume"
            placeholder="Volume number"
          />
          <StringField
            fieldPath="issue"
            label="Issue"
            placeholder="Issue number"
          />
          <StringField
            fieldPath="standard_number"
            label="Standard number"
            placeholder="Standard number"
          />
        </GroupField>
        <GroupField widths="equal">
          <StringField
            fieldPath="page"
            label="Page"
            placeholder="Page number"
          />
          <YearInputField
            fieldPath="publication_year"
            label="Publication Year"
            placeholder="Publication Year"
          />
        </GroupField>
        <GroupField>
          <VocabularyField
            type={invenioConfig.vocabularies.documentRequests.doc_req_type}
            fieldPath="request_type"
            label="Request type"
            placeholder="Select type..."
            required
            width={4}
          />
          <VocabularyField
            type={
              invenioConfig.vocabularies.documentRequests.doc_req_payment_method
            }
            fieldPath="payment_method"
            label="Payment method"
            placeholder="Select method..."
            width={4}
          />
          <StringField
            fieldPath="payment_info"
            label="Payment information"
            placeholder="Payment information"
            width={8}
          />
        </GroupField>
        <TextField
          fieldPath="note"
          label="Note"
          placeholder="Notes for the library"
          rows={5}
        />
      </BaseForm>
    );
  }

  renderAuthorized() {
    return (
      <Container id="document-request" className="spaced">
        <Overridable id="DocumentRequestForm.header">
          <>
            <Header as="h1">Request new literature</Header>
            <p>
              Fill in the form below to request a new literature from the
              library.
            </p>
            <p>
              You can see all your requests on your{' '}
              <Link to={FrontSiteRoutes.patronProfile}>profile</Link> page.
            </p>
          </>
        </Overridable>
        <Segment>{this.renderForm()}</Segment>
      </Container>
    );
  }
  render() {
    return (
      <AuthenticationGuard
        authorizedComponent={() => this.renderAuthorized()}
      />
    );
  }
}

DocumentRequestForm.propTypes = {
  user: PropTypes.object.isRequired,
};

export default Overridable.component(
  'DocumentRequestForm',
  DocumentRequestForm
);
