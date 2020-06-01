import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Loader } from '@components/Loader';
import { Error } from '@components/Error';
import { RecordsBriefCard } from '@components/backoffice/RecordsBriefCard';
import { NewButton, SeeAllButton } from '@components/backoffice/buttons';

export default class ILLCard extends Component {
  constructor(props) {
    super(props);

    // TODO when acquisition module
    this.seeAllUrl = '';
    this.newILLUrl = '';
  }

  componentDidMount() {}

  seeAllButton = () => {
    // TODO when #155 solved
    return <SeeAllButton fluid disabled to={this.seeAllUrl} />;
  };

  newAcqButton = () => {
    return <NewButton fluid disabled to={this.newILLUrl} />;
  };

  renderCard = data => {
    return (
      <RecordsBriefCard
        title={'ILL Requests'}
        stats={data}
        text={'ongoing'}
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
  // fetchOngoingILLRequests: PropTypes.func.isRequired,
  data: PropTypes.number.isRequired,
  isLoading: PropTypes.bool,
  error: PropTypes.object,
};

ILLCard.defaultProps = {
  isLoading: false,
  error: {},
};
