import { documentRequestApi } from '@api/documentRequests/documentRequest';
import { searchReady } from '@api/utils';
import { AuthenticationGuard } from '@authentication/components/AuthenticationGuard';
import { invenioConfig } from '@config';
import { BaseForm } from '@forms/core/BaseForm';
import { YearInputField } from '@forms/core/DateTimeFields';
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
import { Container, Divider, Form, Header, Segment } from 'semantic-ui-react';

class DocumentRequestForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        title: getIn(props, 'location.state.queryString', ''),
        medium: getIn(props, 'location.state.formData.medium', ''),
        ...props.location.state?.formData,
      },
    };
  }

  onSerializeSubmit = (values) => {
    const {
      user: { id },
    } = this.props;
    return {
      ...values,
      patron_pid: id,
    };
  };

  createDocumentRequest = async (data) => {
    const response = await documentRequestApi.create(data);
    await searchReady();
    return response;
  };

  onSubmitSuccess = () => {
    goTo(FrontSiteRoutes.patronProfile);
  };

  renderForm() {
    const { data } = this.state;
    const {
      title,
      medium,
      journalTitle,
      authors,
      isbn,
      issn,
      edition,
      volume,
      issue,
      standardNumber,
      page,
      publicationYear,
      requestType,
      paymentMethod,
      paymentInfo,
      notes,
      publisher,
    } = this.props;
    const buttons = [
      {
        name: 'Submit',
        content: 'Submit',
        primary: true,
        type: 'submit',
        floated: 'right',
        className: 'formik-button-margin',
      },
    ];

    return (
      <BaseForm
        initialValues={data}
        submitSerializer={this.onSerializeSubmit}
        successCallback={this.onSubmitSuccess}
        successSubmitMessage="Your book request has been sent to the library."
        createApiMethod={this.createDocumentRequest}
        buttons={buttons}
      >
        <Form.Group className="form-group">
          <StringField
            fieldPath="title"
            label={title.label}
            placeholder={title.placeholder}
            required
            width={14}
            customLabel={title.customLabel}
          />
          <VocabularyField
            type={invenioConfig.VOCABULARIES.documentRequests.doc_req_medium}
            fieldPath="medium"
            label={medium.label}
            placeholder={medium.placeholder}
            required
            width={4}
            customLabel={medium.customLabel}
          />
          <VocabularyField
            type={invenioConfig.VOCABULARIES.documentRequests.doc_req_type}
            fieldPath="request_type"
            label={requestType.label}
            placeholder={requestType.placeholder}
            required
            width={4}
            customLabel={requestType.customLabel}
          />
        </Form.Group>
        <Divider className="grey-color" horizontal>
          Additional information
        </Divider>
        <Form.Group className="form-group">
          <StringField
            fieldPath="authors"
            label={authors.label}
            placeholder={authors.placeholder}
            width={13}
            customLabel={authors.customLabel}
          />
          <YearInputField
            fieldPath="publication_year"
            label={publicationYear.label}
            placeholder={publicationYear.placeholder}
          />
        </Form.Group>
        <Form.Group className="form-group" width="equals">
          <StringField
            fieldPath="journal_title"
            label={journalTitle.label}
            placeholder={journalTitle.placeholder}
            customLabel={journalTitle.customLabel}
          />
          <StringField
            customLabel={issn.customLabel}
            label={issn.label}
            fieldPath="issn"
            placeholder={issn.placeholder}
          />
        </Form.Group>
        <Form.Group className="form-group" width="equals">
          <StringField
            fieldPath="volume"
            label={volume.label}
            placeholder={volume.placeholder}
            customLabel={volume.customLabel}
          />
          <StringField
            fieldPath="issue"
            label={issue.label}
            placeholder={issue.placeholder}
            customLabel={issue.customLabel}
          />
          <StringField
            fieldPath="page"
            label={page.label}
            placeholder={page.placeholder}
            customLabel={page.customLabel}
          />
        </Form.Group>
        <Form.Group className="form-group" widths="equal">
          <StringField
            fieldPath="publisher"
            label={publisher.label}
            placeholder={publisher.placeholder}
            customLabel={publisher.customLabel}
          />
          <StringField
            fieldPath="edition"
            label={edition.label}
            placeholder={edition.placeholder}
            customLabel={edition.customLabel}
          />
          <StringField
            fieldPath="standard_number"
            label={standardNumber.label}
            placeholder={standardNumber.placeholder}
            customLabel={standardNumber.customLabel}
          />
          <StringField
            fieldPath="isbn"
            label={isbn.label}
            placeholder={isbn.placeholder}
            customLabel={isbn.customLabel}
          />
        </Form.Group>
        <Form.Group className="form-group">
          <VocabularyField
            type={
              invenioConfig.VOCABULARIES.documentRequests.doc_req_payment_method
            }
            fieldPath="payment_method"
            label={paymentMethod.label}
            placeholder={paymentMethod.placeholder}
            width={4}
            customLabel={paymentMethod.customLabel}
          />
          <StringField
            fieldPath="payment_info"
            label={paymentInfo.label}
            placeholder={paymentInfo.placeholder}
            width={12}
            customLabel={paymentInfo.customLabel}
          />
        </Form.Group>
        <TextField
          label={notes.label}
          customLabel={notes.customLabel}
          fieldPath="note"
          placeholder={notes.placeholder}
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
              Fill in the form below to request new literature from the library.
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
  title: PropTypes.object,
  medium: PropTypes.object,
  journalTitle: PropTypes.object,
  authors: PropTypes.object,
  isbn: PropTypes.object,
  issn: PropTypes.object,
  edition: PropTypes.object,
  volume: PropTypes.object,
  issue: PropTypes.object,
  standardNumber: PropTypes.object,
  page: PropTypes.object,
  publicationYear: PropTypes.object,
  requestType: PropTypes.object,
  paymentMethod: PropTypes.object,
  paymentInfo: PropTypes.object,
  notes: PropTypes.object,
  publisher: PropTypes.object,
  location: PropTypes.object,
};

DocumentRequestForm.defaultProps = {
  title: {
    label: 'Title',
    placeholder: 'Title',
  },
  medium: {
    label: 'Format',
    placeholder: 'Select format ...',
  },
  journalTitle: {
    label: 'Journal title',
    placeholder: 'Journal title',
  },
  authors: {
    label: 'Authors',
    placeholder: 'Authors',
  },
  isbn: {
    label: 'ISBN',
    placeholder: 'ISBN',
  },
  issn: {
    label: 'ISSN',
    placeholder: 'ISSN',
  },
  edition: {
    label: 'Edition',
    placeholder: 'Edition number',
  },
  volume: {
    label: 'Volume',
    placeholder: 'Volume number',
  },
  issue: {
    label: 'Issue',
    placeholder: 'Issue number',
  },
  standardNumber: {
    label: 'Standard number',
    placeholder: 'Standard number',
  },
  page: {
    label: 'Page',
    placeholder: 'Page number',
  },
  publicationYear: {
    label: 'Publication Year',
    placeholder: 'Publication Year',
  },
  requestType: {
    label: 'Request type',
    placeholder: 'Select type...',
  },
  paymentMethod: {
    label: 'Payment method (if purchase)',
    placeholder: 'Select method...',
  },
  paymentInfo: {
    label: 'Payment information (if purchase)',
    placeholder: 'Any relevant information about the payment',
  },
  notes: {
    label: 'Notes',
    placeholder: 'Notes for the library',
  },
  publisher: {
    label: 'Publisher',
    placeholder: 'Publisher',
  },
};

export default Overridable.component(
  'DocumentRequestForm',
  DocumentRequestForm
);
