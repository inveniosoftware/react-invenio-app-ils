import { orderApi } from '@api/acquisition';
import { invenioConfig } from '@config';
import { AcquisitionRoutes } from '@routes/backoffice/AcquisitionUrls';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Loader } from '@components/Loader';
import { Error } from '@components/Error';
import { RecordsBriefCard } from '@components/backoffice/RecordsBriefCard';
import { NewButton } from '@components/backoffice/buttons/NewButton';
import { SeeAllButton } from '@components/backoffice/buttons/SeeAllButton';

export default class ACQRequestsCard extends Component {
  constructor(props) {
    super(props);
    this.seeAllUrl = AcquisitionRoutes.ordersListWithQuery;
    this.newAcqURL = AcquisitionRoutes.orderCreate;
  }

  componentDidMount() {
    const { fetchOngoingAcqRequests } = this.props;
    fetchOngoingAcqRequests();
  }

  seeAllButton = () => {
    const path = this.seeAllUrl(
      orderApi
        .query()
        .withState(`(${invenioConfig.ACQ_ORDERS.orderedStatuses.join(' OR ')})`)
        .qs()
    );
    return <SeeAllButton fluid to={path} />;
  };

  newAcqButton = () => {
    return <NewButton fluid to={this.newAcqURL} />;
  };

  renderCard = data => {
    return (
      <RecordsBriefCard
        title="ACQ Requests"
        stats={data}
        text="ongoing"
        buttonLeft={this.newAcqButton()}
        buttonRight={this.seeAllButton()}
      />
    );
  };

  render() {
    const { data, isLoading, error } = this.props;
    return (
      <Loader isLoading={isLoading}>
        <Error error={error}>{this.renderCard(data)}</Error>
      </Loader>
    );
  }
}

ACQRequestsCard.propTypes = {
  /* redux */
  fetchOngoingAcqRequests: PropTypes.func.isRequired,
  data: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.object,
};

ACQRequestsCard.defaultProps = {
  error: null,
};
