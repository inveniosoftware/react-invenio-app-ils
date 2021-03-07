import { seriesApi } from '@api/series';
import { withCancel } from '@api/utils';
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

export class SeriesEditor extends Component {
  constructor(props) {
    super(props);

    const isEditing = !!props.match.params.seriesPid;
    this.state = {
      data: {},
      isLoading: isEditing,
      error: {},
    };
  }

  componentDidMount() {
    const { match } = this.props;
    if (match.params.seriesPid) {
      this.fetch(match.params.seriesPid);
    }
  }

  componentWillUnmount() {
    this.cancellableFetch && this.cancellableFetch.cancel();
  }

  fetch = async (seriesPid) => {
    this.cancellableFetch = withCancel(seriesApi.get(seriesPid));
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
        params: { seriesPid },
      },
    } = this.props;

    const isEditing = !!seriesPid;
    return isEditing
      ? await seriesApi.update(seriesPid, formData)
      : await seriesApi.create(formData);
  };

  successCallback = (response) => {
    goTo(
      BackOfficeRoutes.seriesDetailsFor(_get(response, 'data.metadata.pid'))
    );
  };

  render() {
    const {
      match: {
        params: { seriesPid },
      },
    } = this.props;
    const { isLoading, error, data } = this.state;

    const isEditing = !!seriesPid;
    if (isEditing) {
      const formTitle = `Series - Edit #${seriesPid}`;
      return (
        <Loader isLoading={isLoading}>
          <Error error={error}>
            <RJSForm
              schema={schema}
              uiSchema={uiSchema(formTitle)}
              formData={data.metadata}
              submitAction={this.submitAction}
              successCallback={this.successCallback}
              successMessage="The series was successfully updated."
            />
          </Error>
        </Loader>
      );
    } else {
      const formTitle = 'Series - Create';
      const prefilledFormData = _get(this.props, 'location.state.formData', {});
      return (
        <RJSForm
          schema={schema}
          uiSchema={uiSchema(formTitle)}
          formData={prefilledFormData}
          submitAction={this.submitAction}
          successCallback={this.successCallback}
          successMessage="The series was successfully created."
        />
      );
    }
  }
}

SeriesEditor.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      seriesPid: PropTypes.string,
    }),
  }).isRequired,
  location: PropTypes.shape({
    state: PropTypes.shape({
      formData: PropTypes.object,
      extraData: PropTypes.object,
    }),
  }),
};

SeriesEditor.defaultProps = {
  location: {
    state: null,
  },
};
