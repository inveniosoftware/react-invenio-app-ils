import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Icon, List } from 'semantic-ui-react';

export default class DocumentCirculation extends Component {
  renderOverbookIcon = (isOverbooked) => {
    const name = isOverbooked ? 'warning sign' : 'minus';
    const color = isOverbooked ? 'red' : 'green';
    return <Icon name={name} color={color} size="small" />;
  };

  render() {
    const { document } = this.props;
    const circulation = document.metadata.circulation;
    return (
      <List verticalAlign="middle" className="document-circulation">
        <List.Item>
          <List.Content floated="right">
            <strong>{document.metadata.items.total}</strong>
          </List.Content>
          <List.Content>total physical copies</List.Content>
        </List.Item>
        <List.Item>
          <List.Content floated="right">
            <strong>{circulation.available_items_for_loan_count}</strong>
          </List.Content>
          <List.Content>available copies for loan</List.Content>
        </List.Item>
        <List.Item>
          <List.Content floated="right">
            <strong>{circulation.active_loans_count}</strong>
          </List.Content>
          <List.Content>active loans</List.Content>
        </List.Item>
        <List.Item>
          <List.Content floated="right">
            <strong>{circulation.pending_loans_count}</strong>
          </List.Content>
          <List.Content>loan requests</List.Content>
        </List.Item>
        <List.Item>
          <List.Content floated="right">
            {this.renderOverbookIcon(circulation.overbooked)}
          </List.Content>
          <List.Content>overbooked</List.Content>
        </List.Item>
      </List>
    );
  }
}

DocumentCirculation.propTypes = {
  document: PropTypes.object.isRequired,
};
