import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Loader, Statistic } from 'semantic-ui-react';

export default class PatronOverview extends Component {
  scrollTo(ref) {
    ref.current.scrollIntoView(false, { behaviour: 'smooth', block: 'end' });
  }

  renderStatistic(stat, quantifiableLabel, anchor) {
    const {
      isLoading,
      data: { total },
    } = stat;

    return (
      <Statistic onClick={() => this.scrollTo(anchor)} className="anchored">
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
    const {
      currentLoans,
      loanRequests,
      documentRequests,
      anchors,
    } = this.props;
    return (
      <Container className="spaced">
        <Statistic.Group widths="three" size="small">
          {this.renderStatistic(
            currentLoans,
            (isPlural) => `ongoing loan${isPlural ? 's' : ''}`,
            anchors.currentLoansRef
          )}
          {this.renderStatistic(
            loanRequests,
            (isPlural) => `loan request${isPlural ? 's' : ''}`,
            anchors.pendingLoansRef
          )}
          {this.renderStatistic(
            documentRequests,
            (isPlural) => `Request${isPlural ? 's' : ''} for new literature`,
            anchors.currentDoqRequestsRef
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
  anchors: PropTypes.object.isRequired,
};
