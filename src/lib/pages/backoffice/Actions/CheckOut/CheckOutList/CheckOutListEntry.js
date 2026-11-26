/*
 * SPDX-FileCopyrightText: 2026 CERN.
 * SPDX-License-Identifier: MIT
 */

import { getCheckOutIssue } from '@modules/Items/backoffice';
import { BackOfficeRoutes } from '@routes/urls';
import _get from 'lodash/get';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Label, List } from 'semantic-ui-react';

export const CheckOutListEntry = ({ item, onRemove }) => {
  const issue = getCheckOutIssue(item);
  const color = issue ? (issue.canCheckOut ? 'orange' : 'red') : 'green';
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
          <Label size="tiny" color={color}>
            {issue ? issue.text : 'Available'}
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
