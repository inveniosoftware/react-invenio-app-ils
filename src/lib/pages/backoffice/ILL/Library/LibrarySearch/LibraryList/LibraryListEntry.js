import { borrowingRequestApi } from '@api/ill';
import { ILLLibraryIcon } from '@components/backoffice/icons';
import { ILLRoutes } from '@routes/urls';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Icon, Item, List } from 'semantic-ui-react';

const LibraryListInfo = ({ libraryMetadata }) => (
  <List verticalAlign="middle" className="document-circulation">
    <List.Item>
      <List.Content>
        email <strong>{libraryMetadata.email}</strong>
      </List.Content>
    </List.Item>
    <List.Item>
      <List.Content>
        phone <strong>{libraryMetadata.phone}</strong>
      </List.Content>
    </List.Item>
  </List>
);

LibraryListInfo.propTypes = {
  libraryMetadata: PropTypes.object.isRequired,
};

const LibraryOrderSearch = ({ libraryMetadata }) => {
  const brwReqQuery = borrowingRequestApi
    .query()
    .withLibraryPid(libraryMetadata.pid)
    .qs();
  return (
    <List.Item>
      <List.Content>
        <Link to={ILLRoutes.borrowingRequestListWithQuery(brwReqQuery)}>
          <Icon name="search" />
          See borrowing requests
        </Link>
      </List.Content>
    </List.Item>
  );
};

LibraryOrderSearch.propTypes = {
  libraryMetadata: PropTypes.object.isRequired,
};

export default class LibraryListEntry extends Component {
  renderMiddleColumn = (libraryMetadata) => {
    const { renderMiddleColumn } = this.props;
    if (renderMiddleColumn) {
      return renderMiddleColumn(libraryMetadata);
    }
    return <LibraryListInfo libraryMetadata={libraryMetadata} />;
  };

  renderRightColumn = (libraryMetadata) => {
    const { renderRightColumn } = this.props;

    if (renderRightColumn) {
      return renderRightColumn(libraryMetadata);
    }
    return <LibraryOrderSearch libraryMetadata={libraryMetadata} />;
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
      record: { metadata: libraryMetadata },
    } = this.props;
    return (
      <Item>
        <Item.Content>
          <Item.Header
            as={Link}
            to={ILLRoutes.libraryDetailsFor(libraryMetadata.pid)}
            data-test={`navigate-${libraryMetadata.pid}`}
          >
            <ILLLibraryIcon />
            {libraryMetadata.name}
          </Item.Header>
          <Item.Meta>Address:</Item.Meta>
          <Grid highlight={3}>
            <Grid.Column computer={6} largeScreen={6}>
              {this.renderAddress()}
            </Grid.Column>
            <Grid.Column computer={4} largeScreen={4}>
              {this.renderMiddleColumn(libraryMetadata)}
            </Grid.Column>
            <Grid.Column width={1} />
            <Grid.Column computer={3} largeScreen={3}>
              {this.renderRightColumn(libraryMetadata)}
            </Grid.Column>
          </Grid>
        </Item.Content>
        <div className="pid-field">#{libraryMetadata.pid}</div>
      </Item>
    );
  }
}

LibraryListEntry.propTypes = {
  record: PropTypes.object.isRequired,
  renderMiddleColumn: PropTypes.func,
  renderRightColumn: PropTypes.func,
};

LibraryListEntry.defaultProps = {
  renderMiddleColumn: null,
  renderRightColumn: null,
};
