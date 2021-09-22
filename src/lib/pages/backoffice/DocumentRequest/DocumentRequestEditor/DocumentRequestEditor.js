import { documentRequestApi } from '@api/documentRequests';
import { withCancel } from '@api/utils';
import { Error } from '@components/Error';
import { Loader } from '@components/Loader';
import { RJSForm } from '@forms/rjsf';
import { goTo } from '@history';
import { BackOfficeRoutes } from '@routes/urls';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { schema } from './schema';
import { uiSchema } from './uiSchema';

export class DocumentRequestEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      isLoading: this.userIsEditing,
      error: {},
    };
  }

  componentDidMount() {
    const { match } = this.props;
    if (this.userIsEditing) {
      this.fetchDocReq(match.params.documentRequestPid);
    }
  }

  componentWillUnmount() {
    this.cancellableFetchDocReq && this.cancellableFetchDocReq.cancel();
  }

  get userIsEditing() {
    return !!this.props.match.params.documentRequestPid;
  }

  fetchDocReq = async (documentRequestPid) => {
    this.cancellableFetchDocReq = withCancel(
      documentRequestApi.get(documentRequestPid)
    );
    try {
      const response = await this.cancellableFetchDocReq.promise;
      this.setState({ data: response.data, isLoading: false, error: {} });
    } catch (error) {
      if (error !== 'UNMOUNTED') {
        this.setState({ isLoading: false, error: error });
      }
    }
  };

  submitAction = async (formData) => {
    const {
      match: {
        params: { documentRequestPid },
      },
    } = this.props;

    return this.userIsEditing
      ? await documentRequestApi.update(documentRequestPid, formData)
      : await documentRequestApi.create(formData);
  };

  successCallback = (response) => {
    goTo(
      BackOfficeRoutes.documentRequestDetailsFor(response.data.metadata.pid)
    );
  };

  render() {
    const {
      match: {
        params: { documentRequestPid },
      },
    } = this.props;
    const { isLoading, error, data } = this.state;

    const formTitle = this.userIsEditing
      ? `New document request - Edit #${documentRequestPid}`
      : 'New document request - Create';

    return this.userIsEditing ? (
      <Loader isLoading={isLoading}>
        <Error error={error}>
          <RJSForm
            schema={schema()}
            uiSchema={uiSchema(formTitle)}
            formData={data.metadata}
            submitAction={this.submitAction}
            successCallback={this.successCallback}
            successMessage="The new document request was successfully updated."
          />
        </Error>
      </Loader>
    ) : (
      <RJSForm
        schema={schema()}
        uiSchema={uiSchema(formTitle)}
        submitAction={this.submitAction}
        successCallback={this.successCallback}
        successMessage="The new document request was successfully created."
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
