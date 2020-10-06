import { withCancel } from '@api/utils';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Loader } from '@components/Loader';
import { Error } from '@components/Error';
import { internalLocationApi } from '@api/locations';
import { InternalLocationForm } from './components';

export class InternalLocationEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      isLoading: !!props.match.params.ilocationPid,
      error: {},
    };
  }

  componentDidMount() {
    const {
      match: {
        params: { ilocationPid },
      },
    } = this.props;
    if (ilocationPid) {
      this.fetchInternalLocation(ilocationPid);
    }
  }

  componentWillUnmount() {
    this.cancellableFetchInternalLocation &&
      this.cancellableFetchInternalLocation.cancel();
  }

  fetchInternalLocation = async ilocationPid => {
    this.cancellableFetchInternalLocation = withCancel(
      internalLocationApi.get(ilocationPid)
    );
    try {
      const response = await this.cancellableFetchInternalLocation.promise;
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
          <InternalLocationForm
            pid={pid}
            data={data}
            title="Edit internal location"
            successSubmitMessage="The internal location was successfully updated."
          />
        </Error>
      </Loader>
    );
  };

  render() {
    const {
      match: {
        params: { ilocationPid },
      },
    } = this.props;
    const isEditForm = !!ilocationPid;
    return isEditForm ? (
      this.renderEditForm(ilocationPid)
    ) : (
      <InternalLocationForm
        title="Create new internal location"
        successSubmitMessage="The internal location was successfully created."
      />
    );
  }
}

InternalLocationEditor.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      ilocationPid: PropTypes.string,
    }),
  }).isRequired,
};
