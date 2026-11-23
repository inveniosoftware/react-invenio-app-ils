/*
 * SPDX-FileCopyrightText: 2026 CERN.
 * SPDX-License-Identifier: MIT
 */

import { itemApi } from '@api/items';
import { loanApi } from '@api/loans';
import { searchReady } from '@api/utils';
import { invenioConfig } from '@config';
import _get from 'lodash/get';

const ON_LOAN_STATE = 'ITEM_ON_LOAN';
// statuses that are set back to CAN_CIRCULATE (via a forced checkout) when
// the physical copy is checked out
const STATUSES_SET_TO_CIRCULATE = ['MISSING', 'IN_BINDING', 'SCANNING'];

const statusToText = (status) => status.toLowerCase().replace(/_/g, ' ');

/**
 * Describe what prevents, or what will change on, a backoffice checkout of
 * the item. Returns null when the item can be checked out as it is.
 *
 * - `canCheckOut: true`: the checkout will go ahead after fixing the item,
 *   i.e. checking in its current loan and/or setting it to circulate when
 *   missing, in binding or scanning.
 * - `canCheckOut: false`: the checkout is blocked.
 */
export const getCheckOutIssue = (item) => {
  const { circulation, status } = item.metadata;
  const loanState = _get(circulation, 'state');
  const isOnLoan = loanState === ON_LOAN_STATE;
  const willSetToCirculate = STATUSES_SET_TO_CIRCULATE.includes(status);

  if (
    !willSetToCirculate &&
    !invenioConfig.ITEMS.canCirculateStatuses.includes(status)
  ) {
    return { canCheckOut: false, text: `Cannot circulate (${status})` };
  }
  if (
    !isOnLoan &&
    invenioConfig.CIRCULATION.loanActiveStates.includes(loanState)
  ) {
    return { canCheckOut: false, text: `Has an active loan (${loanState})` };
  }

  const changes = [];
  if (isOnLoan) {
    changes.push(
      `on loan since ${circulation.start_date}, it will be checked in first`
    );
  }
  if (willSetToCirculate) {
    changes.push(
      `${statusToText(status)}, its status will be set to can circulate`
    );
  }
  return changes.length > 0
    ? { canCheckOut: true, text: `Currently ${changes.join('; ')}` }
    : null;
};

const checkInCurrentLoan = async (item) => {
  const { data: loan } = await loanApi.get(item.metadata.circulation.loan_pid);
  await loanApi.doAction(
    loan.availableActions.checkin,
    loan.metadata.document_pid,
    loan.metadata.patron_pid,
    { itemPid: loan.metadata.item_pid }
  );
  // wait for the loan index to be updated before checking out again
  await searchReady();
};

/**
 * Backoffice checkout: when the item is currently on loan, check in that
 * loan first; when it is missing, in binding or scanning, force the checkout
 * so that the backend sets it back to circulate. The item is fetched again to use its current
 * circulation state, which may be stale in search results.
 *
 * Returns the checkout response and the list of changes made to the item.
 */
export const checkOutItem = async (
  documentPid,
  itemPid,
  patronPid,
  { force = false } = {}
) => {
  const { data: item } = await itemApi.get(itemPid.value);
  const issue = getCheckOutIssue(item);
  const changes = [];

  if (issue && issue.canCheckOut) {
    if (_get(item, 'metadata.circulation.state') === ON_LOAN_STATE) {
      await checkInCurrentLoan(item);
      changes.push(
        `the previous loan of patron ${item.metadata.circulation.patron_pid} was checked in`
      );
    }
    const { status } = item.metadata;
    if (STATUSES_SET_TO_CIRCULATE.includes(status)) {
      force = true;
      changes.push(
        `the physical copy status was changed from ${statusToText(
          status
        )} to can circulate`
      );
    }
  }

  const response = await loanApi.doCheckout(documentPid, itemPid, patronPid, {
    force,
  });
  return { response, changes };
};
