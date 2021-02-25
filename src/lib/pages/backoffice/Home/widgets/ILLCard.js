import { borrowingRequestApi } from '@api/ill';
import { withCancel } from '@api/utils';
import { NewButton } from '@components/backoffice/buttons/NewButton';
import { SeeAllButton } from '@components/backoffice/buttons/SeeAllButton';
import { RecordsBriefCard } from '@components/backoffice/RecordsBriefCard';
import { Error } from '@components/Error';
import { Loader } from '@components/Loader';
import { invenioConfig } from '@config';
import { ILLRoutes } from '@routes/urls';
import React, { Component } from 'react';

export class ILLCard extends Component {
  constructor(props) {
    super(props);
    this.query = borrowingRequestApi
      .query()
      .withState(
        `(${invenioConfig.ILL_BORROWING_REQUESTS.requestedStatuses.join(
          ' OR '
        )})`
      )
      .qs();

    this.state = {
      data: 0,
      isLoading: true,
      error: {},
    };
  }

  componentDidMount() {
    this.fetch();
  }

  componentWillUnmount() {
    this.cancellableFetch && this.cancellableFetch.cancel();
  }

  fetch = async () => {
    this.cancellableFetch = withCancel(borrowingRequestApi.count(this.query));
    this.setState({ isLoading: true });
    try {
      const response = await this.cancellableFetch.promise;
      this.setState({ data: response.data, isLoading: false, error: {} });
    } catch (error) {
      if (error !== 'UNMOUNTED') {
        this.setState({ isLoading: false, error: error });
      }
    }
  };

  seeAllButton = () => {
    const path = ILLRoutes.borrowingRequestListWithQuery(this.query);
    return <SeeAllButton fluid to={path} />;
  };

  newAcqButton = () => {
    return <NewButton fluid to={ILLRoutes.borrowingRequestCreate} />;
  };

  renderCard = (data) => {
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
    const { data, isLoading, error } = this.state;
    return (
      <Loader isLoading={isLoading}>
        <Error error={error}>{this.renderCard(data)}</Error>
      </Loader>
    );
  }
}

ILLCard.propTypes = {};

ILLCard.defaultProps = {};
