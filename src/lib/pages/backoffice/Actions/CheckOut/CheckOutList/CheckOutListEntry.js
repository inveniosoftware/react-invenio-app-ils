/*
 * SPDX-FileCopyrightText: 2026 CERN.
 * SPDX-License-Identifier: MIT
 */

import { invenioConfig } from '@config';
import { BackOfficeRoutes } from '@routes/urls';
import _get from 'lodash/get';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Label, List } from 'semantic-ui-react';

/**
 * Returns the reason why the item cannot be checked out, or null if it can.
 */
export const getCheckOutProblem = (item) => {
  const { circulation, status } = item.metadata;
  if (
    invenioConfig.CIRCULATION.loanActiveStates.includes(
      _get(circulation, 'state')
    )
  ) {
    return {
      color: 'orange',
      text: `On loan since ${circulation.start_date}`,
    };
  }
  if (!invenioConfig.ITEMS.canCirculateStatuses.includes(status)) {
    return { color: 'red', text: `Cannot circulate (${status})` };
  }
  return null;
};

export const CheckOutListEntry = ({ item, onRemove }) => {
  const problem = getCheckOutProblem(item);
  return (
    <List.Item>
      <List.Content floated="right">
        <Button
          icon="close"
          basic
          size="mini"
          title="Remove from list"
          onClick={() => onRemove(item.metadata.pid)}
        />
      </List.Content>
      <List.Content>
        <List.Header
          as={Link}
          target="_blank"
          to={BackOfficeRoutes.itemDetailsFor(item.metadata.pid)}
        >
          {_get(item, 'metadata.document.title')}
        </List.Header>
        <List.Description>
          <Icon name="barcode" /> {item.metadata.barcode}{' '}
          <Label size="tiny" color={problem ? problem.color : 'green'}>
            {problem ? problem.text : 'Available'}
          </Label>
        </List.Description>
      </List.Content>
    </List.Item>
  );
};

CheckOutListEntry.propTypes = {
  item: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired,
};
