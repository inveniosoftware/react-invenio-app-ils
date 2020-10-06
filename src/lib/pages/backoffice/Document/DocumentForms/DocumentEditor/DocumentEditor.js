import { documentApi } from '@api/documents';
import { withCancel } from '@api/utils';
import { Error } from '@components/Error';
import { Loader } from '@components/Loader';
import _get from 'lodash/get';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { DocumentForm } from './DocumentForm';

export class DocumentEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      isLoading: !!props.match.params.documentPid,
      error: {},
    };
  }

  componentDidMount() {
    const {
      match: {
        params: { documentPid },
      },
    } = this.props;
    if (documentPid) {
      this.fetchDocument(documentPid);
    }
  }

  componentWillUnmount() {
    this.cancellableFetchDocument && this.cancellableFetchDocument.cancel();
  }

  get documentRequest() {
    const request = _get(this.props, 'location.state', null);
    if (!request) return null;
    return {
      documentRequestPid: request.pid,
      metadata: {
        title: _get(request, 'metadata.title'),
        // NOTE: serializing authors for the document form
        authors: [{ full_name: _get(request, 'metadata.authors') }],
        journalTitle: _get(request, 'metadata.journal_title'),
        edition: _get(request, 'metadata.edition'),
        publication_year: String(_get(request, 'metadata.publication_year')),
      },
    };
  }

  fetchDocument = async documentPid => {
    this.cancellableFetchDocument = withCancel(documentApi.get(documentPid));
    try {
      const response = await this.cancellableFetchDocument.promise;
      this.setState({ data: response.data, isLoading: false, error: {} });
    } catch (error) {
      if (error !== 'UNMOUNTED') {
        this.setState({ isLoading: false, error: error });
      }
    }
  };

  renderEditForm = pid => {
    const { isLoading, error, data } = this.state;
    return (
      <Loader isLoading={isLoading}>
        <Error error={error}>
          <DocumentForm
            pid={pid}
            data={data}
            title="Edit document"
            successSubmitMessage="The document was successfully updated."
          />
        </Error>
      </Loader>
    );
  };

  render() {
    const {
      match: {
        params: { documentPid },
      },
    } = this.props;
    const isEditForm = !!documentPid;
    return isEditForm ? (
      this.renderEditForm(documentPid)
    ) : (
      <DocumentForm
        isCreate
        title="Create new document"
        successSubmitMessage="The document was successfully created."
        data={this.documentRequest}
      />
    );
  }
}

DocumentEditor.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      documentPid: PropTypes.string,
    }),
  }).isRequired,
};
