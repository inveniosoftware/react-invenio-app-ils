import { loanApi, patronApi } from '@api';
import { recordToPidType } from '@api/utils';
import { ESSelectorModal } from '@modules/ESSelector';
import { serializePatron } from '@modules/ESSelector/serializer';
import { invenioConfig } from '@config';
import { goTo } from '@history';
import { LoanIcon } from '@components/backoffice/icons';
import { EditButton } from '@components/backoffice/buttons/EditButton';
import { DeleteRecordModal } from '@components/backoffice/DeleteRecordModal';
import {
  ScrollingMenu,
  ScrollingMenuItem,
} from '@components/backoffice/buttons/ScrollingMenu';
import { DeleteButton } from '@components/backoffice/DeleteRecordModal/DeleteButton';
import { BackOfficeRoutes } from '@routes/urls';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Divider } from 'semantic-ui-react';

export default class ItemActionMenu extends Component {
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
              .withState(invenioConfig.circulation.loanActiveStates)
              .qs()
          ),
      },
    ];
  }

  checkoutItemButton = () => {
    const {
      item: { metadata },
    } = this.props;
    return (
      <Button
        positive
        icon
        fluid
        labelPosition="left"
        size="small"
        disabled={
          invenioConfig.circulation.loanActiveStates.includes(
            metadata.circulation.state
          ) ||
          !invenioConfig.items.canCirculateStatuses.includes(metadata.status)
        }
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

  render() {
    const { item, deleteItem, offset } = this.props;

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
          trigger={this.checkoutItemButton()}
          query={patronApi.list}
          serializer={serializePatron}
          title={`You are about to checkout the physical copy with barcode ${item.metadata.barcode}.`}
          content="Search for the patron to whom the loan should be created:"
          selectionInfoText="The loan will be created for the following patron:"
          emptySelectionInfoText="No patron selected yet"
          onSave={this.checkoutItem}
          saveButtonContent="Checkout physical copy"
        />
        <Divider horizontal> Navigation </Divider>
        <ScrollingMenu offset={offset}>
          <ScrollingMenuItem label="Circulation" elementId="circulation" />
          <ScrollingMenuItem label="Metadata" elementId="metadata" />
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
};

ItemActionMenu.defaultProps = {
  offset: 0,
};
