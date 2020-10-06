import { withCancel } from '@api/utils';
import { Error } from '@components/Error';
import { Loader } from '@components/Loader';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { SeriesForm } from './components';
import { seriesApi } from '@api/series';

export class SeriesEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      isLoading: !!props.match.params.seriesPid,
      error: {},
    };
  }

  componentDidMount() {
    const {
      match: {
        params: { seriesPid },
      },
    } = this.props;
    if (seriesPid) {
      this.fetchSeries(seriesPid);
    }
  }

  componentWillUnmount() {
    this.cancellableFetchSeries && this.cancellableFetchSeries.cancel();
  }

  fetchSeries = async seriesPid => {
    this.cancellableFetchSeries = withCancel(seriesApi.get(seriesPid));
    try {
      const response = await this.cancellableFetchSeries.promise;
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
    return (
      <SeriesForm
        title="Create new series"
        successSubmitMessage="The series was successfully created."
      />
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
  match: PropTypes.shape({
    params: PropTypes.shape({
      seriesPid: PropTypes.string,
    }),
  }).isRequired,
};
