// Temporary extracted common props that used in init

export const DEFAULT_CURRENCY = 'CHF';

export const ACQ_ORDER_STATUSES = [
  { value: 'CANCELLED', text: 'Cancelled' },
  { value: 'RECEIVED', text: 'Received' },
  { value: 'ORDERED', text: 'Ordered' },
  { value: 'PENDING', text: 'Pending' },
];

export const ILL_BORROWING_REQUESTS_STATUSES = [
  { value: 'CANCELLED', text: 'Cancelled' },
  { value: 'PENDING', text: 'Pending' },
  { value: 'REQUESTED', text: 'Requested' },
  { value: 'ON_LOAN', text: 'On loan' },
  { value: 'RETURNED', text: 'Returned' },
];

export const ITEM_MEDIUMS = [
  { value: 'NOT_SPECIFIED', text: 'Not specified' },
  { value: 'PAPER', text: 'Paper' },
  { value: 'CDROM', text: 'CD-ROM' },
  { value: 'DVD', text: 'DVD' },
  { value: 'VHS', text: 'VHS' },
  { value: 'PAPERBACK', text: 'Paperback' },
  { value: 'HARDCOVER', text: 'Hardcover' },
];

export const DOCUMENT_RELATIONS = [
  { value: 'edition', text: 'By edition' },
  { value: 'multipart_monograph', text: 'By series (completed)' },
  { value: 'serial', text: 'By series (periodic)' },
  { value: 'language', text: 'By language' },
  { value: 'previous', text: 'By predecessors' },
  { value: 'next', text: 'By continuation' },
];

export const DOCUMENT_TYPES = [
  { value: 'BOOK', text: 'Book' },
  { value: 'PROCEEDING', text: 'Proceeding' },
  { value: 'STANDARD', text: 'Standard' },
  { value: 'PERIODICAL_ISSUE', text: 'Periodical issue' },
];
