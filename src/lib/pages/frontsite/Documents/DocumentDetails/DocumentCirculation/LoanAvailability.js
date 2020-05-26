import { toShortDate } from '@api/date';
import { List, Popup } from 'semantic-ui-react';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class LoanAvailability extends Component {
  render() {
    const { circulation } = this.props;
    if (circulation.has_items_for_loan > 0) {
      return (
        <List.Item>
          <Popup
            content="Calculated based on current library stock"
            trigger={<List.Icon name="info" />}
          />
          <List.Content
            className={
              circulation.has_items_for_loan > 0
                ? 'text-success'
                : 'text-danger'
            }
          >
            Available for loan <span className="success">now</span>
          </List.Content>
        </List.Item>
      );
    } else if (circulation.next_available_date) {
      return (
        <List.Item>
          <List.Icon name="info" />
          <List.Content>
            Available for loan from{' '}
            <b>{toShortDate(circulation.next_available_date)}</b>
          </List.Content>
        </List.Item>
      );
    } else {
      return (
        <List.Item>
          <List.Icon name="info" />
          <List.Content>
            Long waiting queue. Contact us for more information.
          </List.Content>
        </List.Item>
      );
    }
  }
}

LoanAvailability.propTypes = {
  circulation: PropTypes.object.isRequired,
};
