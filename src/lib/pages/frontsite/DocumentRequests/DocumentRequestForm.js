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
    } = this.props;
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
            label={title.label}
            placeholder={title.placeholder}
            required
            width={14}
          />
          <VocabularyField
            type={invenioConfig.VOCABULARIES.documentRequests.doc_req_medium}
            fieldPath="medium"
            label={medium.label}
            placeholder={medium.placeholder}
            required
            width={4}
          />
        </GroupField>
        <StringField
          fieldPath="journal_title"
          label={journalTitle.label}
          placeholder={journalTitle.placeholder}
        />
        <StringField
          fieldPath="authors"
          label={authors.label}
          placeholder={authors.placeholder}
        />
        <GroupField widths="equal">
          <StringField
            fieldPath="isbn"
            label={isbn.label}
            placeholder={isbn.placeholder}
          />
          <StringField
            fieldPath="issn"
            label={issn.label}
            placeholder={issn.placeholder}
          />
        </GroupField>
        <GroupField widths="equal">
          <StringField
            fieldPath="edition"
            label={edition.label}
            placeholder={edition.placeholder}
          />
          <StringField
            fieldPath="volume"
            label={volume.label}
            placeholder={volume.placeholder}
          />
          <StringField
            fieldPath="issue"
            label={issue.label}
            placeholder={issue.placeholder}
          />
          <StringField
            fieldPath="standard_number"
            label={standardNumber.label}
            placeholder={standardNumber.placeholder}
          />
        </GroupField>
        <GroupField widths="equal">
          <StringField
            fieldPath="page"
            label={page.label}
            placeholder={page.placeholder}
          />
          <YearInputField
            fieldPath="publication_year"
            label={publicationYear.label}
            placeholder={publicationYear.placeholder}
          />
        </GroupField>
        <GroupField>
          <VocabularyField
            type={invenioConfig.VOCABULARIES.documentRequests.doc_req_type}
            fieldPath="request_type"
            label={requestType.label}
            placeholder={requestType.placeholder}
            required
            width={4}
          />
          <VocabularyField
            type={
              invenioConfig.VOCABULARIES.documentRequests.doc_req_payment_method
            }
            fieldPath="payment_method"
            label={paymentMethod.label}
            placeholder={paymentMethod.placeholder}
            width={4}
          />
          <StringField
            fieldPath="payment_info"
            label={paymentInfo.label}
            placeholder={paymentInfo.placeholder}
            width={8}
          />
        </GroupField>
        <TextField
          fieldPath="note"
          label={notes.label}
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
};

DocumentRequestForm.defaultProps = {
  title: {
    label: 'Title',
    placeholder: 'Title',
  },
  medium: {
    label: 'Medium type',
    placeholder: 'Select medium ...',
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
    label: 'Payment method',
    placeholder: 'Select method...',
  },
  paymentInfo: {
    label: 'Payment information',
    placeholder: 'Payment information',
  },
  notes: {
    label: 'Notes',
    placeholder: 'Notes for the library',
  },
};

export default Overridable.component(
  'DocumentRequestForm',
  DocumentRequestForm
);
