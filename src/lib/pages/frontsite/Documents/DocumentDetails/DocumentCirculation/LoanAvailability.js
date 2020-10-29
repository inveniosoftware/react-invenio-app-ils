import { DateTime } from 'luxon';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { List, Popup } from 'semantic-ui-react';

export class LoanAvailability extends Component {
  render() {
    const { circulation } = this.props;
    if (circulation.available_items_for_loan_count > 0) {
      return (
        <List.Item>
          <Popup
            content="Calculated based on current library stock"
            trigger={<List.Icon name="info circle" />}
          />
          <List.Content
            className={
              circulation.available_items_for_loan_count > 0
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
          <List.Icon name="info circle" />
          <List.Content>
            Available for loan from{' '}
            <b>
              {DateTime.fromISO(circulation.next_available_date).toLocaleString(
                {
                  locale: 'en-GB',
                  month: 'long',
                  day: 'numeric',
                }
              )}
            </b>
          </List.Content>
        </List.Item>
      );
    } else {
      return (
        <List.Item>
          <List.Icon name="info" />
          <List.Content>
            Long waiting queue. Contact the library for more information.
          </List.Content>
        </List.Item>
      );
    }
  }
}

LoanAvailability.propTypes = {
  circulation: PropTypes.object.isRequired,
};
