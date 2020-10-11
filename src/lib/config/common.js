// Temporary extracted common props that used in init

export const DEFAULT_CURRENCY = 'CHF';

// label key is used for labeling bucket values
// text key is used for semantic ui dropdown options display

export const ACQ_ORDER_STATUSES = [
  { value: 'CANCELLED', text: 'Cancelled', label: 'Cancelled' },
  { value: 'RECEIVED', text: 'Received', label: 'Received' },
  { value: 'ORDERED', text: 'Ordered', label: 'Ordered' },
  { value: 'PENDING', text: 'Pending', label: 'Pending' },
];

export const ILL_BORROWING_REQUESTS_STATUSES = [
  { value: 'CANCELLED', text: 'Cancelled', label: 'Cancelled' },
  { value: 'PENDING', text: 'Pending', label: 'Pending' },
  { value: 'REQUESTED', text: 'Requested', label: 'Requested' },
  { value: 'ON_LOAN', text: 'On loan', label: 'On loan' },
  { value: 'RETURNED', text: 'Returned', label: 'Returned' },
];

export const ITEM_MEDIUMS = [
  { value: 'NOT_SPECIFIED', text: 'Not specified', label: 'Not specified' },
  { value: 'PAPER', text: 'Paper', label: 'Paper' },
  { value: 'CDROM', text: 'CD-ROM', label: 'CD-ROM' },
  { value: 'DVD', text: 'DVD', label: 'DVD' },
  { value: 'VHS', text: 'VHS', label: 'VHS' },
  { value: 'PAPERBACK', text: 'Paperback', label: 'Paperback' },
  { value: 'HARDCOVER', text: 'Hardcover', label: 'Hardcover' },
];

export const DOCUMENT_RELATIONS = [
  { value: 'edition', label: 'By edition' },
  { value: 'multipart_monograph', label: 'By series (completed)' },
  { value: 'serial', label: 'By series (periodic)' },
  { value: 'language', label: 'By language' },
  { value: 'previous', label: 'By predecessors' },
  { value: 'next', label: 'By continuation' },
];

export const DOCUMENT_TYPES = [
  { value: 'BOOK', text: 'Book', label: 'Book' },
  { value: 'PROCEEDING', text: 'Proceeding', label: 'Proceeding' },
  { value: 'STANDARD', text: 'Standard', label: 'Standard' },
  {
    value: 'PERIODICAL_ISSUE',
    text: 'Periodical issue',
    label: 'Periodical issue',
  },
];
