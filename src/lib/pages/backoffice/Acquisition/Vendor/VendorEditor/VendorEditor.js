import { vendorApi } from '@api/acquisition';
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
      isLoading: true,
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

  fetchVendor = async vendorPid => {
    try {
      const response = await vendorApi.get(vendorPid);
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
