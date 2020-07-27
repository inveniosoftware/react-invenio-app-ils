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
      isLoading: true,
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

  fetchLocation = async locationPid => {
    try {
      const response = await locationApi.get(locationPid);
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
