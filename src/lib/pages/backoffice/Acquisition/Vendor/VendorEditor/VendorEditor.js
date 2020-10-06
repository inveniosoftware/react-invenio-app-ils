import { vendorApi } from '@api/acquisition';
import { withCancel } from '@api/utils';
import { Error } from '@components/Error';
import { Loader } from '@components/Loader';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { VendorForm } from './VendorForm';

export class VendorEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      isLoading: !!props.match.params.vendorPid,
      error: {},
    };
  }

  componentDidMount() {
    const {
      match: {
        params: { vendorPid },
      },
    } = this.props;
    if (vendorPid) {
      this.fetchVendor(vendorPid);
    }
  }

  componentWillUnmount() {
    this.cancellableFetchVendor && this.cancellableFetchVendor.cancel();
  }

  fetchVendor = async vendorPid => {
    this.cancellableFetchVendor = withCancel(vendorApi.get(vendorPid));
    try {
      const response = await this.cancellableFetchVendor.promise;
      this.setState({ data: response.data, isLoading: false, error: {} });
    } catch (error) {
      if (error !== 'UNMOUNTED') {
        this.setState({ isLoading: false, error: error });
      }
    }
  };

  renderEditForm = pid => {
    const { isLoading, error, data } = this.state;
    return (
      <Loader isLoading={isLoading}>
        <Error error={error}>
          <VendorForm
            pid={pid}
            data={data}
            title="Edit vendor"
            successSubmitMessage="The vendor was successfully updated."
          />
        </Error>
      </Loader>
    );
  };

  render() {
    const {
      match: {
        params: { vendorPid },
      },
    } = this.props;
    const isEditForm = !!vendorPid;
    return isEditForm ? (
      this.renderEditForm(vendorPid)
    ) : (
      <VendorForm
        title="Create new vendor"
        successSubmitMessage="The vendor was successfully created."
      />
    );
  }
}

VendorEditor.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      vendorPid: PropTypes.string,
    }),
  }).isRequired,
};
