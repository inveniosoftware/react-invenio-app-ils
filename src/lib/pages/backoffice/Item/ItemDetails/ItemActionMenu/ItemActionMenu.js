import { loanApi } from '@api/loans';
import { patronApi } from '@api/patrons';
import { recordToPidType } from '@api/utils';
import { EditButton } from '@components/backoffice/buttons/EditButton';
import {
  ScrollingMenu,
  ScrollingMenuItem,
} from '@components/backoffice/buttons/ScrollingMenu';
import { DeleteRecordModal } from '@components/backoffice/DeleteRecordModal';
import { DeleteButton } from '@components/backoffice/DeleteRecordModal/DeleteButton';
import { LoanIcon } from '@components/backoffice/icons';
import { invenioConfig } from '@config';
import { goTo } from '@history';
import { ESSelectorModal } from '@modules/ESSelector';
import { serializePatron } from '@modules/ESSelector/serializer';
import { BackOfficeRoutes } from '@routes/urls';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Button, Divider } from 'semantic-ui-react';
import _first from 'lodash/first';
import _get from 'lodash/get';

export default class ItemActionMenu extends Component {
  checkOutDisabled() {
    const {
      item: { metadata },
    } = this.props;
    return (
      invenioConfig.CIRCULATION.loanActiveStates.includes(
        metadata.circulation.state
      ) || !invenioConfig.ITEMS.canCirculateStatuses.includes(metadata.status)
    );
  }

  hasCheckOutItem() {
    const {
      checkOutitemList,
      item: { metadata },
    } = this.props;
    const firstItem = _first(checkOutitemList);
    return (
      !this.checkOutDisabled() &&
      _get(firstItem, 'metadata.barcode') === metadata.barcode
    );
  }

  handleOnRefClick(loanPid) {
    goTo(BackOfficeRoutes.loanDetailsFor(loanPid));
  }

  createRefProps(itemPid) {
    return [
      {
        refType: 'Loan',
        onRefClick: this.handleOnRefClick,
        getRefData: () =>
          loanApi.list(
            loanApi
              .query()
              .withItemPid(itemPid)
              .withState(invenioConfig.CIRCULATION.loanActiveStates)
              .qs()
          ),
      },
    ];
  }

  checkoutItemButton = () => {
    return (
      <Button
        positive
        icon
        fluid
        labelPosition="left"
        size="small"
        disabled={this.checkOutDisabled()}
      >
        <LoanIcon />
        Checkout this copy
      </Button>
    );
  };

  deleteDocButton = props => {
    return (
      <DeleteButton
        fluid
        content="Delete physical copy"
        labelPosition="left"
        {...props}
      />
    );
  };

  checkoutItem = results => {
    const {
      checkoutItem,
      item: { metadata },
      item,
    } = this.props;
    const documentPid = metadata.document_pid;
    const itemPid = {
      type: recordToPidType(item),
      value: item.metadata.pid,
    };
    const patronPid = results[0].metadata.id.toString();
    checkoutItem(documentPid, itemPid, patronPid);
  };

  onResults = results => {
    if (!this.hasCheckOutItem() || results.length !== 1) return;
    this.checkoutItem(results);
  };

  render() {
    const { item, deleteItem, offset } = this.props;
    const hasCheckOutItem = this.hasCheckOutItem();

    return (
      <div className="bo-action-menu">
        <EditButton
          fluid
          to={BackOfficeRoutes.itemEditFor(item.metadata.pid)}
          text="Edit physical copy"
        />
        <DeleteRecordModal
          trigger={this.deleteDocButton}
          deleteHeader={`Are you sure you want to delete the physical copy
            record with ID ${item.pid}?`}
          onDelete={() => deleteItem(item.pid)}
          refProps={this.createRefProps(item.pid)}
        />
        <Divider horizontal> Circulation </Divider>
        <ESSelectorModal
          modalOpened={hasCheckOutItem}
          autoSelect={hasCheckOutItem}
          minCharacters={hasCheckOutItem ? 1 : 3}
          onResults={this.onResults}
          trigger={this.checkoutItemButton()}
          query={patronApi.list}
          serializer={serializePatron}
          title={`You are about to checkout the physical copy with barcode ${item.metadata.barcode}.`}
          content="Insert patron id/email to create a loan:"
          selectionInfoText="The loan will be created for the following patron:"
          emptySelectionInfoText="No patron selected yet"
          onSave={this.checkoutItem}
          saveButtonContent="Checkout physical copy"
        />
        <Divider horizontal> Navigation </Divider>
        <ScrollingMenu offset={offset}>
          <ScrollingMenuItem label="Circulation" elementId="circulation" />
          <ScrollingMenuItem label="Metadata" elementId="metadata" />
          <ScrollingMenuItem label="Loans request" elementId="loans-request" />
          <ScrollingMenuItem label="Loans history" elementId="loans-history" />
        </ScrollingMenu>
      </div>
    );
  }
}

ItemActionMenu.propTypes = {
  item: PropTypes.object.isRequired,
  offset: PropTypes.number,
  deleteItem: PropTypes.func.isRequired,
  checkoutItem: PropTypes.func.isRequired,
  checkOutitemList: PropTypes.arrayOf(PropTypes.object),
};

ItemActionMenu.defaultProps = {
  offset: 0,
  checkOutitemList: [],
};
