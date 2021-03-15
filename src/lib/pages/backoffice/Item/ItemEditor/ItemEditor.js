import { itemApi } from '@api/items';
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

export class ItemEditor extends Component {
  constructor(props) {
    super(props);

    const isEditing = !!props.match.params.itemPid;
    this.state = {
      data: {},
      isLoading: isEditing,
      error: {},
    };
  }

  componentDidMount() {
    const { match } = this.props;
    if (match.params.itemPid) {
      this.fetchItem(match.params.itemPid);
    }
  }

  componentWillUnmount() {
    this.cancellableFetchItem && this.cancellableFetchItem.cancel();
  }

  fetchItem = async (itemPid) => {
    this.cancellableFetchItem = withCancel(itemApi.get(itemPid));
    try {
      const response = await this.cancellableFetchItem.promise;
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
        params: { itemPid },
      },
    } = this.props;

    const isEditing = !!itemPid;
    return isEditing
      ? await itemApi.update(itemPid, formData)
      : await itemApi.create(formData);
  };

  successCallback = (response) => {
    goTo(BackOfficeRoutes.itemDetailsFor(response.data.metadata.pid));
  };

  render() {
    const {
      match: {
        params: { itemPid },
      },
    } = this.props;
    const { isLoading, error, data } = this.state;

    const isEditing = !!itemPid;
    if (isEditing) {
      const formTitle = `Item - Edit #${itemPid}`;
      return (
        <Loader isLoading={isLoading}>
          <Error error={error}>
            <RJSForm
              schema={schema()}
              uiSchema={uiSchema(formTitle)}
              formData={data.metadata}
              submitAction={this.submitAction}
              successCallback={this.successCallback}
              successMessage="The item was successfully updated."
            />
          </Error>
        </Loader>
      );
    } else {
      const formTitle = 'Item - Create';
      const prefilledFormData = _get(this.props, 'location.state.formData', {});
      return (
        <RJSForm
          schema={schema()}
          uiSchema={uiSchema(formTitle)}
          formData={prefilledFormData}
          submitAction={this.submitAction}
          successCallback={this.successCallback}
          successMessage="The item was successfully created."
        />
      );
    }
  }
}

ItemEditor.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      itemPid: PropTypes.string,
    }),
  }).isRequired,
  location: PropTypes.shape({
    state: PropTypes.shape({
      formData: PropTypes.object,
      extraData: PropTypes.object,
    }),
  }),
};

ItemEditor.defaultProps = {
  location: {
    state: null,
  },
};
