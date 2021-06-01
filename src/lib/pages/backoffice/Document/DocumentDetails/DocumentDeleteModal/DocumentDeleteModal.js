import { orderApi } from '@api/acquisition';
import { documentRequestApi } from '@api/documentRequests';
import { eItemApi } from '@api/eitems';
import { borrowingRequestApi } from '@api/ill';
import { itemApi } from '@api/items';
import { loanApi } from '@api/loans';
import { invenioConfig } from '@config';
import { goTo } from '@history';
import { DeleteRecordModal } from '@components/backoffice/DeleteRecordModal';
import { DeleteButton } from '@components/backoffice/DeleteRecordModal/DeleteButton';
import { formatPidTypeToName } from '@components/backoffice/utils';
import { AcquisitionRoutes, BackOfficeRoutes, ILLRoutes } from '@routes/urls';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

const deleteDocButton = (props) => {
  return (
    <DeleteButton
      fluid
      content="Delete document"
      labelPosition="left"
      {...props}
    />
  );
};

export default class DocumentDeleteModal extends Component {
  async getRelationRefs() {
    const { relations } = this.props;
    const hits = [];
    for (const [relation, records] of Object.entries(relations)) {
      for (const record of records) {
        const type = formatPidTypeToName(record.pid_type);
        hits.push({
          id: `${type} ${record.pid} (${relation})`,
          record: record,
          type: type,
        });
      }
    }
    return {
      data: {
        hits: hits,
        total: hits.length,
      },
    };
  }

  handleOnLoanRefClick(loanPid) {
    goTo(BackOfficeRoutes.loanDetailsFor(loanPid));
  }

  handleOnItemRefClick(itemPid) {
    goTo(BackOfficeRoutes.itemDetailsFor(itemPid));
  }

  handleOnEItemRefClick(eitemPid) {
    goTo(BackOfficeRoutes.eitemDetailsFor(eitemPid));
  }

  handleOnRequestRefClick(docReqPid) {
    goTo(BackOfficeRoutes.documentRequestDetailsFor(docReqPid));
  }

  handleOnBrwReqRefClick(brwReqPid) {
    goTo(ILLRoutes.borrowingRequestDetailsFor(brwReqPid));
  }
  handleOnOrderRefClick(orderPid) {
    goTo(AcquisitionRoutes.orderDetailsFor(orderPid));
  }
  /**
   * Used to create all the references for the document
   */
  createRefProps(documentPid) {
    const loanStates = invenioConfig.CIRCULATION.loanRequestStates.concat(
      invenioConfig.CIRCULATION.loanActiveStates
    );

    const loanRefProps = {
      refType: 'Loan',
      onRefClick: this.handleOnLoanRefClick,
      getRefData: () =>
        loanApi.list(
          loanApi.query().withDocPid(documentPid).withState(loanStates).qs()
        ),
    };

    const itemRefProps = {
      refType: 'Items',
      onRefClick: this.handleOnItemRefClick,
      getRefData: () =>
        itemApi.list(itemApi.query().withDocPid(documentPid).qs()),
    };

    const borrowingRequestRefProps = {
      refType: 'Borrowing requests',
      onRefClick: this.handleOnBrwReqRefClick,
      getRefData: () =>
        borrowingRequestApi.list(
          borrowingRequestApi.query().withDocPid(documentPid).qs()
        ),
    };

    const ordersRefProps = {
      refType: 'Orders',
      onRefClick: this.handleOnOrderRefClick,
      getRefData: () =>
        orderApi.list(orderApi.query().withDocPid(documentPid).qs()),
    };

    const eitemRefProps = {
      refType: 'E-items',
      onRefClick: this.handleOnEItemRefClick,
      getRefData: () =>
        itemApi.list(eItemApi.query().withDocPid(documentPid).qs()),
    };

    const relationRefProps = {
      refType: 'Related',
      onRefClick: () => {},
      getRefData: () => this.getRelationRefs(),
    };

    const requestRefProps = {
      refType: 'DocumentRequest',
      onRefClick: this.handleOnRequestRefClick,
      getRefData: () =>
        documentRequestApi.list(
          documentRequestApi.query().withDocPid(documentPid).qs()
        ),
    };

    return [
      loanRefProps,
      itemRefProps,
      relationRefProps,
      requestRefProps,
      eitemRefProps,
      borrowingRequestRefProps,
      ordersRefProps,
    ];
  }

  render() {
    const { document, deleteDocument } = this.props;
    return (
      <DeleteRecordModal
        deleteHeader={`Are you sure you want to delete the Document
            record with ID ${document.metadata.pid}?`}
        refProps={this.createRefProps(document.metadata.pid)}
        onDelete={() => deleteDocument(document.metadata.pid)}
        trigger={deleteDocButton}
      />
    );
  }
}

DocumentDeleteModal.propTypes = {
  document: PropTypes.object.isRequired,
  relations: PropTypes.object.isRequired,
  deleteDocument: PropTypes.func.isRequired,
};
