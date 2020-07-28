import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Loader, Statistic } from 'semantic-ui-react';

export default class PatronOverview extends Component {
  renderStatistic(stat, quantifiableLabel) {
    const {
      isLoading,
      data: { total },
    } = stat;
    return (
      <Statistic>
        <Statistic.Value>
          {isLoading ? <Loader active inline /> : total}
        </Statistic.Value>
        <Statistic.Label>
          {isLoading ? <>&nbsp;</> : quantifiableLabel(total !== 1)}
        </Statistic.Label>
      </Statistic>
    );
  }

  render() {
    const { currentLoans, loanRequests, documentRequests } = this.props;
    return (
      <Container className="spaced">
        <Statistic.Group widths="three" size="small">
          {this.renderStatistic(
            currentLoans,
            isPlural => `ongoing loan${isPlural ? 's' : ''}`
          )}
          {this.renderStatistic(
            loanRequests,
            isPlural => `loan request${isPlural ? 's' : ''}`
          )}
          {this.renderStatistic(
            documentRequests,
            isPlural => `Request${isPlural ? 's' : ''} for new literature`
          )}
        </Statistic.Group>
      </Container>
    );
  }
}

PatronOverview.propTypes = {
  currentLoans: PropTypes.object.isRequired,
  loanRequests: PropTypes.object.isRequired,
  documentRequests: PropTypes.object.isRequired,
};
