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

  fetchDocument = async (documentPid) => {
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

  render() {
    const {
      match: {
        params: { documentPid },
      },
    } = this.props;
    const isEditForm = !!documentPid;
    if (isEditForm) {
      const { isLoading, error, data } = this.state;
      return (
        <Loader isLoading={isLoading}>
          <Error error={error}>
            <DocumentForm
              pid={documentPid}
              data={data}
              title="Edit document"
              successSubmitMessage="The document was successfully updated."
            />
          </Error>
        </Loader>
      );
    } else {
      const extraData = _get(this.props, 'location.state.extraData', {});
      const prefilledFormData = _get(this.props, 'location.state.formData', {});
      return (
        <DocumentForm
          isCreate
          title="Create new document"
          successSubmitMessage="The document was successfully created."
          data={{ extraData: extraData, metadata: prefilledFormData }}
        />
      );
    }
  }
}

DocumentEditor.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      documentPid: PropTypes.string,
    }),
  }).isRequired,
  location: PropTypes.shape({
    state: PropTypes.shape({
      formData: PropTypes.object,
      extraData: PropTypes.object,
    }),
  }),
};

DocumentEditor.defaultProps = {
  location: {
    state: null,
  },
};
