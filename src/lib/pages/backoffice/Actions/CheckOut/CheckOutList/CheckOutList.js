/*
 * SPDX-FileCopyrightText: 2026 CERN.
 * SPDX-License-Identifier: MIT
 */

import { patronApi } from '@api/patrons';
import { LoanIcon } from '@components/backoffice/icons';
import { ESSelectorModal } from '@modules/ESSelector';
import { serializePatron } from '@modules/ESSelector/serializer';
import { CheckOutIssuesMessage } from '@modules/Items/backoffice';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Button, List, Segment } from 'semantic-ui-react';
import { CheckOutListEntry } from './CheckOutListEntry';

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
    const { id, name } = results[0].metadata;
    checkOutItems(items, id.toString(), name);
  };

  renderModalContent = () => {
    const { items } = this.props;
    return (
      <>
        <CheckOutIssuesMessage items={items} />
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
