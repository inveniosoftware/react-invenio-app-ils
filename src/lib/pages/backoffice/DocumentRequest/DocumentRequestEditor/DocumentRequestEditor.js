import { documentRequestApi } from '@api/documentRequests';
import { withCancel } from '@api/utils';
import { Error } from '@components/Error';
import { Loader } from '@components/Loader';
import { RJSForm } from '@forms/rjsf/RJSForm';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { schema } from './schema';
import { uiSchema } from './uiSchema';

export class DocumentRequestEditor extends Component {
  constructor(props) {
    super(props);

    const isEditing = !!props.match.params.documentRequestPid;
    this.state = {
      data: {},
      isLoading: isEditing,
      error: {},
    };
  }

  componentDidMount() {
    const { match } = this.props;
    if (match.params.documentRequestPid) {
      this.fetchDocReq(match.params.documentRequestPid);
    }
  }

  componentWillUnmount() {
    this.cancellableFetchItem && this.cancellableFetchItem.cancel();
  }

  fetchDocReq = async (documentRequestPid) => {
    this.cancellableFetchItem = withCancel(
      documentRequestApi.get(documentRequestPid)
    );
    try {
      const response = await this.cancellableFetchItem.promise;
      this.setState({ data: response.data, isLoading: false, error: {} });
    } catch (error) {
      if (error !== 'UNMOUNTED') {
        this.setState({ isLoading: false, error: error });
      }
    }
  };

  onSubmit(formData) {
    console.log('submit', formData);
  }

  render() {
    const {
      match: {
        params: { documentRequestPid },
      },
    } = this.props;
    const { isLoading, error, data } = this.state;

    const isEditing = !!documentRequestPid;
    const formTitle = isEditing
      ? `New document request - Edit #${documentRequestPid}`
      : 'New document request - Create';
    return isEditing ? (
      <Loader isLoading={isLoading}>
        <Error error={error}>
          <RJSForm
            schema={schema}
            uiSchema={uiSchema(formTitle)}
            formData={data.metadata}
            submitAction={this.onSubmit}
          />
        </Error>
      </Loader>
    ) : (
      <RJSForm
        schema={schema}
        uiSchema={uiSchema(formTitle)}
        submitAction={this.onSubmit}
      />
    );
  }
}

DocumentRequestEditor.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      documentRequestPid: PropTypes.string,
    }),
  }).isRequired,
};
