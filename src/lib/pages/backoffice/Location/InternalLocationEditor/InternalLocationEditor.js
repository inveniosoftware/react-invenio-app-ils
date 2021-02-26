import { internalLocationApi } from '@api/locations';
import { searchReady, withCancel } from '@api/utils';
import { Error } from '@components/Error';
import { Loader } from '@components/Loader';
import { RJSForm } from '@forms/rjsf';
import { goTo } from '@history';
import { BackOfficeRoutes } from '@routes/urls';
import _get from 'lodash/get';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { schema } from './schema';
import { uiSchema } from './uiSchema';

export class InternalLocationEditor extends Component {
  constructor(props) {
    super(props);

    const isEditing = !!props.match.params.ilocationPid;
    this.state = {
      data: {},
      isLoading: isEditing,
      error: {},
    };
  }

  componentDidMount() {
    const { match } = this.props;
    if (match.params.ilocationPid) {
      this.fetch(match.params.ilocationPid);
    }
  }

  componentWillUnmount() {
    this.cancellableFetch && this.cancellableFetch.cancel();
  }

  fetch = async (ilocationPid) => {
    this.cancellableFetch = withCancel(internalLocationApi.get(ilocationPid));
    try {
      const response = await this.cancellableFetch.promise;
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
        params: { ilocationPid },
      },
    } = this.props;

    const isEditing = !!ilocationPid;
    return isEditing
      ? await internalLocationApi.update(ilocationPid, formData)
      : await internalLocationApi.create(formData);
  };

  successCallback = async () => {
    await searchReady();
    goTo(BackOfficeRoutes.locationsList);
  };

  render() {
    const {
      match: {
        params: { ilocationPid },
      },
    } = this.props;
    const { isLoading, error, data } = this.state;

    const isEditing = !!ilocationPid;
    if (isEditing) {
      const formTitle = `Internal Location - Edit #${ilocationPid}`;
      return (
        <Loader isLoading={isLoading}>
          <Error error={error}>
            <RJSForm
              schema={schema}
              uiSchema={uiSchema(formTitle)}
              formData={data.metadata}
              submitAction={this.submitAction}
              successCallback={this.successCallback}
              successMessage="The internal location was successfully updated."
            />
          </Error>
        </Loader>
      );
    } else {
      const formTitle = 'Internal Location - Create';
      const prefilledFormData = _get(this.props, 'location.state.formData', {});
      return (
        <RJSForm
          schema={schema}
          uiSchema={uiSchema(formTitle)}
          formData={prefilledFormData}
          submitAction={this.submitAction}
          successCallback={this.successCallback}
          successMessage="The internal location was successfully created."
        />
      );
    }
  }
}

InternalLocationEditor.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      ilocationPid: PropTypes.string,
    }),
  }).isRequired,
  location: PropTypes.shape({
    state: PropTypes.shape({
      formData: PropTypes.object,
      extraData: PropTypes.object,
    }),
  }),
};

InternalLocationEditor.defaultProps = {
  location: {
    state: null,
  },
};
