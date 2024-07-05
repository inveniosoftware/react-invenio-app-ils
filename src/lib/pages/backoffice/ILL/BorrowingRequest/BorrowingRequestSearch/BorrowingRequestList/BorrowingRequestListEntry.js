import { getDisplayVal, invenioConfig } from '@config';
import { ILLBorrowingRequestIcon } from '@components/backoffice/icons';
import { BackOfficeRoutes, ILLRoutes, ProviderRoutes } from '@routes/urls';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Item, List } from 'semantic-ui-react';
import { renderSubtitle } from '@modules/Document/utils';
import { Truncate } from '@components/Truncate';

export default class BorrowingRequestListEntry extends Component {
  renderLeftColumn = (brwReqMetadata) => {
    const {
      status,
      provider_pid: providerPid,
      provider,
      due_date: dueDate,
    } = brwReqMetadata;
    return (
      <>
        <Item.Description>
          <label>status </label>
          {getDisplayVal('ILL_BORROWING_REQUESTS.statuses', status)}
        </Item.Description>
        <Item.Description>
          <label>provider </label>
          <Link to={ProviderRoutes.providerDetailsFor(providerPid)}>
            {provider.name}
          </Link>
        </Item.Description>
        <Item.Description>
          <label>
            {invenioConfig.ILL_BORROWING_REQUESTS.fieldOverrides.due_date}{' '}
          </label>
          {dueDate ? dueDate : '-'}
        </Item.Description>
      </>
    );
  };

  renderMiddleColumn = (brwReqMetadata) => {
    const { renderMiddleColumn } = this.props;
    if (renderMiddleColumn) {
      return renderMiddleColumn(brwReqMetadata);
    }
    const {
      document_pid: documentPid,
      patron_pid: patronPid,
      patron,
    } = brwReqMetadata;

    const documentCmp = (
      <>
        Document{' '}
        <Link to={BackOfficeRoutes.documentDetailsFor(documentPid)}>
          <code>{documentPid}</code>
        </Link>
      </>
    );
    const patronCmp = (
      <>
        Patron{' '}
        {patronPid > 0 ? (
          <Link to={BackOfficeRoutes.patronDetailsFor(patronPid)}>
            <code>
              {patron.name} ({patronPid})
            </code>
          </Link>
        ) : (
          <code>{patron.name}</code>
        )}
      </>
    );

    return (
      <>
        <Item.Description>
          <Item.Meta>{documentCmp}</Item.Meta>
        </Item.Description>
        <Item.Description>
          <Item.Meta>{patronCmp}</Item.Meta>
        </Item.Description>
      </>
    );
  };

  renderRightColumn = (brwReqMetadata) => {
    const { renderRightColumn } = this.props;
    if (renderRightColumn) {
      return renderRightColumn(brwReqMetadata);
    }
    const {
      request_date: requestDate,
      received_date: receivedDate,
      expected_delivery_date: expectedDeliveryDate,
    } = brwReqMetadata;
    return (
      <List verticalAlign="middle" className="document-circulation">
        {requestDate && (
          <List.Item>
            <List.Content floated="right">
              <strong>{requestDate}</strong>
            </List.Content>
            <List.Content>requested</List.Content>
          </List.Item>
        )}
        {receivedDate && (
          <List.Item>
            <List.Content floated="right">
              <strong>{receivedDate}</strong>
            </List.Content>
            <List.Content>received</List.Content>
          </List.Item>
        )}
        {expectedDeliveryDate && (
          <List.Item>
            <List.Content floated="right">
              <strong>{expectedDeliveryDate}</strong>
            </List.Content>
            <List.Content>expected</List.Content>
          </List.Item>
        )}
      </List>
    );
  };

  render() {
    const {
      record: { metadata: brwReqMetadata },
    } = this.props;
    return (
      <Item>
        <Item.Content>
          <Item.Header
            as={Link}
            to={ILLRoutes.borrowingRequestDetailsFor(brwReqMetadata.pid)}
            data-test={`navigate-${brwReqMetadata.pid}`}
          >
            <ILLBorrowingRequestIcon />
            <Truncate lines={2} width="500px">
              {brwReqMetadata.document.title}
            </Truncate>
          </Item.Header>
          <Item.Meta>
            {renderSubtitle(brwReqMetadata.document?.alternative_titles)}
          </Item.Meta>
          <Grid highlight={3}>
            <Grid.Column computer={5} largeScreen={5}>
              {this.renderLeftColumn(brwReqMetadata)}
            </Grid.Column>
            <Grid.Column computer={6} largeScreen={6}>
              {this.renderMiddleColumn(brwReqMetadata)}
            </Grid.Column>
            <Grid.Column width={1} />
            <Grid.Column computer={3} largeScreen={3}>
              {this.renderRightColumn(brwReqMetadata)}
            </Grid.Column>
          </Grid>
        </Item.Content>
        <div className="pid-field">#{brwReqMetadata.pid}</div>
      </Item>
    );
  }
}

BorrowingRequestListEntry.propTypes = {
  record: PropTypes.object.isRequired,
  renderMiddleColumn: PropTypes.func,
  renderRightColumn: PropTypes.func,
};

BorrowingRequestListEntry.defaultProps = {
  renderMiddleColumn: null,
  renderRightColumn: null,
};
