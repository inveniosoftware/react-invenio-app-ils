import { Error } from '@components/Error';
import { Loader } from '@components/Loader';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
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

  renderCreateForm = () => {
    const { error } = this.props;
    const data = {
      metadata: {
        extensions: undefined,
      },
    };
    return (
      <Error error={error}>
        <SeriesForm
          data={data}
          title="Create new series"
          successSubmitMessage="The series was successfully created."
        />
      </Error>
    );
  };

  render() {
    const {
      match: {
        params: { seriesPid },
      },
    } = this.props;
    const isEditForm = !!seriesPid;
    return isEditForm
      ? this.renderEditForm(seriesPid)
      : this.renderCreateForm();
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
