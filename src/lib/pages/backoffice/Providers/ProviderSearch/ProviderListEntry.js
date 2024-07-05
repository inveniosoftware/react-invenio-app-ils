import { orderApi } from '@api/acquisition';
import { borrowingRequestApi } from '@api/ill';
import { ProviderIcon } from '@components/backoffice/icons';
import { AcquisitionRoutes, ILLRoutes, ProviderRoutes } from '@routes/urls';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Icon, Item, List } from 'semantic-ui-react';
import { Truncate } from '@components/Truncate';

const ProviderListInfo = ({ providerMetadata }) => (
  <List verticalAlign="middle" className="document-circulation">
    <List.Item>
      <List.Content>
        email <strong>{providerMetadata.email}</strong>
      </List.Content>
    </List.Item>
    <List.Item>
      <List.Content>
        phone <strong>{providerMetadata.phone}</strong>
      </List.Content>
    </List.Item>
  </List>
);

ProviderListInfo.propTypes = {
  providerMetadata: PropTypes.object.isRequired,
};

const ProviderOrderSearch = ({ providerMetadata }) => {
  const renderListItem = (api, route, text) => {
    const query = api.query().withProviderPid(providerMetadata.pid).qs();
    const path = route(query);
    return (
      <List.Item>
        <List.Content>
          <Link to={path}>
            <Icon name="search" />
            See {text}
          </Link>
        </List.Content>
      </List.Item>
    );
  };

  return (
    <List>
      {renderListItem(
        borrowingRequestApi,
        ILLRoutes.borrowingRequestListWithQuery,
        'borrowing requests'
      )}
      {renderListItem(
        orderApi,
        AcquisitionRoutes.ordersListWithQuery,
        'purchase orders'
      )}
    </List>
  );
};

ProviderOrderSearch.propTypes = {
  providerMetadata: PropTypes.object.isRequired,
};

export default class ProviderListEntry extends Component {
  renderMiddleColumn = (providerMetadata) => {
    const { renderMiddleColumn } = this.props;
    if (renderMiddleColumn) {
      return renderMiddleColumn(providerMetadata);
    }
    return <ProviderListInfo providerMetadata={providerMetadata} />;
  };

  renderRightColumn = (providerMetadata) => {
    const { renderRightColumn } = this.props;

    if (renderRightColumn) {
      return renderRightColumn(providerMetadata);
    }
    return <ProviderOrderSearch providerMetadata={providerMetadata} />;
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
          {address.split('\n').map((line) => (
            <React.Fragment key={line}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </p>
      </Item.Description>
    );
  };

  render() {
    const {
      record: { metadata: providerMetadata },
    } = this.props;
    return (
      <Item>
        <Item.Content>
          <Item.Header
            as={Link}
            to={ProviderRoutes.providerDetailsFor(providerMetadata.pid)}
            data-test={`navigate-${providerMetadata.pid}`}
          >
            <ProviderIcon />
            <Truncate lines={2} width="500px">
              {providerMetadata.name}
            </Truncate>
          </Item.Header>
          <Item.Meta>
            Type: <strong>{providerMetadata.type}</strong>
          </Item.Meta>
          <Grid highlight={3}>
            <Grid.Column computer={6} largeScreen={6}>
              {this.renderAddress()}
            </Grid.Column>
            <Grid.Column computer={4} largeScreen={4}>
              {this.renderMiddleColumn(providerMetadata)}
            </Grid.Column>
            <Grid.Column width={1} />
            <Grid.Column computer={3} largeScreen={3}>
              {this.renderRightColumn(providerMetadata)}
            </Grid.Column>
          </Grid>
        </Item.Content>
        <div className="pid-field">#{providerMetadata.pid}</div>
      </Item>
    );
  }
}

ProviderListEntry.propTypes = {
  record: PropTypes.object.isRequired,
  renderMiddleColumn: PropTypes.func,
  renderRightColumn: PropTypes.func,
};

ProviderListEntry.defaultProps = {
  renderMiddleColumn: null,
  renderRightColumn: null,
};
