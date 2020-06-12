import { toShortDate } from '@api/date';
import { Error } from '@components/Error';
import { InfoMessage } from '@components/InfoMessage';
import { Loader } from '@components/Loader';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Container, Header, Icon, Label, Popup } from 'semantic-ui-react';
import LoansList from '../LoansList';
import LoansListItem from '../LoansListEntry';

class LoansListEntry extends Component {
  renderLabels = (startDate, endDate) => (
    <div className="pt-default">
      <Label basic>
        Loaned on
        <Label.Detail>{toShortDate(startDate)}</Label.Detail>
      </Label>
      <Label basic>
        Return on
        <Label.Detail>{toShortDate(endDate)}</Label.Detail>
      </Label>
    </div>
  );

  render() {
    const { loan } = this.props;
    const isLoanOverdue = loan.metadata.is_overdue;

    const isIllBrwReq = loan.metadata.item_pid.type === 'illbid';
    const IllBrwReqPopUp = isIllBrwReq ? (
      <Popup
        content="This loan involves third party library, please return on time"
        trigger={<Icon name="exclamation circle" size="large" color="red" />}
      />
    ) : null;

    return (
      <LoansListItem
        loan={loan}
        extraItemProps={{
          itemClass: isLoanOverdue ? 'bkg-danger' : null,
          itemHeaderCmp: IllBrwReqPopUp,
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
        <Loader isLoading={isLoading}>
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
        </Loader>
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
