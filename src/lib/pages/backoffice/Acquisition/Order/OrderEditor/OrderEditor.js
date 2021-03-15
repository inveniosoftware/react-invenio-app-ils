import { orderApi } from '@api/acquisition';
import { documentRequestApi } from '@api/documentRequests';
import { withCancel } from '@api/utils';
import { Error } from '@components/Error';
import { Loader } from '@components/Loader';
import { invenioConfig } from '@config';
import { RJSForm } from '@forms/rjsf';
import { goTo } from '@history';
import { AcquisitionRoutes, BackOfficeRoutes } from '@routes/urls';
import _get from 'lodash/get';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { schema } from './schema';
import { uiSchema } from './uiSchema';

export class OrderEditor extends Component {
  constructor(props) {
    super(props);

    const isEditing = !!props.match.params.orderPid;
    this.state = {
      data: {},
      isLoading: isEditing,
      error: {},
    };
  }

  componentDidMount() {
    const {
      match: {
        params: { orderPid },
      },
    } = this.props;
    if (orderPid) {
      this.fetchOrder(orderPid);
    }
  }

  componentWillUnmount() {
    this.cancellableFetchOrder && this.cancellableFetchOrder.cancel();
  }

  fetchOrder = async (orderPid) => {
    this.cancellableFetchOrder = withCancel(orderApi.get(orderPid));
    try {
      const response = await this.cancellableFetchOrder.promise;
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
        params: { orderPid },
      },
    } = this.props;

    const isEditing = !!orderPid;
    return isEditing
      ? await orderApi.update(orderPid, formData)
      : await orderApi.create(formData);
  };

  attachCreatedOrderToDocumentRequest = async (
    orderPid,
    documentRequestPid
  ) => {
    this.cancellableAttachOrder = withCancel(
      documentRequestApi.addProvider(documentRequestPid, {
        physical_item_provider: {
          pid: orderPid,
          pid_type:
            invenioConfig.DOCUMENT_REQUESTS.physicalItemProviders.acq.pid_type,
        },
      })
    );
    await this.cancellableAttachOrder.promise;
  };

  successCallback = async (response) => {
    const order = _get(response, 'data');
    const newOrderPid = order.metadata.pid;

    const extraData = _get(this.props, 'location.state.extraData', {});
    const shouldAttachCreatedOrderToDocumentRequest = _get(
      extraData,
      'attachCreatedOrderToDocumentRequest',
      false
    );
    if (shouldAttachCreatedOrderToDocumentRequest) {
      // attach order and go back to the document request details page
      const documentRequestPid = extraData.documentRequestPid;

      try {
        await this.attachCreatedOrderToDocumentRequest(
          newOrderPid,
          documentRequestPid
        );
      } catch (error) {
        console.error(error);
      }
      goTo(BackOfficeRoutes.documentRequestDetailsFor(documentRequestPid));
    } else {
      goTo(AcquisitionRoutes.orderDetailsFor(newOrderPid));
    }
  };

  render() {
    const {
      match: {
        params: { orderPid },
      },
    } = this.props;
    const { isLoading, error, data } = this.state;

    const isEditing = !!orderPid;
    if (isEditing) {
      const formTitle = `Acquisition order - Edit #${orderPid}`;
      return (
        <Loader isLoading={isLoading}>
          <Error error={error}>
            <RJSForm
              schema={schema()}
              uiSchema={uiSchema(formTitle)}
              formData={data.metadata}
              submitAction={this.submitAction}
              successCallback={this.successCallback}
              successMessage="The acquisition order was successfully updated."
            />
          </Error>
        </Loader>
      );
    } else {
      const formTitle = 'Acquisition order - Create';
      const prefilledFormData = _get(this.props, 'location.state.formData', {});
      return (
        <RJSForm
          schema={schema()}
          uiSchema={uiSchema(formTitle)}
          formData={prefilledFormData}
          submitAction={this.submitAction}
          successCallback={this.successCallback}
          successMessage="The acquisition order was successfully created."
        />
      );
    }
  }
}

OrderEditor.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      orderPid: PropTypes.string,
    }),
  }).isRequired,
  location: PropTypes.shape({
    state: PropTypes.shape({
      formData: PropTypes.object,
      extraData: PropTypes.object,
    }),
  }),
};

OrderEditor.defaultProps = {
  location: {
    state: null,
  },
};
