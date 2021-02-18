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

  getPrefilledFormData() {
    const shouldPrefillForm = _get(
      this.props,
      'location.state.prefillForm',
      false
    );

    if (shouldPrefillForm) {
      const {
        location: { state },
      } = this.props;
      const { formData } = state;

      // prepare the data for the form editor
      return {
        extraData: _get(state, 'extraData', {}),
        metadata: {
          ...formData,
        },
      };
    }
    return null;
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

  renderEditForm = (pid) => {
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
        data={this.getPrefilledFormData()}
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
