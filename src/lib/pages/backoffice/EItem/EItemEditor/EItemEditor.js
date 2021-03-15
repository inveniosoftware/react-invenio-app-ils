import { eItemApi } from '@api/eitems';
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

export class EItemEditor extends Component {
  constructor(props) {
    super(props);

    const isEditing = !!props.match.params.eitemPid;
    this.state = {
      data: {},
      isLoading: isEditing,
      error: {},
    };
  }

  componentDidMount() {
    const { match } = this.props;
    if (match.params.eitemPid) {
      this.fetchEItem(match.params.eitemPid);
    }
  }

  componentWillUnmount() {
    this.cancellableFetchEItem && this.cancellableFetchEItem.cancel();
  }

  fetchEItem = async (eitemPid) => {
    this.cancellableFetchEItem = withCancel(eItemApi.get(eitemPid));
    try {
      const response = await this.cancellableFetchEItem.promise;
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
        params: { eitemPid },
      },
    } = this.props;

    const isEditing = !!eitemPid;
    return isEditing
      ? await eItemApi.update(eitemPid, formData)
      : await eItemApi.create(formData);
  };

  successCallback = (response) => {
    goTo(BackOfficeRoutes.eitemDetailsFor(response.data.metadata.pid));
  };

  render() {
    const {
      match: {
        params: { eitemPid },
      },
    } = this.props;
    const { isLoading, error, data } = this.state;

    const isEditing = !!eitemPid;
    if (isEditing) {
      const formTitle = `Eitem - Edit #${eitemPid}`;
      return (
        <Loader isLoading={isLoading}>
          <Error error={error}>
            <RJSForm
              schema={schema()}
              uiSchema={uiSchema(formTitle)}
              formData={data.metadata}
              submitAction={this.submitAction}
              successCallback={this.successCallback}
              successMessage="The eitem was successfully updated."
            />
          </Error>
        </Loader>
      );
    } else {
      const formTitle = 'Eitem - Create';
      const prefilledFormData = _get(this.props, 'location.state.formData', {});
      return (
        <RJSForm
          schema={schema()}
          uiSchema={uiSchema(formTitle)}
          formData={prefilledFormData}
          submitAction={this.submitAction}
          successCallback={this.successCallback}
          successMessage="The eitem was successfully created."
        />
      );
    }
  }
}

EItemEditor.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      eitemPid: PropTypes.string,
    }),
  }).isRequired,
  location: PropTypes.shape({
    state: PropTypes.shape({
      formData: PropTypes.object,
      extraData: PropTypes.object,
    }),
  }),
};

EItemEditor.defaultProps = {
  location: {
    state: null,
  },
};
