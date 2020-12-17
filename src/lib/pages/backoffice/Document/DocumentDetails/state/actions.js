import { toShortDate } from '@api/date';
import { documentApi } from '@api/documents';
import { loanApi } from '@api/loans';
import { searchReady } from '@api/utils';
import {
  sendErrorNotification,
  sendSuccessNotification,
} from '@components/Notifications';
import { goTo } from '@history';
import { BackOfficeRoutes } from '@routes/urls';
import { DateTime } from 'luxon';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Overridable from 'react-overridable';
import { Link } from 'react-router-dom';
export const IS_LOADING = 'fetchDocumentDetails/IS_LOADING';
export const SUCCESS = 'fetchDocumentDetails/SUCCESS';
export const HAS_ERROR = 'fetchDocumentDetails/HAS_ERROR';

export const DELETE_IS_LOADING = 'deleteDocument/DELETE_IS_LOADING';
export const DELETE_SUCCESS = 'deleteDocument/DELETE_SUCCESS';
export const DELETE_HAS_ERROR = 'deleteDocument/DELETE_HAS_ERROR';

export const fetchDocumentDetails = (documentPid) => {
  return async (dispatch) => {
    dispatch({
      type: IS_LOADING,
    });

    try {
      const response = await documentApi.get(documentPid);
      dispatch({
        type: SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: HAS_ERROR,
        payload: error,
      });
      dispatch(sendErrorNotification(error));
    }
  };
};

export const deleteDocument = (documentPid) => {
  return async (dispatch) => {
    dispatch({
      type: DELETE_IS_LOADING,
    });

    try {
      await documentApi.delete(documentPid);
      await searchReady();
      dispatch({
        type: DELETE_SUCCESS,
        payload: { documentPid: documentPid },
      });
      dispatch(
        sendSuccessNotification(
          'Success!',
          `The document ${documentPid} has been deleted.`
        )
      );
      goTo(BackOfficeRoutes.documentsList);
    } catch (error) {
      dispatch({
        type: DELETE_HAS_ERROR,
        payload: error,
      });
      dispatch(sendErrorNotification(error));
    }
  };
};

export const updateDocument = (documentPid, path, value) => {
  return async (dispatch) => {
    dispatch({
      type: IS_LOADING,
    });

    try {
      const response = await documentApi.patch(documentPid, [
        {
          op: 'replace',
          path: path,
          value: value,
        },
      ]);

      dispatch({
        type: SUCCESS,
        payload: response.data,
      });
      dispatch(
        sendSuccessNotification(
          'Success!',
          `The document ${documentPid} has been updated.`
        )
      );
    } catch (error) {
      dispatch({
        type: HAS_ERROR,
        payload: error,
      });
      dispatch(sendErrorNotification(error));
    }
  };
};

export const requestLoanForPatron = (
  documentPid,
  patronPid,
  { requestEndDate = null, deliveryMethod = null } = {}
) => {
  return async (dispatch) => {
    dispatch({
      type: IS_LOADING,
    });
    const today = toShortDate(DateTime.local());
    try {
      const response = await loanApi.doRequest(documentPid, patronPid, {
        requestExpireDate: requestEndDate,
        requestStartDate: today,
        deliveryMethod: deliveryMethod,
      });
      await searchReady();
      const loanPid = response.data.pid;
      dispatch(
        sendSuccessNotification(
          'Success!',
          <RequestForPatronMessage
            deliveryMethod={deliveryMethod}
            loanPid={loanPid}
          />
        )
      );
      dispatch(fetchDocumentDetails(documentPid));
    } catch (error) {
      dispatch({
        type: HAS_ERROR,
        payload: error,
      });
      dispatch(sendErrorNotification(error));
    }
  };
};

export class RequestForPatronMessage extends Component {
  render() {
    const { deliveryMethod, loanPid } = this.props;
    return (
      <p>
        The loan {loanPid} has been requested.{' '}
        <Link to={BackOfficeRoutes.loanDetailsFor(loanPid)}>
          You can now view the loan details.
        </Link>
        <br />
        <Overridable
          id="RequestForPatronMessage.DeliveryIcon"
          deliveryMethod={deliveryMethod}
          showName
          asListItem
        />
      </p>
    );
  }
}

RequestForPatronMessage.propTypes = {
  deliveryMethod: PropTypes.string.isRequired,
  loanPid: PropTypes.string.isRequired,
};

export default Overridable.component(
  'RequestForPatronMessage',
  RequestForPatronMessage
);
