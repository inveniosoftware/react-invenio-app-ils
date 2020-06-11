import { borrowingRequestApi } from '@api/ill';
import { Error } from '@components/Error';
import { Loader } from '@components/Loader';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { BorrowingRequestForm } from './BorrowingRequestForm/BorrowingRequestForm';
import _get from 'lodash/get';

export class BorrowingRequestEditor extends Component {
  state = {
    data: {},
    isLoading: true,
    error: {},
  };

  componentDidMount() {
    const { match } = this.props;
    if (match.params.borrowingRequestPid) {
      this.fetchBorrowingRequest(match.params.borrowingRequestPid);
    }
  }

  get initialData() {
    const request = this.props.location.state || null;
    if (!request) return null;
    return {
      metadata: {
        title: _get(request, 'metadata.title'),
        patron: request.metadata.patron,
        document: request.metadata.document,
        status: 'PENDING',
      },
    };
  }

  fetchBorrowingRequest = async borrowingRequestPid => {
    try {
      const response = await borrowingRequestApi.get(borrowingRequestPid);
      this.setState({ data: response.data, isLoading: false, error: {} });
    } catch (error) {
      this.setState({ isLoading: false, error: error });
    }
  };

  renderEditForm = pid => {
    const { isLoading, error, data } = this.state;
    return (
      <Loader isLoading={isLoading}>
        <Error error={error}>
          <BorrowingRequestForm
            pid={pid}
            data={data}
            title="Edit borrowing request"
            successSubmitMessage="The borrowing request was successfully updated."
          />
        </Error>
      </Loader>
    );
  };

  render() {
    const {
      match: {
        params: { borrowingRequestPid },
      },
    } = this.props;
    const isEditForm = !!borrowingRequestPid;
    return isEditForm ? (
      this.renderEditForm(borrowingRequestPid)
    ) : (
      <BorrowingRequestForm
        title="Create new borrowing request"
        successSubmitMessage="The borrowing request was successfully created."
        data={this.initialData}
      />
    );
  }
}

BorrowingRequestEditor.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      borrowingRequestPid: PropTypes.string,
    }),
  }).isRequired,
};
