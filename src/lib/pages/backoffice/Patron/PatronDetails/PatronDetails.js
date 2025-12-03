import { Error } from '@components/Error';
import { Loader } from '@components/Loader';
import { PatronBulkExtendLoans } from '@modules/Patron/PatronBulkExtendLoans';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Overridable from 'react-overridable';
import {
  Container,
  Divider,
  Grid,
  Header,
  Ref,
  Segment,
  Sticky,
} from 'semantic-ui-react';
import { ItemsCheckout } from './ItemsCheckout';
import { ItemsSearch } from './ItemsSearch';
import { PatronActionMenu } from './PatronActionMenu';
import { PatronCurrentBorrowingRequests } from './PatronCurrentBorrowingRequests';
import { PatronCurrentLoans } from './PatronCurrentLoans';
import { PatronDocumentRequests } from './PatronDocumentRequests';
import { PatronHeader } from './PatronHeader';
import { PatronPastBorrowingRequests } from './PatronPastBorrowingRequests';
import { PatronPastLoans } from './PatronPastLoans';
import { PatronPendingLoans } from './PatronPendingLoans';

export default class PatronDetails extends Component {
  constructor(props) {
    super(props);
    this.menuRef = React.createRef();
    this.headerRef = React.createRef();
  }

  componentDidMount() {
    const { fetchPatronDetails, match } = this.props;
    fetchPatronDetails(match.params.patronPid);
  }

  componentDidUpdate(prevProps, prevState) {
    const { fetchPatronDetails, match } = this.props;

    const currentPatronPid = match.params.patronPid;
    const samePatronPidFromRouter =
      prevProps.match.params.patronPid === currentPatronPid;
    if (!samePatronPidFromRouter) {
      fetchPatronDetails(currentPatronPid);
    }
  }

  componentWillUnmount() {
    const { clearPatronDetails } = this.props;
    clearPatronDetails();
  }

  render() {
    const { isLoading, error, data, match, currentLoans } = this.props;
    const currentPatronPid = match.params.patronPid;
    return (
      <div ref={this.headerRef}>
        <Container fluid>
          <Loader isLoading={isLoading}>
            <Error error={error}>
              <Sticky context={this.headerRef} className="solid-background">
                <Container fluid className="spaced">
                  <PatronHeader data={data} />
                </Container>
                <Divider />
              </Sticky>
              <Container fluid>
                <Ref innerRef={this.menuRef}>
                  <Grid columns={2}>
                    <Grid.Column width={13}>
                      <Container className="spaced">
                        <Overridable
                          id="Backoffice.PatronDetails.Metadata"
                          patron={data}
                        />

                        <Header attached="top" as="h3">
                          Checkout
                        </Header>
                        <Segment
                          attached
                          className="bo-metadata-segment"
                          id="patron-checkout"
                        >
                          <ItemsCheckout />
                          <ItemsSearch />
                        </Segment>

                        <Header attached="top" as="h3">
                          Ongoing loans
                        </Header>
                        <Segment
                          attached
                          id="ongoing-loans"
                          className="bo-metadata-segment no-padding"
                        >
                          <PatronCurrentLoans />
                        </Segment>

                        <Header attached="top" as="h3">
                          Pending loans requests
                        </Header>
                        <Segment
                          attached
                          id="loan-requests"
                          className="bo-metadata-segment no-padding"
                        >
                          <PatronPendingLoans />
                        </Segment>

                        <Header attached="top" as="h3">
                          Ongoing interlibrary loans
                        </Header>
                        <Segment
                          attached
                          id="ongoing-borrowing-requests"
                          className="bo-metadata-segment no-padding"
                        >
                          <PatronCurrentBorrowingRequests />
                        </Segment>

                        <Header attached="top" as="h3">
                          Requests for new literature
                        </Header>
                        <Segment
                          attached
                          id="literature-requests"
                          className="bo-metadata-segment no-padding"
                        >
                          <PatronDocumentRequests />
                        </Segment>

                        <Header attached="top" as="h3">
                          Loans history
                        </Header>
                        <Segment
                          attached
                          id="loans-history"
                          className="bo-metadata-segment no-padding"
                        >
                          <PatronPastLoans />
                        </Segment>

                        <Header attached="top" as="h3">
                          Interlibrary loans history
                        </Header>
                        <Segment
                          attached
                          id="borrowing-requests-history"
                          className="bo-metadata-segment no-padding"
                        >
                          <PatronPastBorrowingRequests />
                        </Segment>
                      </Container>
                    </Grid.Column>
                    <Grid.Column width={3}>
                      <Sticky context={this.menuRef} offset={150}>
                        <PatronBulkExtendLoans
                          patronPid={currentPatronPid}
                          disabled={currentLoans.total === 0}
                          fluid
                          color="blue"
                        />
                        <Divider horizontal> Navigation </Divider>
                        <PatronActionMenu offset={-150} />
                      </Sticky>
                    </Grid.Column>
                  </Grid>
                </Ref>
              </Container>
            </Error>
          </Loader>
        </Container>
      </div>
    );
  }
}

PatronDetails.propTypes = {
  fetchPatronDetails: PropTypes.func.isRequired,
  clearPatronDetails: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  error: PropTypes.object,
  isLoading: PropTypes.bool,
  match: PropTypes.shape({
    params: PropTypes.shape({
      patronPid: PropTypes.string,
    }),
  }).isRequired,
  currentLoans: PropTypes.object.isRequired,
};

PatronDetails.defaultProps = {
  error: null,
  isLoading: false,
};
