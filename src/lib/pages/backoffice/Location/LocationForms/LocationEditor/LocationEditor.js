import { withCancel } from '@api/utils';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Loader } from '@components/Loader';
import { Error } from '@components/Error';
import { locationApi } from '@api/locations/location';
import { LocationForm } from './components';

export class LocationEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      isLoading: !!props.match.params.locationPid,
      error: {},
    };
  }

  componentDidMount() {
    const {
      match: {
        params: { locationPid },
      },
    } = this.props;
    if (locationPid) {
      this.fetchLocation(locationPid);
    }
  }

  componentWillUnmount() {
    this.cancellableFetchLocation && this.cancellableFetchLocation.cancel();
  }

  fetchLocation = async locationPid => {
    this.cancellableFetchLocation = withCancel(locationApi.get(locationPid));
    try {
      const response = await this.cancellableFetchLocation.promise;
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
          <LocationForm
            pid={pid}
            data={data}
            title="Edit location"
            successSubmitMessage="The location was successfully updated."
          />
        </Error>
      </Loader>
    );
  };

  render() {
    const {
      match: {
        params: { locationPid },
      },
    } = this.props;
    const isEditForm = !!locationPid;
    return isEditForm ? (
      this.renderEditForm(locationPid)
    ) : (
      <LocationForm
        title="Create new location"
        successSubmitMessage="The location was successfully created."
      />
    );
  }
}
LocationEditor.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      locationPid: PropTypes.string,
    }),
  }).isRequired,
};
