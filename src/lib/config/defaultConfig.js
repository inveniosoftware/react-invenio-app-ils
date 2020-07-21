import {
  ACQ_ORDER_STATUSES,
  DEFAULT_CURRENCY,
  ILL_BORROWING_REQUESTS_STATUSES,
  ITEM_MEDIUMS,
} from './common';

export const APP_CONFIG = {
  ENABLE_LOCAL_ACCOUNT_LOGIN: true,
  ENABLE_OAUTH_LOGIN: true,
  ES_DELAY: 3000,
  INVENIO_UI_URL: process.env.REACT_APP_INVENIO_UI_URL,
  LOGO_SRC: process.env.PUBLIC_URL + '/logo-invenio-ils.svg',
  MAX_RESULTS_WINDOW: 10000,
  OAUTH_PROVIDERS: {
    github: {
      label: 'Sign in with GitHub',
      name: 'gihub',
      baseUrl: '/api/oauth/login/github',
      icon: 'github',
    },
  },
  REST_ENDOINTS_BASE_URL: process.env.REACT_APP_INVENIO_REST_ENDPOINTS_BASE_URL,
  SUCCESS_AUTO_DISMISS_SECONDS: 10,
  defaultCurrency: DEFAULT_CURRENCY,
  defaultResultsSize: 15,
  i18n: {
    priceLocale: 'fr-CH',
  },
  restMimetypeQueryArgName: 'format',
  staticPages: [
    { name: 'about', route: '/about', apiURL: '1' },
    { name: 'contact', route: '/contact', apiURL: '2' },
  ],
  supportEmail: 'info@inveniosoftware.org',
};

export const defaultConfig = {
  ACQ_ORDERS: {
    maxShowOrderLines: 3,
    orderedValidStatuses: ['PENDING', 'ORDERED', 'RECEIVED'],
    statuses: ACQ_ORDER_STATUSES,
    search: {
      filters: [
        {
          title: 'Status',
          field: 'status',
          aggName: 'status',
          labels: ACQ_ORDER_STATUSES,
        },
        {
          title: 'Vendor',
          field: 'vendor.name.keyword',
          aggName: 'vendor',
        },
        {
          title: 'Payment mode',
          field: 'order_lines.payment_mode',
          aggName: 'payment_mode',
        },
        {
          title: 'Medium',
          field: 'order_lines.medium',
          aggName: 'medium',
          labels: ITEM_MEDIUMS,
        },
        {
          title: 'Currency',
          field: 'grand_total.currency',
          aggName: 'currency',
        },
      ],
      sortBy: {
        onEmptyQuery: 'mostrecent',
        values: [
          {
            default_order: 'desc',
            field: 'mostrecent',
            order: 1,
            title: 'Newest',
          },
          {
            default_order: 'desc',
            field: 'order_date',
            order: 2,
            title: 'Order date',
          },
          {
            default_order: 'desc',
            field: 'grand_total',
            order: 3,
            title: `Total (${DEFAULT_CURRENCY})`,
          },
          {
            default_order: 'desc',
            field: 'received_date',
            order: 4,
            title: 'Received date',
          },
          {
            default_order: 'desc',
            field: 'expected_delivery_date',
            order: 5,
            title: 'Expected delivery date',
          },
          {
            default_order: 'asc',
            field: 'bestmatch',
            order: 6,
            title: 'Best match',
          },
        ],
      },
      sortOrder: ['desc', 'asc'],
    },
  },
  ACQ_VENDORS: {
    search: {
      filters: [],
      sortBy: {
        onEmptyQuery: 'bestmatch',
        values: [
          {
            default_order: 'asc',
            field: 'bestmatch',
            order: 1,
            title: 'Best match',
          },
          {
            default_order: 'asc',
            field: 'name.keyword',
            order: 2,
            title: 'Name',
          },
        ],
      },
      sortOrder: ['asc', 'desc'],
    },
  },
  CIRCULATION: {
    deliveryMethods: {
      PICKUP: 'Pick it up at the library desk',
      DELIVERY: 'Have it delivered to my office',
    },
    extensionsMaxCount: 3,
    loanWillExpireDays: 7,
    loanActiveStates: [
      'ITEM_AT_DESK',
      'ITEM_ON_LOAN',
      'ITEM_IN_TRANSIT_FOR_PICKUP',
      'ITEM_IN_TRANSIT_TO_HOUSE',
    ],
    loanCompletedStates: ['ITEM_RETURNED', 'CANCELLED'],
    loanRequestStates: ['PENDING'],
    requestDuration: 60,
    statuses: [
      { value: 'ITEM_RETURNED', text: 'Item returned' },
      { value: 'ITEM_AT_DESK', text: 'Item at desk' },
      { value: 'ITEM_ON_LOAN', text: 'Item on loan' },
      {
        value: 'ITEM_IN_TRANSIT_FOR_PICKUP',
        text: 'Item in transit for pickup',
      },
      { value: 'ITEM_IN_TRANSIT_TO_HOUSE', text: 'Item in transit to house' },
      { value: 'CANCELLED', text: 'Cancelled' },
      { value: 'PENDING', text: 'Pending' },
    ],
  },
  DOCUMENTS: {
    extensions: {
      label: 'Other',
      fields: {},
    },
    frontsiteMaxLinks: 5, // maximum number of links to show on details page
    types: [
      { value: 'BOOK', text: 'Book' },
      { value: 'PROCEEDING', text: 'Proceeding' },
      { value: 'STANDARD', text: 'Standard' },
      { value: 'PERIODICAL_ISSUE', text: 'Periodical issue' },
    ],
    search: {
      filters: [
        {
          title: 'Document types',
          field: 'document_type',
          aggName: 'doctype',
        },
        {
          title: 'Availability',
          field: 'circulation.has_items_for_loan',
          aggName: 'availability',
        },
        {
          title: 'Tags',
          field: 'tags',
          aggName: 'tag',
        },
        {
          title: 'Languages',
          field: 'languages',
          aggName: 'language',
        },
        {
          title: 'Relations',
          field: 'relations',
          aggName: 'relation',
        },
        {
          title: 'Medium',
          field: 'stock.mediums',
          aggName: 'medium',
        },
        {
          title: 'Restricted',
          field: 'restricted',
          aggName: 'access',
        },
      ],
      sortBy: {
        onEmptyQuery: 'mostrecent',
        values: [
          {
            default_order: 'desc',
            field: 'mostrecent',
            order: 1,
            title: 'Newest',
          },
          {
            default_order: 'asc',
            field: 'bestmatch',
            order: 2,
            title: 'Best match',
          },
          {
            default_order: 'asc',
            field: 'available_items',
            order: 3,
            title: 'Available copies',
          },
          {
            default_order: 'desc',
            field: 'mostloaned',
            order: 4,
            title: 'Most loaned',
          },
          {
            default_order: 'desc',
            field: 'publication_year',
            order: 5,
            title: 'Publication year',
          },
        ],
      },
      sortOrder: ['asc', 'desc'],
    },
  },
  DOCUMENT_REQUESTS: {
    physicalItemProviders: {
      acq: { name: 'Acquisition', pid_type: 'acqoid' },
      ill: { name: 'InterLibrary', pid_type: 'illbid' },
    },
    rejectTypes: {
      userCancel: 'USER_CANCEL',
      inCatalog: 'IN_CATALOG',
      notFound: 'NOT_FOUND',
    },
    search: {
      filters: [
        {
          title: 'State',
          field: 'state',
          aggName: 'state',
        },
        {
          title: 'Reject reason',
          field: 'reject_reason',
          aggName: 'reject_reason',
        },
      ],
      sortBy: {
        onEmptyQuery: 'mostrecent',
        values: [
          {
            default_order: 'desc',
            field: 'mostrecent',
            order: 1,
            title: 'Newest',
          },
          {
            default_order: 'asc',
            field: 'bestmatch',
            order: 2,
            title: 'Best match',
          },
        ],
      },
      sortOrder: ['asc', 'desc'],
    },
  },
  EITEMS: {
    maxFiles: 5,
    search: {
      filters: [
        {
          title: 'Open access',
          field: 'open_access',
          aggName: 'access',
        },
      ],
      sortBy: {
        onEmptyQuery: 'mostrecent',
        values: [
          {
            field: 'mostrecent',
            order: 1,
            title: 'Newest',
            default_order: 'desc',
          },
          {
            field: 'bestmatch',
            order: 2,
            title: 'Best match',
            default_order: 'asc',
          },
        ],
      },
      sortOrder: ['asc', 'desc'],
    },
  },
  ILL_BORROWING_REQUESTS: {
    orderedValidStatuses: ['PENDING', 'REQUESTED', 'ON_LOAN', 'RETURNED'],
    pendingStatuses: ['PENDING'],
    requestedStatuses: ['REQUESTED'],
    activeStatuses: ['ON_LOAN'],
    completedStatuses: ['CANCELLED', 'RETURNED'],
    extensionDeclinedStatuses: ['DECLINED'],
    extensionPendingStatuses: ['PENDING'],
    statuses: ILL_BORROWING_REQUESTS_STATUSES,
    search: {
      filters: [
        {
          title: 'Status',
          field: 'status',
          aggName: 'status',
          labels: ILL_BORROWING_REQUESTS_STATUSES,
        },
        {
          title: 'Library',
          field: 'library.name.keyword',
          aggName: 'library',
        },
        {
          title: 'Type',
          field: 'type',
          aggName: 'type',
        },
        {
          title: 'Payment Mode',
          field: 'payment.mode',
          aggName: 'payment_mode',
        },
      ],
      sortBy: {
        onEmptyQuery: 'mostrecent',
        values: [
          {
            default_order: 'desc',
            field: 'mostrecent',
            order: 1,
            title: 'Newest',
          },
          {
            default_order: 'desc',
            field: 'request_date',
            order: 2,
            title: 'Request date',
          },
          {
            default_order: 'desc',
            field: 'received_date',
            order: 3,
            title: 'Received date',
          },
          {
            default_order: 'desc',
            field: 'expected_delivery_date',
            order: 4,
            title: 'Expected delivery date',
          },
          {
            default_order: 'desc',
            field: 'loan_end_date',
            order: 5,
            title: 'Loan end date',
          },
          {
            default_order: 'asc',
            field: 'bestmatch',
            order: 6,
            title: 'Best match',
          },
        ],
      },
      sortOrder: ['desc', 'asc'],
    },
  },
  ILL_LIBRARIES: {
    search: {
      filters: [],
      sortBy: {
        onEmptyQuery: 'bestmatch',
        values: [
          {
            default_order: 'asc',
            field: 'bestmatch',
            order: 1,
            title: 'Best match',
          },
          {
            default_order: 'asc',
            field: 'name.keyword',
            order: 2,
            title: 'Name',
          },
        ],
      },
      sortOrder: ['asc', 'desc'],
    },
  },
  ITEMS: {
    circulationRestrictions: [
      { value: 'NO_RESTRICTION', text: 'No restriction' },
      { value: 'ONE_WEEK', text: '1 week' },
      { value: 'TWO_WEEKS', text: '2 weeks' },
      { value: 'THREE_WEEKS', text: '3 weeks' },
      { value: 'FOUR_WEEKS', text: '4 weeks' },
    ],
    mediums: ITEM_MEDIUMS,
    statuses: [
      { value: 'CAN_CIRCULATE', text: 'Can circulate' },
      { value: 'FOR_REFERENCE_ONLY', text: 'For reference only' },
      { value: 'MISSING', text: 'Missing' },
      { value: 'IN_BINDING', text: 'In binding' },
      { value: 'SCANNING', text: 'Scanning' },
    ],
    search: {
      filters: [
        {
          title: 'Status',
          field: 'status',
          aggName: 'status',
        },
        {
          title: 'Medium',
          field: 'medium',
          aggName: 'medium',
        },
        {
          title: 'Circulation',
          field: 'circulation.state',
          aggName: 'circulation',
        },
        {
          title: 'Circulation restriction',
          field: 'circulation_restriction',
          aggName: 'circulation_restriction',
        },
        {
          title: 'Internal location',
          field: 'internal_location.name',
          aggName: 'internal_location',
        },
        {
          title: 'Location',
          field: 'internal_location.location.name',
          aggName: 'location',
        },
      ],
      sortBy: {
        onEmptyQuery: 'mostrecent',
        values: [
          {
            default_order: 'desc',
            field: 'mostrecent',
            order: 1,
            title: 'Newest',
          },
          {
            default_order: 'asc',
            field: 'bestmatch',
            order: 2,
            title: 'Best match',
          },
        ],
      },
      sortOrder: ['asc', 'desc'],
    },
    canCirculateStatuses: ['CAN_CIRCULATE'],
    referenceStatuses: ['FOR_REFERENCE_ONLY'],
  },
  LITERATURE: {
    authors: {
      maxDisplay: 5,
    },
    search: {
      filters: [],
      sortBy: {
        onEmptyQuery: 'mostrecent',
        values: [
          {
            default_order: 'desc',
            field: 'mostrecent',
            order: 1,
            title: 'Newest',
          },
          {
            default_order: 'asc',
            field: 'bestmatch',
            order: 2,
            title: 'Best match',
          },
          {
            default_order: 'asc',
            field: 'available_items',
            order: 3,
            title: 'Available copies',
          },
          {
            default_order: 'desc',
            field: 'mostloaned',
            order: 4,
            title: 'Most loaned',
          },
          {
            default_order: 'desc',
            field: 'publication_year',
            order: 5,
            title: 'Publication year',
          },
        ],
      },
      sortOrder: ['asc', 'desc'],
    },
  },
  LOANS: {
    search: {
      filters: [
        {
          title: 'State',
          field: 'state',
          aggName: 'state',
        },
        {
          title: 'Returns',
          field: 'returns',
          aggName: 'returns.end_date',
        },
        {
          title: 'Delivery',
          field: 'delivery.method',
          aggName: 'delivery',
        },
      ],
      sortBy: {
        onEmptyQuery: 'end_date',
        values: [
          {
            field: 'expire_date',
            order: 1,
            title: 'Expriration date',
            default_order: 'desc',
          },
          {
            field: 'end_date',
            order: 2,
            title: 'Loan end date',
            default_order: 'desc',
          },
          {
            field: 'start_date',
            order: 3,
            title: 'Loan start date',
            default_order: 'desc',
          },
          {
            field: 'mostrecent',
            order: 4,
            title: 'Newest',
            default_order: 'desc',
          },
          {
            field: 'extensions',
            order: 5,
            title: 'Extension count',
            default_order: 'asc',
          },
          {
            field: 'bestmatch',
            order: 6,
            title: 'Best match',
            default_order: 'asc',
          },
        ],
      },
      sortOrder: ['asc', 'desc'],
    },
  },
  SERIES: {
    extensions: {
      label: 'Other',
      fields: {},
    },
    search: {
      filters: [
        {
          title: 'Mode of Issuance',
          field: 'mode_of_issuance',
          aggName: 'moi',
        },
        {
          title: 'Languages',
          field: 'languages',
          aggName: 'language',
        },
        {
          title: 'Relations',
          field: 'relations',
          aggName: 'relation',
        },
      ],
      sortBy: {
        onEmptyQuery: 'mostrecent',
        values: [
          {
            field: 'mostrecent',
            order: 1,
            title: 'Newest',
            default_order: 'desc',
          },
          {
            field: 'bestmatch',
            order: 2,
            title: 'Best match',
            default_order: 'asc',
          },
        ],
      },
      sortOrder: ['asc', 'desc'],
    },
  },
  PATRONS: {
    search: {
      filters: [],
      sortBy: {
        onEmptyQuery: 'bestmatch',
        values: [
          {
            default_order: 'asc',
            field: 'bestmatch',
            order: 1,
            title: 'Best match',
          },
        ],
      },
      sortOrder: ['asc', 'desc'],
    },
  },
  VOCABULARIES: {
    currencies: 'currencies',
    language: 'language',
    acqOrders: {
      acq_medium: 'acq_medium',
      acq_order_line_payment_mode: 'acq_order_line_payment_mode',
      acq_order_line_purchase_type: 'acq_order_line_purchase_type',
      acq_payment_mode: 'acq_payment_mode',
      acq_recipient: 'acq_recipient',
    },
    document: {
      alternativeIdentifier: {
        scheme: 'alternative_identifier_scheme',
      },
      alternativeTitle: {
        language: 'language',
        type: 'alternative_title_type',
      },
      author: {
        affiliation: {
          identifier: {
            scheme: 'affiliation_identifier_scheme',
          },
        },
        identifier: {
          scheme: 'author_identifier_scheme',
        },
        roles: {
          type: 'author_role',
        },
        type: 'author_type',
      },
      conferenceInfo: {
        country: 'country',
        identifier: {
          scheme: 'conference_identifier_scheme',
        },
      },
      identifier: {
        scheme: 'identifier_scheme',
      },
      license: 'license',
      tags: 'tag',
      type: 'document_type',
    },
    documentRequests: {
      doc_req_type: 'doc_req_type',
      doc_req_payment_method: 'doc_req_payment_method',
      doc_req_medium: 'doc_req_medium',
    },
    series: {
      identifier: {
        scheme: 'series_identifier_scheme',
      },
    },
    illBorrowingRequests: {
      ill_item_type: 'ill_item_type',
      ill_payment_mode: 'ill_payment_mode',
    },
  },
};
