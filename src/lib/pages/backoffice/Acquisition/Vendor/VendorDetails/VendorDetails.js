import { acqOrderApi as orderApi } from '@api/acquisition';
import { CopyButton } from '@components/CopyButton';
import { Error } from '@components/Error';
import { Loader } from '@components/Loader';
import { goTo } from '@history';
import { DeleteRecordModal } from '@components/backoffice/DeleteRecordModal';
import { DetailsHeader } from '@components/backoffice/DetailsHeader';
import { EditButton } from '@components/backoffice/buttons/EditButton';
import { DeleteButton } from '@components/backoffice/DeleteRecordModal/DeleteButton';
import { AcquisitionVendorIcon } from '@components/backoffice/icons';
import { AcquisitionRoutes } from '@routes/urls';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Accordion,
  Container,
  Divider,
  Grid,
  Icon,
  Ref,
  Sticky,
} from 'semantic-ui-react';
import { VendorInformation } from './VendorInformation';

const DeleteVendorButton = props => {
  return (
    <DeleteButton
      fluid
      content="Delete vendor"
      labelPosition="left"
      {...props}
    />
  );
};

class ActionMenu extends React.Component {
  createRefProps(vendorPid) {
    const orderRefProps = {
      refType: 'Order',
      onRefClick: orderPid => goTo(AcquisitionRoutes.orderDetailsFor(orderPid)),
      getRefData: () =>
        orderApi.list(
          orderApi
            .query()
            .withVendorPid(vendorPid)
            .qs()
        ),
    };

    return [orderRefProps];
  }

  render() {
    const {
      deleteVendorHandler,
      data: { metadata: vendor },
    } = this.props;

    return (
      <div className="bo-action-menu">
        <Sticky context={this.contextRef}>
          <EditButton fluid to={AcquisitionRoutes.vendorEditFor(vendor.pid)} />
          <DeleteRecordModal
            deleteHeader={`Are you sure you want to delete the Vendor record
              with ID ${vendor.pid}?`}
            refProps={this.createRefProps(vendor.pid)}
            onDelete={() => deleteVendorHandler(vendor.pid)}
            trigger={DeleteVendorButton}
          />

          <Divider horizontal>Navigation</Divider>

          <Link
            to={AcquisitionRoutes.ordersListWithQuery(
              orderApi
                .query()
                .withVendorPid(vendor.pid)
                .qs()
            )}
          >
            <Icon name="search" />
            See orders from {vendor.name}
          </Link>
        </Sticky>
      </div>
    );
  }
}

ActionMenu.propTypes = {
  deleteVendorHandler: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

class VendorHeader extends React.Component {
  render() {
    const { data } = this.props;
    return (
      <DetailsHeader
        title={data.metadata.name}
        pid={data.metadata.pid}
        icon={<AcquisitionVendorIcon />}
      >
        <label>Vendor</label> #{data.metadata.pid}
        <CopyButton text={data.metadata.pid} />
      </DetailsHeader>
    );
  }
}

VendorHeader.propTypes = {
  data: PropTypes.object.isRequired,
};

class VendorDetailsInner extends React.Component {
  constructor(props) {
    super(props);
    this.contextRef = React.createRef();
  }

  render() {
    const { data } = this.props;
    const panels = [
      {
        key: 'vendor-info',
        title: 'Vendor information',
        content: (
          <Accordion.Content>
            <div ref={this.vendorInfoRef}>
              <VendorInformation vendor={data.metadata} />
            </div>
          </Accordion.Content>
        ),
      },
    ];

    return (
      <Accordion
        fluid
        styled
        className="highlighted"
        panels={panels}
        exclusive={false}
        defaultActiveIndex={[0]}
      />
    );
  }
}

VendorDetailsInner.propTypes = {
  data: PropTypes.object.isRequired,
};

export default class VendorDetails extends React.Component {
  constructor(props) {
    super(props);
    this.menuRef = React.createRef();
  }

  componentDidMount() {
    const { fetchVendorDetails } = this.props;
    fetchVendorDetails(this.props.match.params.vendorPid);
  }

  componentDidUpdate(prevProps) {
    const { fetchVendorDetails } = this.props;
    const vendorPid = this.props.match.params.vendorPid;
    const samePidFromRouter = prevProps.match.params.vendorPid === vendorPid;
    if (!samePidFromRouter) {
      fetchVendorDetails(vendorPid);
    }
  }

  render() {
    const { data, isLoading, error, deleteVendor } = this.props;

    return (
      <div ref={this.headerRef}>
        <Container fluid>
          <Loader isLoading={isLoading}>
            <Error error={error}>
              <Sticky context={this.headerRef} className="solid-background">
                <Container fluid className="spaced">
                  <VendorHeader data={data} />
                </Container>
                <Divider />
              </Sticky>
              <Container fluid>
                <Ref innerRef={this.menuRef}>
                  <Grid columns={2}>
                    <Grid.Column width={13}>
                      <Container className="spaced">
                        <VendorDetailsInner data={data} />
                      </Container>
                    </Grid.Column>
                    <Grid.Column width={3}>
                      <Sticky context={this.menuRef} offset={150}>
                        <ActionMenu
                          data={data}
                          deleteVendorHandler={deleteVendor}
                        />
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

VendorDetails.propTypes = {
  data: PropTypes.object.isRequired,
  fetchVendorDetails: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  error: PropTypes.object,
  deleteVendor: PropTypes.func.isRequired,
};

VendorDetails.defaultProps = {
  isLoading: false,
  error: null,
};
