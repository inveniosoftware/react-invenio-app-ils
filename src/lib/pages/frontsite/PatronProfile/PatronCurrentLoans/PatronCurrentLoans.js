import { toShortDate } from '@api/date';
import { Error } from '@components/Error';
import { InfoMessage } from '@components/InfoMessage';
import { Loader } from '@components/Loader';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Container, Header, Icon, Label, Popup } from 'semantic-ui-react';
import LoansList from '../LoansList';
import LoansListItem from '../LoansListEntry';
import { ExtendButton } from './ExtendButton';

class LoansListEntry extends Component {
  renderOverdueLabel = () => (
    <h4>
      Your loan is overdue. Please return the literature as soon as possible!
    </h4>
  );

  renderReturnLabel = endDate => (
    <h4>
      Please return the literature before date{' '}
      <Header size="large">{toShortDate(endDate)}</Header>
    </h4>
  );

  renderOngoingLabel = startDate => (
    <div className="pt-default">
      <Label basic>
        Loaned on
        <Label.Detail>{toShortDate(startDate)}</Label.Detail>
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
          itemMetaCmp: this.renderOngoingLabel(loan.metadata.start_date),
          itemDescriptionCmp: isLoanOverdue
            ? this.renderOverdueLabel()
            : this.renderReturnLabel(loan.metadata.end_date),
          itemExtraCmp: (
            <ExtendButton
              loan={loan}
              extendLoan={() => {}}
              onExtendSuccess={() => {}}
            />
          ),
        }}
      />
    );
  }
}

LoansListEntry.propTypes = {
  loan: PropTypes.object.isRequired,
};

export default class PatronCurrentLoans extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: props.initialPage,
    };
  }
  componentDidMount() {
    this.fetchPatronCurrentLoans();
  }

  fetchPatronCurrentLoans() {
    const { activePage } = this.state;
    const { patronPid, fetchPatronCurrentLoans, rowsPerPage } = this.props;
    fetchPatronCurrentLoans(patronPid, {
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
          content="Your current loans"
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
                  this.fetchPatronCurrentLoans
                );
              }}
              rowsPerPage={rowsPerPage}
              renderListEntry={loan => <LoansListEntry loan={loan} />}
              noLoansCmp={
                <InfoMessage
                  title="No ongoing loans"
                  message="You do not currently have any ongoing loan."
                />
              }
            />
          </Error>
        </Loader>
      </Container>
    );
  }
}

PatronCurrentLoans.propTypes = {
  patronPid: PropTypes.string.isRequired,
  initialPage: PropTypes.number,
  rowsPerPage: PropTypes.number,
  /* REDUX */
  loans: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.object.isRequired,
  fetchPatronCurrentLoans: PropTypes.func.isRequired,
};

PatronCurrentLoans.defaultProps = {
  initialPage: 1,
  rowsPerPage: 5,
};
