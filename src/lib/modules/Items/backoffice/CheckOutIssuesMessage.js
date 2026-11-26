/*
 * SPDX-FileCopyrightText: 2026 CERN.
 * SPDX-License-Identifier: MIT
 */

import _get from 'lodash/get';
import PropTypes from 'prop-types';
import React from 'react';
import { Icon, Message } from 'semantic-ui-react';
import { getCheckOutIssue } from './checkout';

const IssuesMessage = ({ issues, header, ...messageProps }) => (
  <Message as="span" className="checkout-issues-message" {...messageProps}>
    <Icon name="warning sign" />
    <strong>{header}</strong>
    {issues.map(({ item, issue }) => (
      <span key={item.metadata.pid}>
        {item.metadata.barcode} - {_get(item, 'metadata.document.title')}:{' '}
        {issue.text}
      </span>
    ))}
  </Message>
);

IssuesMessage.propTypes = {
  issues: PropTypes.arrayOf(PropTypes.object).isRequired,
  header: PropTypes.string.isRequired,
};

/**
 * Warn about the items that will be changed (orange) or cannot be checked
 * out (red) before a checkout.
 *
 * NOTE: rendered with inline elements since it is used as ESSelectorModal
 * content, which is wrapped in a <p>.
 */
export const CheckOutIssuesMessage = ({ items }) => {
  const issues = items
    .map((item) => ({ item, issue: getCheckOutIssue(item) }))
    .filter(({ issue }) => issue);
  const changed = issues.filter(({ issue }) => issue.canCheckOut);
  const blocked = issues.filter(({ issue }) => !issue.canCheckOut);

  return (
    <>
      {changed.length > 0 && (
        <IssuesMessage
          warning
          issues={changed}
          header="Will be checked out after these changes:"
        />
      )}
      {blocked.length > 0 && (
        <IssuesMessage
          error
          issues={blocked}
          header="Cannot be checked out and will be skipped:"
        />
      )}
    </>
  );
};

CheckOutIssuesMessage.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};
