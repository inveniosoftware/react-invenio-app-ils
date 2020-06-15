import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Loader } from '@components/Loader';
import { Error } from '@components/Error';
import { SeriesForm } from './components';

export class SeriesEditor extends Component {
  componentDidMount() {
    const {
      fetchSeriesDetails,
      match: {
        params: { seriesPid },
      },
    } = this.props;
    if (seriesPid) {
      fetchSeriesDetails(seriesPid);
    }
  }

  renderEditForm = pid => {
    const { isLoading, error, data } = this.props;
    return (
      <Loader isLoading={isLoading}>
        <Error error={error}>
          <SeriesForm
            pid={pid}
            data={data}
            title="Edit series"
            successSubmitMessage="The series was successfully updated."
          />
        </Error>
      </Loader>
    );
  };

  render() {
    const {
      match: {
        params: { seriesPid },
      },
    } = this.props;
    const isEditForm = !!seriesPid;
    return isEditForm ? (
      this.renderEditForm(seriesPid)
    ) : (
      <SeriesForm
        title="Create new series"
        successSubmitMessage="The series was successfully created."
      />
    );
  }
}

SeriesEditor.propTypes = {
  fetchSeriesDetails: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  error: PropTypes.object,
  data: PropTypes.object,
  match: PropTypes.shape({
    params: PropTypes.shape({
      seriesPid: PropTypes.string,
    }),
  }).isRequired,
};
