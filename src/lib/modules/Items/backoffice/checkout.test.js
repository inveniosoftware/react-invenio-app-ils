/*
 * SPDX-FileCopyrightText: 2026 CERN.
 * SPDX-License-Identifier: MIT
 */

import { itemApi } from '@api/items';
import { loanApi } from '@api/loans';
import { checkOutItem, getCheckOutIssue } from './checkout';

jest.mock('@api/items');
jest.mock('@api/loans');
jest.mock('@api/utils', () => ({
  ...jest.requireActual('@api/utils'),
  searchReady: jest.fn(),
}));

const makeItem = (status, circulation = {}) => ({
  metadata: { pid: 'item-1', status, circulation },
});
const onLoan = {
  state: 'ITEM_ON_LOAN',
  loan_pid: 'loan-1',
  patron_pid: '7',
  start_date: '2026-11-01',
};

const documentPid = 'doc-1';
const itemPid = { type: 'pitmid', value: 'item-1' };
const patronPid = '2';

describe('getCheckOutIssue', () => {
  it('should return null for an available item', () => {
    expect(getCheckOutIssue(makeItem('CAN_CIRCULATE'))).toBeNull();
  });

  it('should allow the checkout of an item on loan', () => {
    const issue = getCheckOutIssue(makeItem('CAN_CIRCULATE', onLoan));
    expect(issue.canCheckOut).toBe(true);
    expect(issue.text).toContain('checked in');
  });

  it('should allow the checkout of a missing item', () => {
    const issue = getCheckOutIssue(makeItem('MISSING'));
    expect(issue.canCheckOut).toBe(true);
    expect(issue.text).toContain('can circulate');
  });

  it('should allow the checkout of a missing item on loan', () => {
    const issue = getCheckOutIssue(makeItem('MISSING', onLoan));
    expect(issue.canCheckOut).toBe(true);
    expect(issue.text).toContain('checked in');
    expect(issue.text).toContain('can circulate');
  });

  it('should block the checkout of an item that cannot circulate', () => {
    const issue = getCheckOutIssue(makeItem('IN_BINDING'));
    expect(issue.canCheckOut).toBe(false);
  });

  it('should block the checkout of an item with another active loan', () => {
    const issue = getCheckOutIssue(
      makeItem('CAN_CIRCULATE', { state: 'ITEM_AT_DESK' })
    );
    expect(issue.canCheckOut).toBe(false);
  });
});

describe('checkOutItem', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    loanApi.doCheckout.mockResolvedValue({ data: {} });
  });

  it('should only check out an available item', async () => {
    itemApi.get.mockResolvedValue({ data: makeItem('CAN_CIRCULATE') });

    const { changes } = await checkOutItem(documentPid, itemPid, patronPid);

    expect(loanApi.doAction).not.toHaveBeenCalled();
    expect(loanApi.doCheckout).toHaveBeenCalledWith(
      documentPid,
      itemPid,
      patronPid,
      { force: false }
    );
    expect(changes).toEqual([]);
  });

  it('should check in the current loan before checking out', async () => {
    itemApi.get.mockResolvedValue({ data: makeItem('CAN_CIRCULATE', onLoan) });
    loanApi.get.mockResolvedValue({
      data: {
        availableActions: { checkin: 'checkin-url' },
        metadata: {
          document_pid: documentPid,
          patron_pid: '7',
          item_pid: itemPid,
        },
      },
    });

    const { changes } = await checkOutItem(documentPid, itemPid, patronPid);

    expect(loanApi.get).toHaveBeenCalledWith('loan-1');
    expect(loanApi.doAction).toHaveBeenCalledWith(
      'checkin-url',
      documentPid,
      '7',
      { itemPid }
    );
    expect(loanApi.doCheckout).toHaveBeenCalledWith(
      documentPid,
      itemPid,
      patronPid,
      { force: false }
    );
    expect(changes).toHaveLength(1);
  });

  it('should force the checkout of a missing item', async () => {
    itemApi.get.mockResolvedValue({ data: makeItem('MISSING') });

    const { changes } = await checkOutItem(documentPid, itemPid, patronPid);

    expect(loanApi.doAction).not.toHaveBeenCalled();
    expect(loanApi.doCheckout).toHaveBeenCalledWith(
      documentPid,
      itemPid,
      patronPid,
      { force: true }
    );
    expect(changes).toHaveLength(1);
  });

  it('should not change an item that cannot circulate', async () => {
    itemApi.get.mockResolvedValue({ data: makeItem('IN_BINDING') });

    const { changes } = await checkOutItem(documentPid, itemPid, patronPid);

    expect(loanApi.doCheckout).toHaveBeenCalledWith(
      documentPid,
      itemPid,
      patronPid,
      { force: false }
    );
    expect(changes).toEqual([]);
  });
});
