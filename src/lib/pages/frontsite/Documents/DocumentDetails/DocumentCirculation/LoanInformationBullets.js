import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { List } from 'semantic-ui-react';
import _isEmpty from 'lodash/isEmpty';
import { LoanAvailability } from './LoanAvailability';
import { DateTime } from 'luxon';

export class LoanInformationBullets extends Component {
  render() {
    const { circulation, lastLoan } = this.props;
    return (
      <List>
        {lastLoan && (
          <List.Item>
            <List.Icon name="calendar alternate" />
            <List.Content>
              You loaned this literature on{' '}
              <b>
                {DateTime.fromISO(lastLoan).toLocaleString({
                  month: 'long',
                  year: 'numeric',
                })}
              </b>
            </List.Content>
          </List.Item>
        )}
        {!_isEmpty(circulation) && (
          <LoanAvailability circulation={circulation} />
        )}
      </List>
    );
  }
}

LoanInformationBullets.propTypes = {
  circulation: PropTypes.object.isRequired,
  lastLoan: PropTypes.string,
};

LoanInformationBullets.defaultProps = {
  lastLoan: null,
};
