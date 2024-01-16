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
import { AcquisitionOrderIcon } from '@components/backoffice/icons';
import { AcquisitionRoutes, ProviderRoutes } from '@routes/urls';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Divider,
  Grid,
  Header,
  Label,
  Message,
  Ref,
  Segment,
  Sticky,
} from 'semantic-ui-react';
import { OrderInformation } from './OrderInformation';
import { OrderLines } from './OrderLines';
import { OrderStatistics } from './OrderStatistics';
import { PaymentInformation } from '@components/backoffice/PaymentInformation';
import { OrderSteps } from './OrderSteps';
import Overridable from 'react-overridable';

class OrderHeader extends React.Component {
  renderStatus(status) {
    switch (status) {
      case 'CANCELLED':
        return <Label color="grey">Cancelled</Label>;
      case 'PENDING':
        return <Label color="yellow">Pending</Label>;
      case 'ORDERED':
        return <Label color="yellow">Ordered</Label>;
      case 'RECEIVED':
        return <Label color="green">Received</Label>;
      default:
        throw new Error(`Unknown status: ${status}`);
    }
  }

  render() {
    const { data } = this.props;
    const provider = data.metadata.provider;
    const providerLink = (
      <Link to={ProviderRoutes.providerDetailsFor(provider.pid)}>
        {provider.name}
      </Link>
    );
    const pid = data.metadata.pid;
    const recordInfo = (
      <>
        <label>Order</label> #{pid} <CopyButton text={pid} />
        {data.metadata.created_by && (
          <>
            <br />
            <label className="muted">Created by</label>{' '}
            <CreatedBy metadata={data.metadata} />
          </>
        )}
        <br />
        {data.metadata.order_date && (
          <>
            <label>Order date</label> {data.metadata.order_date}
          </>
        )}
      </>
    );
    return (
      <DetailsHeader
        title={
          <>
            Purchase Order #{data.metadata.pid}{' '}
            {this.renderStatus(data.metadata.status)}
          </>
        }
        subTitle={<>From provider: {providerLink}</>}
        pid={data.metadata.pid}
        icon={<AcquisitionOrderIcon />}
        recordInfo={recordInfo}
      />
    );
  }
}

OrderHeader.propTypes = {
  data: PropTypes.object.isRequired,
};

class ActionMenu extends React.Component {
  render() {
    const { offset, data: order } = this.props;
    return (
      <div className="bo-action-menu">
        {order && (
          <EditButton fluid to={AcquisitionRoutes.orderEditFor(order.pid)} />
        )}

        <Message size="small">
          <Message.Header>Order deletion</Message.Header>
          <p>
            Orders cannot be deleted. You can cancel this order by changing its
            status when editing.
          </p>
        </Message>

        <Divider horizontal>Navigation</Divider>

        <ScrollingMenu offset={offset}>
          <ScrollingMenuItem elementId="order-info" label="Order information" />
          <ScrollingMenuItem
            elementId="payment-info"
            label="Payment information"
          />
          <ScrollingMenuItem elementId="order-lines" label="Order details" />
        </ScrollingMenu>
      </div>
    );
  }
}

ActionMenu.propTypes = {
  offset: PropTypes.number,
  data: PropTypes.object.isRequired,
};

ActionMenu.defaultProps = {
  offset: 0,
};

class OrderPanels extends React.Component {
  render() {
    const { data } = this.props;
    return (
      <>
        <Header as="h3" attached="top">
          Order information
        </Header>
        <Segment attached className="bo-metadata-segment">
          <OrderInformation order={data} />
        </Segment>
        <Header as="h3" attached="top">
          Payment Information
        </Header>
        <Segment attached className="bo-metadata-segment">
          <Overridable id="Backoffice.PaymentInformation">
            <PaymentInformation
              order={data.metadata}
              type="acquisition-order"
            />
          </Overridable>
        </Segment>
        <Header as="h3" attached="top">
          Order lines
        </Header>
        <Segment attached className="bo-metadata-segment">
          <OrderLines lines={data.metadata.resolved_order_lines} />
        </Segment>
      </>
    );
  }
}

OrderPanels.propTypes = {
  data: PropTypes.object.isRequired,
};

export default class OrderDetails extends React.Component {
  constructor(props) {
    super(props);

    this.headerRef = React.createRef();
    this.menuRef = React.createRef();
  }

  componentDidMount() {
    const { fetchOrderDetails, match } = this.props;
    fetchOrderDetails(match.params.orderPid);
  }

  componentDidUpdate(prevProps) {
    const { fetchOrderDetails, match } = this.props;
    const orderPid = match.params.orderPid;

    const samePidFromRouter = prevProps.match.params.orderPid === orderPid;
    if (!samePidFromRouter) {
      fetchOrderDetails(orderPid);
    }
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
                  <OrderHeader data={data} />
                </Container>
                <Divider />
              </Sticky>

              <Container fluid>
                <Ref innerRef={this.menuRef}>
                  <Grid columns={2}>
                    <Grid.Column width={13}>
                      <Container className="spaced">
                        <Container className="spaced">
                          <OrderStatistics order={metadata} />
                          <br />
                          <OrderSteps order={metadata} />
                        </Container>
                        <OrderPanels data={data} />
                      </Container>
                    </Grid.Column>
                    <Grid.Column width={3}>
                      <Sticky context={this.menuRef} offset={150}>
                        <ActionMenu data={metadata} offset={-150} />
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

OrderDetails.propTypes = {
  data: PropTypes.object.isRequired,
  fetchOrderDetails: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  error: PropTypes.object,
  match: PropTypes.shape({
    params: PropTypes.shape({
      orderPid: PropTypes.string,
    }),
  }).isRequired,
};

OrderDetails.defaultProps = {
  isLoading: false,
  error: null,
};
