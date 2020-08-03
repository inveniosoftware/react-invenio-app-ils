import { orderApi } from '@api/acquisition';
import { AcquisitionVendorIcon } from '@components/backoffice/icons';
import { AcquisitionRoutes } from '@routes/urls';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Icon, Item, List } from 'semantic-ui-react';

const VendorListInfo = ({ vendor }) => (
  <List verticalAlign="middle" className="document-circulation">
    <List.Item>
      <List.Content>
        email <strong>{vendor.metadata.email}</strong>
      </List.Content>
    </List.Item>
    <List.Item>
      <List.Content>
        phone <strong>{vendor.metadata.phone}</strong>
      </List.Content>
    </List.Item>
  </List>
);

VendorListInfo.propTypes = {
  vendor: PropTypes.object.isRequired,
};

const VendorOrderSearch = ({ vendor }) => {
  const orderQuery = orderApi
    .query()
    .withVendorPid(vendor.metadata.pid)
    .qs();
  return (
    <List.Item>
      <List.Content>
        <Link to={AcquisitionRoutes.ordersListWithQuery(orderQuery)}>
          <Icon name="search" />
          See purchase orders
        </Link>
      </List.Content>
    </List.Item>
  );
};

VendorOrderSearch.propTypes = {
  vendor: PropTypes.object.isRequired,
};

export default class VendorListEntry extends Component {
  renderMiddleColumn = vendor => {
    const { renderMiddleColumn } = this.props;
    if (renderMiddleColumn) {
      return renderMiddleColumn(vendor);
    }
    return <VendorListInfo vendor={vendor} />;
  };

  renderRightColumn = vendor => {
    const { renderRightColumn } = this.props;
    if (renderRightColumn) {
      return renderRightColumn(vendor);
    }
    return <VendorOrderSearch vendor={vendor} />;
  };

  renderAddress = () => {
    const {
      record: {
        metadata: { address },
      },
    } = this.props;

    if (!address) return null;

    return (
      <Item.Description>
        <p>
          {address.split('\n').map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </p>
      </Item.Description>
    );
  };

  render() {
    const { record } = this.props;
    return (
      <Item>
        <Item.Content>
          <Item.Header
            as={Link}
            to={AcquisitionRoutes.vendorDetailsFor(record.metadata.pid)}
            data-test={`navigate-${record.metadata.pid}`}
          >
            <AcquisitionVendorIcon />
            {record.metadata.name}
          </Item.Header>
          <Item.Meta>Address:</Item.Meta>
          <Grid highlight={3}>
            <Grid.Column computer={6} largeScreen={6}>
              {this.renderAddress()}
            </Grid.Column>
            <Grid.Column computer={4} largeScreen={4}>
              {this.renderMiddleColumn(record)}
            </Grid.Column>
            <Grid.Column width={1} />
            <Grid.Column computer={2} largeScreen={2}>
              {this.renderRightColumn(record)}
            </Grid.Column>
          </Grid>
        </Item.Content>
        <div className="pid-field">#{record.metadata.pid}</div>
      </Item>
    );
  }
}

VendorListEntry.propTypes = {
  record: PropTypes.object.isRequired,
  renderMiddleColumn: PropTypes.func,
  renderRightColumn: PropTypes.func,
};

VendorListEntry.defaultProps = {
  renderMiddleColumn: null,
  renderRightColumn: null,
};
