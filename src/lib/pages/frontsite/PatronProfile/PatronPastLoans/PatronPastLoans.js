import { Error } from '@components/Error';
import { ILSItemPlaceholder } from '@components/ILSPlaceholder/ILSPlaceholder';
import { InfoMessage } from '@components/InfoMessage';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Container, Header, Label } from 'semantic-ui-react';
import LoansList from '../LoansList';
import LoansListItem from '../LoansListEntry';

class LoansListEntry extends Component {
  renderLabels = (startDate, endDate) => (
    <div className="pt-default">
      <Label basic>
        Loaned on
        <Label.Detail>{startDate.toLocaleString()}</Label.Detail>
      </Label>
      <Label basic>
        Return on
        <Label.Detail>{endDate.toLocaleString()}</Label.Detail>
      </Label>
    </div>
  );

  render() {
    const { loan } = this.props;

    return (
      <LoansListItem
        loan={loan}
        extraItemProps={{
          itemMetaCmp: this.renderLabels(
            loan.metadata.start_date,
            loan.metadata.end_date
          ),
        }}
      />
    );
  }
}

LoansListEntry.propTypes = {
  loan: PropTypes.object.isRequired,
};

export default class PatronPastLoans extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: props.initialPage,
    };
  }
  componentDidMount() {
    this.fetchPatronPastLoans();
  }

  fetchPatronPastLoans() {
    const { activePage } = this.state;
    const { patronPid, fetchPatronPastLoans, rowsPerPage } = this.props;
    fetchPatronPastLoans(patronPid, {
      page: activePage,
      size: rowsPerPage,
    });
  }

  render() {
    const { error, isLoading, loans, rowsPerPage } = this.props;
    const { activePage } = this.state;
    return (
      <Container className="spaced">
        <Header
          as="h2"
          content="Your past loans"
          className="highlight"
          textAlign="center"
        />
        <ILSItemPlaceholder fluid isLoading={isLoading}>
          <Error error={error}>
            <LoansList
              activePage={activePage}
              isLoading={isLoading}
              loans={loans}
              onPageChange={newPage => {
                this.setState(
                  { activePage: newPage },
                  this.fetchPatronPastLoans
                );
              }}
              rowsPerPage={rowsPerPage}
              renderListEntry={loan => <LoansListEntry loan={loan} />}
              noLoansCmp={
                <InfoMessage
                  title="No past loans"
                  message="You do not have any past loan."
                />
              }
            />
          </Error>
        </ILSItemPlaceholder>
      </Container>
    );
  }
}

PatronPastLoans.propTypes = {
  patronPid: PropTypes.string.isRequired,
  initialPage: PropTypes.number,
  rowsPerPage: PropTypes.number,
  /* REDUX */
  loans: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.object.isRequired,
  fetchPatronPastLoans: PropTypes.func.isRequired,
};

PatronPastLoans.defaultProps = {
  initialPage: 1,
  rowsPerPage: 5,
};
