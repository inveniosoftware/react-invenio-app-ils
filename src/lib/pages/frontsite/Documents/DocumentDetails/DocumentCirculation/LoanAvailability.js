import { DateTime } from 'luxon';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { List, Popup } from 'semantic-ui-react';
import Overridable from 'react-overridable';

export class LoanAvailability extends Component {
  render() {
    const { circulation } = this.props;
    if (circulation.available_items_for_loan_count > 0) {
      return (
        <Overridable id="LoanAvailability.AvailableNow">
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
        </Overridable>
      );
    } else if (circulation.next_available_date) {
      return (
        <Overridable id="LoanAvailability.AvailableFrom">
          <List.Item>
            <List.Icon name="info circle" />
            <List.Content>
              Available for loan from{' '}
              <b>
                {DateTime.fromISO(
                  circulation.next_available_date
                ).toLocaleString({
                  locale: 'en-GB',
                  month: 'long',
                  day: 'numeric',
                })}
              </b>
            </List.Content>
          </List.Item>
        </Overridable>
      );
    } else {
      return (
        <Overridable id="LoanAvailability.NotAvailable">
          <List.Item>
            <List.Icon name="info" />
            <List.Content>
              There are no physical copies for this literature currently
              available at the library. If you would like to loan it, please
              place a request. The library staff will evaluate it.
            </List.Content>
          </List.Item>
        </Overridable>
      );
    }
  }
}

LoanAvailability.propTypes = {
  circulation: PropTypes.object.isRequired,
};

export default Overridable.component('LoanAvailability', LoanAvailability);
