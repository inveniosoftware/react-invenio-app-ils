import { sessionManager } from '@authentication/services/SessionManager';
import { Error } from '@components/Error';
import { ILSItemPlaceholder } from '@components/ILSPlaceholder/ILSPlaceholder';
import { InfoMessage } from '@components/InfoMessage';
import { PatronBulkExtendLoans } from '@modules/Patron/PatronBulkExtendLoans';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Container, Grid, Header, Message } from 'semantic-ui-react';
import LoansList from '../LoansList';
import LoansListEntry from './LoansListEntry';

export default class PatronCurrentLoans extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: props.initialPage,
      isSuccessMessageVisible: false,
      successMessage: '',
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

  showSuccessMessage = (msg) => {
    this.setState({ isSuccessMessageVisible: true, successMessage: msg });
  };

  hideSuccessMessage = () => {
    this.setState({ isSuccessMessageVisible: false, successMessage: '' });
  };

  render() {
    const { error, isLoading, loans, rowsPerPage } = this.props;
    const { isSuccessMessageVisible, successMessage } = this.state;
    const { activePage } = this.state;
    const currentUser = sessionManager.user;
    return (
      <Container className="spaced">
        <Header
          as="h2"
          content="Your current loans"
          className="highlight"
          textAlign="center"
        />
        {isSuccessMessageVisible && (
          <Grid columns="3">
            <Grid.Column width="4" />
            <Grid.Column width="8">
              <Message
                positive
                icon="check"
                header="Success"
                content={successMessage}
                onDismiss={this.hideSuccessMessage}
              />
            </Grid.Column>
            <Grid.Column width="4" />
          </Grid>
        )}
        <Grid>
          <Grid.Column computer={4} tablet={8} mobile={16} floated="right">
            <PatronBulkExtendLoans color="orange" patronPid={currentUser.id} />
          </Grid.Column>
        </Grid>
        <ILSItemPlaceholder fluid isLoading={isLoading}>
          <Error error={error}>
            <LoansList
              activePage={activePage}
              isLoading={isLoading}
              loans={loans}
              onPageChange={(newPage) => {
                this.setState(
                  { activePage: newPage },
                  this.fetchPatronCurrentLoans
                );
              }}
              rowsPerPage={rowsPerPage}
              renderListEntry={(loan) => (
                <LoansListEntry
                  loan={loan}
                  onSuccess={(msg) => {
                    this.fetchPatronCurrentLoans();
                    this.showSuccessMessage(msg);
                  }}
                />
              )}
              noLoansCmp={
                <InfoMessage
                  title="No ongoing loans"
                  message="You do not currently have any ongoing loan."
                />
              }
            />
          </Error>
        </ILSItemPlaceholder>
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
