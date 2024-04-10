// Temporary extracted common props that used in init

export const DEFAULT_CURRENCY = 'CHF';

export const DEFAULT_LANGUAGE = 'ENG';

// the key used in an on_shelf locations object to see the total amount of locations
export const LOCATION_OBJECT_TOTAL_AMOUNT_KEY = 'total';

// label key is used for labeling bucket values
// text key is used for semantic ui dropdown options display

export const ACQ_ORDER_STATUSES = [
  {
    value: 'PENDING',
    text: 'Pending',
    label: 'Pending',
    order: 1,
    default: true,
  },
  {
    value: 'ORDERED',
    text: 'Ordered',
    label: 'Ordered',
    order: 2,
    default: false,
  },
  {
    value: 'RECEIVED',
    text: 'Received',
    label: 'Received',
    order: 3,
    default: false,
  },
  {
    value: 'CANCELLED',
    text: 'Cancelled',
    label: 'Cancelled',
    order: 4,
    default: false,
  },
];

export const ILL_BORROWING_REQUESTS_STATUSES = [
  {
    value: 'CANCELLED',
    text: 'Cancelled',
    label: 'Cancelled',
    order: 1,
    default: false,
  },
  {
    value: 'PENDING',
    text: 'Pending',
    label: 'Pending',
    order: 2,
    default: true,
  },
  {
    value: 'REQUESTED',
    text: 'Requested',
    label: 'Requested',
    order: 3,
    default: false,
  },
  {
    value: 'ON_LOAN',
    text: 'On loan',
    label: 'On loan',
    order: 4,
    default: false,
  },
  {
    value: 'RETURNED',
    text: 'Returned',
    label: 'Returned',
    order: 5,
    default: false,
  },
];

export const ITEM_MEDIUMS = [
  {
    value: 'NOT_SPECIFIED',
    text: 'Not specified',
    label: 'Not specified',
    order: 1,
  },
  { value: 'PAPER', text: 'Paper', label: 'Paper', order: 2 },
  { value: 'CDROM', text: 'CD-ROM', label: 'CD-ROM', order: 3 },
  { value: 'DVD', text: 'DVD', label: 'DVD', order: 4 },
  { value: 'VHS', text: 'VHS', label: 'VHS', order: 5 },
  {
    value: 'PAPERBACK',
    text: 'Paperback',
    label: 'Paperback',
    order: 6,
  },
  {
    value: 'HARDCOVER',
    text: 'Hardcover',
    label: 'Hardcover',
    order: 7,
  },
];

export const DOCUMENT_RELATIONS = [
  { value: 'edition', label: 'By edition', order: 1 },
  {
    value: 'multipart_monograph',
    label: 'By series (completed)',
    order: 2,
  },
  { value: 'serial', label: 'By series (periodic)', order: 3 },
  { value: 'language', label: 'By language', order: 4 },
  { value: 'previous', label: 'By predecessors', order: 5 },
  { value: 'next', label: 'By continuation', order: 6 },
];

export const DOCUMENT_TYPES = [
  { value: 'BOOK', text: 'Book', label: 'Book', order: 1 },
  {
    value: 'PROCEEDINGS',
    text: 'Proceedings',
    label: 'Proceedings',
    order: 2,
  },
  {
    value: 'STANDARD',
    text: 'Standard',
    label: 'Standard',
    order: 3,
  },
  {
    value: 'SERIAL_ISSUE',
    text: 'Serial issue',
    label: 'Serial issue',
    order: 4,
  },
  {
    value: 'ARTICLE',
    text: 'Article',
    label: 'Article',
    order: 5,
  },
  {
    value: 'MULTIMEDIA',
    text: 'Multimedia',
    label: 'Multimedia',
    order: 6,
  },
];

export const SERIES_TYPES = [
  {
    value: 'SERIAL',
    text: 'Serial',
    label: 'Serial',
    order: 1,
  },
  {
    value: 'PERIODICAL',
    text: 'Periodical',
    label: 'Periodical',
    order: 2,
  },
];

export const EITEM_TYPES = [
  {
    value: 'E-BOOK',
    text: 'E-Book',
    label: 'E-Book',
    order: 1,
  },
  {
    value: 'AUDIOBOOK',
    text: 'Audiobook',
    label: 'Audiobook',
    order: 2,
  },
  {
    value: 'VIDEO',
    text: 'Video',
    label: 'Video',
    order: 3,
  },
];
