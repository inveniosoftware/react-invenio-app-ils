import { providerApi } from '@api/providers';
import { withCancel } from '@api/utils';
import { Error } from '@components/Error';
import { Loader } from '@components/Loader';
import { RJSForm } from '@forms/rjsf';
import { goTo } from '@history';
import { ProviderRoutes } from '@routes/urls';
import _get from 'lodash/get';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { schema } from './schema';
import { uiSchema } from './uiSchema';

export class ProviderEditor extends Component {
  constructor(props) {
    super(props);

    const isEditing = !!props.match.params.providerPid;
    this.state = {
      data: {},
      isLoading: isEditing,
      error: {},
    };
  }

  componentDidMount() {
    const { match } = this.props;
    if (match.params.providerPid) {
      this.fetchProvider(match.params.providerPid);
    }
  }

  componentWillUnmount() {
    this.cancellableFetchProvider && this.cancellableFetchProvider.cancel();
  }

  fetchProvider = async (providerPid) => {
    this.cancellableFetchProvider = withCancel(providerApi.get(providerPid));
    try {
      const response = await this.cancellableFetchProvider.promise;
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
        params: { providerPid },
      },
    } = this.props;

    const isEditing = !!providerPid;
    return isEditing
      ? await providerApi.update(providerPid, formData)
      : await providerApi.create(formData);
  };

  successCallback = (response) => {
    goTo(ProviderRoutes.providerDetailsFor(response.data.metadata.pid));
  };

  render() {
    const {
      match: {
        params: { providerPid },
      },
    } = this.props;
    const { isLoading, error, data } = this.state;

    const isEditing = !!providerPid;
    if (isEditing) {
      const formTitle = `Provider - Edit #${providerPid}`;
      return (
        <Loader isLoading={isLoading}>
          <Error error={error}>
            <RJSForm
              schema={schema()}
              uiSchema={uiSchema(formTitle)}
              formData={data.metadata}
              submitAction={this.submitAction}
              successCallback={this.successCallback}
              successMessage="The provider was successfully updated."
            />
          </Error>
        </Loader>
      );
    } else {
      const formTitle = 'Provider - Create';
      const prefilledFormData = _get(this.props, 'location.state.formData', {});
      return (
        <RJSForm
          schema={schema()}
          uiSchema={uiSchema(formTitle)}
          formData={prefilledFormData}
          submitAction={this.submitAction}
          successCallback={this.successCallback}
          successMessage="The provider was successfully created."
        />
      );
    }
  }
}

ProviderEditor.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      providerPid: PropTypes.string,
    }),
  }).isRequired,
  location: PropTypes.shape({
    state: PropTypes.shape({
      formData: PropTypes.object,
      extraData: PropTypes.object,
    }),
  }),
};

ProviderEditor.defaultProps = {
  location: {
    state: null,
  },
};
