import { CopyButton } from '@components/CopyButton';
import { Error } from '@components/Error';
import { Loader } from '@components/Loader';
import { CreatedBy } from '@components/backoffice/ChangedBy';
import { DetailsHeader } from '@components/backoffice/DetailsHeader';
import { EditButton } from '@components/backoffice/buttons/EditButton';
import {
  ScrollingMenu,
  ScrollingMenuItem,
} from '@components/backoffice/buttons/ScrollingMenu';
import { ILLBorrowingRequestIcon } from '@components/backoffice/icons';
import { ILLRoutes, ProviderRoutes } from '@routes/urls';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Divider,
  Grid,
  Label,
  Message,
  Ref,
  Sticky,
} from 'semantic-ui-react';
import { BorrowingRequestMetadata } from './BorrowingRequestMetadata';
import { BorrowingRequestPayment } from './BorrowingRequestPayment';
import { BorrowingRequestStatistics } from './BorrowingRequestStatistics';
import { BorrowingRequestSteps } from './BorrowingRequestSteps';
import { renderSubtitle } from '@modules/Document/utils';

class BorrowingRequestHeader extends React.Component {
  renderStatus(status) {
    switch (status) {
      case 'PENDING':
        return <Label color="yellow">Pending</Label>;
      case 'REQUESTED':
        return <Label color="yellow">Requested</Label>;
      case 'ON_LOAN':
        return <Label color="green">On loan</Label>;
      case 'RETURNED':
        return <Label color="grey">Returned</Label>;
      case 'CANCELLED':
        return <Label color="grey">Cancelled</Label>;
      default:
        throw new Error(`Unknown status: ${status}`);
    }
  }

  render() {
    const { brwReq } = this.props;
    const provider = brwReq.provider;
    const providerLink = (
      <Link to={ProviderRoutes.providerDetailsFor(provider.pid)}>
        {provider.name}
      </Link>
    );
    const subtitle = renderSubtitle(brwReq.document?.alternative_titles);
    const pid = brwReq.pid;
    const recordInfo = (
      <>
        <label>Borrowing request</label> #{pid} <CopyButton text={pid} />
        {brwReq.created_by && (
          <>
            <br />
            <label className="muted">Created by</label>{' '}
            <CreatedBy metadata={brwReq} />
          </>
        )}
        <br />
        <label>Request date</label>{' '}
        {brwReq.request_date ? brwReq.request_date : '-'}
      </>
    );
    return (
      <DetailsHeader
        title={
          <>
            Borrowing request #{brwReq.pid}{' '}
            <div className="bo-details-header-status-labels">
              {this.renderStatus(brwReq.status)}{' '}
            </div>
          </>
        }
        subTitle={
          <>
            {brwReq.document.title}
            {subtitle ? (
              <>
                <br />
                {subtitle}
              </>
            ) : (
              <br />
            )}
            From provider: {providerLink}
          </>
        }
        pid={brwReq.pid}
        icon={<ILLBorrowingRequestIcon />}
        recordInfo={recordInfo}
      />
    );
  }
}

BorrowingRequestHeader.propTypes = {
  brwReq: PropTypes.object.isRequired,
};

class ActionMenu extends React.Component {
  render() {
    const { brwReq, offset } = this.props;

    return (
      <div className="bo-action-menu">
        <EditButton fluid to={ILLRoutes.borrowingRequestEditFor(brwReq.pid)} />

        <Message size="small">
          <Message.Header>Borrowing request deletion</Message.Header>
          <p>
            Borrowing requests cannot be deleted. You can cancel this borrowing
            request by changing its status when editing.
          </p>
        </Message>

        <Divider horizontal>Navigation</Divider>

        <ScrollingMenu offset={offset}>
          <ScrollingMenuItem
            elementId="request-info"
            label="Request information"
          />
          <ScrollingMenuItem
            elementId="payment-info"
            label="Payment information"
          />
        </ScrollingMenu>
      </div>
    );
  }
}
ActionMenu.propTypes = {
  brwReq: PropTypes.object.isRequired,
  offset: PropTypes.number,
};
ActionMenu.defaultProps = {
  offset: 0,
};

export default class BorrowingRequestDetails extends Component {
  constructor(props) {
    super(props);

    this.headerRef = React.createRef();
    this.menuRef = React.createRef();
  }

  componentDidMount() {
    const { fetchBorrowingRequestDetails, match } = this.props;
    fetchBorrowingRequestDetails(match.params.borrowingRequestPid);
  }

  componentDidUpdate(prevProps) {
    const { fetchBorrowingRequestDetails, match } = this.props;
    const borrowingRequestPid = match.params.borrowingRequestPid;

    const samePidFromRouter =
      prevProps.match.params.borrowingRequestPid === borrowingRequestPid;
    if (!samePidFromRouter) {
      fetchBorrowingRequestDetails(borrowingRequestPid);
    }
  }

  componentWillUnmount() {
    const { clearBorrowingRequestDetails } = this.props;
    clearBorrowingRequestDetails();
  }

  render() {
    const { isLoading, error, data } = this.props;
    const metadata = data.metadata || {};
    return (
      <div ref={this.headerRef}>
        <Container fluid>
          <Loader isLoading={isLoading}>
            <Error error={error}>
              <Sticky context={this.headerRef} className="solid-background">
                <Container fluid className="spaced">
                  <BorrowingRequestHeader brwReq={metadata} />
                </Container>
                <Divider />
              </Sticky>

              <Container fluid>
                <Ref innerRef={this.menuRef}>
                  <Grid columns={2}>
                    <Grid.Column width={13}>
                      <Container className="spaced">
                        <BorrowingRequestStatistics brwReq={metadata} />
                        <br />
                        <BorrowingRequestSteps brwReq={metadata} />
                        <BorrowingRequestMetadata brwReq={data} />
                        <BorrowingRequestPayment brwReq={metadata} />
                      </Container>
                    </Grid.Column>
                    <Grid.Column width={3}>
                      <Sticky context={this.menuRef} offset={150}>
                        <ActionMenu brwReq={metadata} offset={-150} />
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

BorrowingRequestDetails.propTypes = {
  data: PropTypes.object.isRequired,
  error: PropTypes.object,
  isLoading: PropTypes.bool.isRequired,
  fetchBorrowingRequestDetails: PropTypes.func.isRequired,
  clearBorrowingRequestDetails: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      borrowingRequestPid: PropTypes.string,
    }),
  }).isRequired,
};

BorrowingRequestDetails.defaultProps = {
  error: null,
};
