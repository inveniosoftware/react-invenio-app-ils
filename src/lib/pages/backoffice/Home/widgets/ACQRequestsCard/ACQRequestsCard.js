import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Loader } from '@components/Loader';
import { Error } from '@components/Error';
import { RecordsBriefCard } from '@components/backoffice/RecordsBriefCard';
import { NewButton, SeeAllButton } from '@components/backoffice/buttons';

export default class ACQRequestsCard extends Component {
  constructor(props) {
    super(props);

    // TODO when acquisition module
    this.seeAllUrl = '';
    this.newAcqURL = '';
  }

  componentDidMount() {}

  seeAllButton = () => {
    return <SeeAllButton fluid disabled to={this.seeAllUrl} />;
  };

  newAcqButton = () => {
    return <NewButton fluid disabled to={this.newAcqURL} />;
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
  // fetchOngoingAcqRequests: PropTypes.func.isRequired,
  /* redux */
  data: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.object,
};

ACQRequestsCard.defaultProps = {
  error: null,
};
