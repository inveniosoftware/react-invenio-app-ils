import { loanApi } from '@api/loans';
import { withCancel } from '@api/utils';
import { SeeAllButton } from '@components/backoffice/buttons/SeeAllButton';
import { RecordsBriefCard } from '@components/backoffice/RecordsBriefCard';
import { Error } from '@components/Error';
import { Loader } from '@components/Loader';
import { invenioConfig } from '@config';
import { BackOfficeRoutes } from '@routes/urls';
import React, { Component } from 'react';

export class LoansCard extends Component {
  constructor(props) {
    super(props);
    this.query = loanApi
      .query()
      .withState(invenioConfig.CIRCULATION.loanRequestStates)
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
    this.cancellableFetch = withCancel(loanApi.count(this.query));
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
    const path = BackOfficeRoutes.loansListWithQuery(this.query);
    return <SeeAllButton fluid to={path} />;
  };

  renderCard = (data) => {
    return (
      <RecordsBriefCard
        title="Loans"
        stats={data}
        text="new requests"
        buttonLeft={null}
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

LoansCard.propTypes = {};

LoansCard.defaultProps = {};
