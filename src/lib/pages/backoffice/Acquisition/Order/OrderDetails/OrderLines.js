import { formatPrice } from '@api/utils';
import { PatronIcon } from '@components/backoffice/icons';
import LiteratureTitle from '@modules/Literature/LiteratureTitle';
import { BackOfficeRoutes } from '@routes/urls';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { Divider, Grid, Icon, Item, Message, Popup } from 'semantic-ui-react';
import Overridable from 'react-overridable';

const OrderLineLeftColumn = ({ line }) => {
  return (
    <>
      {line.patron && (
        <Item.Description>
          <label>Patron: </label>
          {line.patron_pid > 0 ? (
            <Link to={BackOfficeRoutes.patronDetailsFor(line.patron_pid)}>
              <PatronIcon /> {line.patron.name}
            </Link>
          ) : (
            <>{line.patron.name}</>
          )}
        </Item.Description>
      )}
      <Item.Description>
        <label>Medium: </label> {line.medium}
      </Item.Description>
      <Item.Description>
        <label>Recipient: </label> {line.recipient}
      </Item.Description>
      <Item.Description>
        <label>Purchase type: </label>
        {line.purchase_type}
      </Item.Description>
    </>
  );
};

OrderLineLeftColumn.propTypes = {
  line: PropTypes.object.isRequired,
};

const OrderLineMiddleColumn = ({ line }) => {
  return (
    <>
      <Item.Description>
        <label>Copies ordered: </label>
        {line.copies_ordered}
      </Item.Description>
      <Item.Description>
        <label>Copies received: </label>
        {line.copies_received || '-'}
      </Item.Description>
      <Item.Description>
        <label>Payment mode: </label>
        {line.payment_mode || '-'}
      </Item.Description>
      <Item.Description>
        <label>IDT ID: </label>
        {line.inter_departmental_transaction_id || '-'}{' '}
        <Popup
          content="Inter departmental transaction ID"
          trigger={<Icon name="info circle" />}
        />
      </Item.Description>
    </>
  );
};

OrderLineMiddleColumn.propTypes = {
  line: PropTypes.object.isRequired,
};

const OrderLineRightColumn = ({ line }) => {
  return (
    <>
      <Item.Description>
        <label>Payment information: </label>
        {line.budget_code || '-'}
      </Item.Description>
      <Item.Description>
        <label>Total price: </label>
        {formatPrice(line.total_price) || '-'}
      </Item.Description>
      <Item.Description>
        <label>Unit price: </label>
        {formatPrice(line.unit_price) || '-'}
      </Item.Description>
      <Item.Description>
        <label>Notes: </label>
        {line.notes || '-'}
      </Item.Description>
    </>
  );
};

OrderLineRightColumn.propTypes = {
  line: PropTypes.object.isRequired,
};

export const OrderLine = ({ line, LeftColumn, MiddleColumn, RightColumn }) => {
  return (
    <Item>
      <Item.Content>
        <Link to={BackOfficeRoutes.documentDetailsFor(line.document.pid)}>
          <LiteratureTitle
            title={line.document.title}
            edition={line.document.edition}
            publicationYear={line.document.publication_year}
          />
        </Link>
        <Divider />
        <Grid columns={3}>
          <Grid.Column>
            <LeftColumn line={line} />
          </Grid.Column>
          <Grid.Column>
            <MiddleColumn line={line} />
          </Grid.Column>
          <Grid.Column>
            <RightColumn line={line} />
          </Grid.Column>
        </Grid>
      </Item.Content>
    </Item>
  );
};

OrderLine.propTypes = {
  line: PropTypes.object.isRequired,
  LeftColumn: PropTypes.element,
  MiddleColumn: PropTypes.element,
  RightColumn: PropTypes.element,
};

OrderLine.defaultProps = {
  LeftColumn: OrderLineLeftColumn,
  MiddleColumn: OrderLineMiddleColumn,
  RightColumn: OrderLineRightColumn,
};

export default Overridable.component('Acquisition.OrderLine', OrderLine);

export class OrderLines extends React.Component {
  render() {
    const { lines } = this.props;
    if (lines.length === 0) {
      return (
        <Message data-test="no-results">There are no order lines.</Message>
      );
    }

    return (
      <Item.Group divided className="bo-order-lines" id="order-lines">
        {lines.map((line, index) => (
          <OrderLine key={line.document_pid} index={index} line={line} />
        ))}
      </Item.Group>
    );
  }
}

OrderLines.propTypes = {
  lines: PropTypes.array.isRequired,
};
