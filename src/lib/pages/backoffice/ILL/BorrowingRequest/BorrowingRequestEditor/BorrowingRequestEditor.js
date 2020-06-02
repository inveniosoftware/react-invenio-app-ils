import React, { Component } from 'react';
import { Loader } from '@components/Loader';
import { Error } from '@components/Error';
import { illBorrowingRequestApi as borrowingRequestApi } from '@api/ill';
import { BorrowingRequestForm } from './BorrowingRequestForm/BorrowingRequestForm';

export class BorrowingRequestEditor extends Component {
  state = {
    data: {},
    isLoading: true,
    error: {},
  };

  componentDidMount() {
    if (this.props.match.params.borrowingRequestPid) {
      this.fetchBorrowingRequest(this.props.match.params.borrowingRequestPid);
    }
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
      />
    );
  }
}
