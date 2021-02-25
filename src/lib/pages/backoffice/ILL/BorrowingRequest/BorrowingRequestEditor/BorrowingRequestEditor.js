import { borrowingRequestApi } from '@api/ill';
import { withCancel } from '@api/utils';
import { Error } from '@components/Error';
import { Loader } from '@components/Loader';
import _get from 'lodash/get';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { BorrowingRequestForm } from './BorrowingRequestForm/BorrowingRequestForm';

export class BorrowingRequestEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      isLoading: !!props.match.params.borrowingRequestPid,
      error: {},
    };
  }

  componentDidMount() {
    const { match } = this.props;
    if (match.params.borrowingRequestPid) {
      this.fetchBorrowingRequest(match.params.borrowingRequestPid);
    }
  }

  componentWillUnmount() {
    this.cancellableFetchBorrowingRequest &&
      this.cancellableFetchBorrowingRequest.cancel();
  }

  fetchBorrowingRequest = async (borrowingRequestPid) => {
    this.cancellableFetchBorrowingRequest = withCancel(
      borrowingRequestApi.get(borrowingRequestPid)
    );
    try {
      const response = await this.cancellableFetchBorrowingRequest.promise;
      this.setState({ data: response.data, isLoading: false, error: {} });
    } catch (error) {
      if (error !== 'UNMOUNTED') {
        this.setState({ isLoading: false, error: error });
      }
    }
  };

  render() {
    const {
      match: {
        params: { borrowingRequestPid },
      },
    } = this.props;
    const isEditForm = !!borrowingRequestPid;
    if (isEditForm) {
      const { isLoading, error, data } = this.state;
      return (
        <Loader isLoading={isLoading}>
          <Error error={error}>
            <BorrowingRequestForm
              pid={borrowingRequestPid}
              data={data}
              title="Edit borrowing request"
              successSubmitMessage="The borrowing request was successfully updated."
            />
          </Error>
        </Loader>
      );
    } else {
      const extraData = _get(this.props, 'location.state.extraData', {});
      const prefilledFormData = _get(this.props, 'location.state.formData', {});
      return (
        <BorrowingRequestForm
          title="Create new borrowing request"
          successSubmitMessage="The borrowing request was successfully created."
          data={{ extraData: extraData, metadata: prefilledFormData }}
        />
      );
    }
  }
}

BorrowingRequestEditor.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      borrowingRequestPid: PropTypes.string,
    }),
  }).isRequired,
  location: PropTypes.shape({
    state: PropTypes.object,
  }),
};

BorrowingRequestEditor.defaultProps = {
  location: {
    state: null,
  },
};
