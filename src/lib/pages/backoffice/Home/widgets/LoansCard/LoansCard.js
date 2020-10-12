import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Loader } from '@components/Loader';
import { Error } from '@components/Error';
import { invenioConfig } from '@config';
import { loanApi } from '@api/loans';
import { RecordsBriefCard } from '@components/backoffice/RecordsBriefCard';
import { BackOfficeRoutes } from '@routes/urls';
import { SeeAllButton } from '@components/backoffice/buttons/SeeAllButton';

export default class LoansCard extends Component {
  constructor(props) {
    super(props);
    this.fetchPendingLoans = props.fetchPendingLoans;
    this.seeAllUrl = BackOfficeRoutes.loansListWithQuery;
  }

  componentDidMount() {
    this.fetchPendingLoans();
  }

  seeAllButton = () => {
    const path = this.seeAllUrl(
      loanApi
        .query()
        .withState(invenioConfig.CIRCULATION.loanRequestStates)
        .qs()
    );
    return <SeeAllButton fluid to={path} />;
  };

  renderCard = data => {
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
    const { data, isLoading, error } = this.props;
    return (
      <Loader isLoading={isLoading}>
        <Error error={error}>{this.renderCard(data)}</Error>
      </Loader>
    );
  }
}

LoansCard.propTypes = {
  /* redux */
  fetchPendingLoans: PropTypes.func.isRequired,
  data: PropTypes.number.isRequired,
  isLoading: PropTypes.bool,
  error: PropTypes.object,
};

LoansCard.defaultProps = {
  isLoading: false,
  error: {},
};
