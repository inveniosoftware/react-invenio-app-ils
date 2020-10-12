import { borrowingRequestApi } from '@api/ill';
import { invenioConfig } from '@config';
import { ILLRoutes } from '@routes/urls';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Loader } from '@components/Loader';
import { Error } from '@components/Error';
import { RecordsBriefCard } from '@components/backoffice/RecordsBriefCard';
import { NewButton } from '@components/backoffice/buttons/NewButton';
import { SeeAllButton } from '@components/backoffice/buttons/SeeAllButton';

export default class ILLCard extends Component {
  constructor(props) {
    super(props);
    this.seeAllUrl = ILLRoutes.borrowingRequestListWithQuery;
    this.newILLUrl = ILLRoutes.borrowingRequestCreate;
  }

  componentDidMount() {
    const { fetchOngoingILLRequests } = this.props;
    fetchOngoingILLRequests();
  }

  seeAllButton = () => {
    const path = this.seeAllUrl(
      borrowingRequestApi
        .query()
        .withState(
          `(${invenioConfig.ILL_BORROWING_REQUESTS.requestedStatuses.join(
            ' OR '
          )})`
        )
        .qs()
    );
    return <SeeAllButton fluid to={path} />;
  };

  newAcqButton = () => {
    return <NewButton fluid to={this.newILLUrl} />;
  };

  renderCard = data => {
    return (
      <RecordsBriefCard
        title="ILL Requests"
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

ILLCard.propTypes = {
  fetchOngoingILLRequests: PropTypes.func.isRequired,
  data: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.object,
};

ILLCard.defaultProps = {
  error: {},
};
