/*
 * SPDX-FileCopyrightText: 2026 CERN.
 * SPDX-License-Identifier: MIT
 */

import { patronApi } from '@api/patrons';
import { LoanIcon } from '@components/backoffice/icons';
import { ESSelectorModal } from '@modules/ESSelector';
import { serializePatron } from '@modules/ESSelector/serializer';
import _get from 'lodash/get';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Button, Icon, List, Message, Segment } from 'semantic-ui-react';
import { CheckOutListEntry, getCheckOutProblem } from './CheckOutListEntry';

const pluralizeCopies = (count) =>
  `${count} physical ${count === 1 ? 'copy' : 'copies'}`;

const patronSearch = (query) =>
  patronApi.list(
    patronApi
      .query()
      .withPid(query)
      .withEmail(query)
      .withCustomField(query)
      .qs(),
    false
  );

export default class CheckOutList extends Component {
  onSave = (results) => {
    const { items, checkOutItems } = this.props;
    checkOutItems(items, results[0].metadata.id.toString());
  };

  /**
   * NOTE: ESSelectorModal wraps the content in a <p>, so the warning is
   * rendered with inline elements to keep the DOM valid.
   */
  renderModalContent = () => {
    const { items } = this.props;
    const problems = items
      .map((item) => ({ item, problem: getCheckOutProblem(item) }))
      .filter(({ problem }) => problem);

    return (
      <>
        {problems.length > 0 && (
          <Message warning as="span" className="checkout-list-warning">
            <Icon name="warning sign" />
            <strong>
              {pluralizeCopies(problems.length)} cannot be checked out:
            </strong>
            {problems.map(({ item, problem }) => (
              <span key={item.metadata.pid}>
                {item.metadata.barcode} -{' '}
                {_get(item, 'metadata.document.title')}: {problem.text}
              </span>
            ))}
          </Message>
        )}
        Insert patron id/email to create the loans:
      </>
    );
  };

  render() {
    const { items, isLoading, removeFromCheckOutList } = this.props;
    if (items.length === 0) return null;

    return (
      <Segment loading={isLoading}>
        <List divided verticalAlign="middle">
          {items.map((item) => (
            <CheckOutListEntry
              key={item.metadata.pid}
              item={item}
              onRemove={removeFromCheckOutList}
            />
          ))}
        </List>
        <ESSelectorModal
          trigger={
            <Button positive icon labelPosition="left" disabled={isLoading}>
              <LoanIcon />
              Checkout {pluralizeCopies(items.length)}
            </Button>
          }
          query={patronSearch}
          serializer={serializePatron}
          title={`You are about to checkout ${pluralizeCopies(items.length)}.`}
          content={this.renderModalContent()}
          selectionInfoText="The loans will be created for the following patron:"
          emptySelectionInfoText="No patron selected yet"
          onSave={this.onSave}
          saveButtonContent="Checkout physical copies"
          focus
        />
      </Segment>
    );
  }
}

CheckOutList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool,
  removeFromCheckOutList: PropTypes.func.isRequired,
  checkOutItems: PropTypes.func.isRequired,
};

CheckOutList.defaultProps = {
  items: [],
  isLoading: false,
};
