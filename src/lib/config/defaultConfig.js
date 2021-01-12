import {
  ACQ_ORDER_STATUSES,
  DEFAULT_CURRENCY,
  DOCUMENT_RELATIONS,
  DOCUMENT_TYPES,
  ILL_BORROWING_REQUESTS_STATUSES,
  ITEM_MEDIUMS,
} from './common';

export const APP_CONFIG = {
  ENABLE_LOCAL_ACCOUNT_LOGIN: true,
  ENABLE_OAUTH_LOGIN: true,
  SEARCH_READY_DELAY: 2000,
  INVENIO_UI_URL: process.env.REACT_APP_INVENIO_UI_URL,
  LOGO_SRC: process.env.PUBLIC_URL + '/logo-invenio-ils.svg',
  MAX_RESULTS_WINDOW: 10000,
  OAUTH_PROVIDERS: {
    github: {
      enabled: true,
      label: 'Sign in with GitHub',
      name: 'gihub',
      url: '/api/oauth/login/github',
      icon: 'github',
      semanticUiColor: 'black',
      className: '',
    },
  },
  REST_ENDOINTS_BASE_URL: process.env.REACT_APP_INVENIO_REST_ENDPOINTS_BASE_URL,
  SUCCESS_AUTO_DISMISS_SECONDS: 10,
  DEFAULT_CURRENCY: DEFAULT_CURRENCY,
  DEFAULT_RESULTS_SIZE: 15,
  i18n: {
    priceLocale: 'fr-CH',
  },
  REST_MIME_TYPE_QUERY_ARG_NAME: 'format',
  STATIC_PAGES: [
    { name: 'about', route: '/about', apiURL: '1' },
    { name: 'contact', route: '/contact', apiURL: '2' },
  ],
  EMAILS_PREFILL: {
    subjectPrefix: 'InvenioILS',
    footer: '\n\n\nKind regards,\nInvenioILS',
  },
  ENVIRONMENTS: [
    {
      name: 'development',
      display: {
        text: 'Development environment',
        color: 'blue',
        icon: 'code',
      },
    },
    {
      name: 'sandbox',
      display: {
        text: 'Sandbox environment',
        color: 'teal',
        icon: 'camera',
      },
    },
    {
      name: 'production',
      display: {
        roles: ['admin'],
        text: 'Production environment',
        color: 'red',
        icon: 'warning',
      },
    },
  ],
  SEARCH_BAR_PROPS: {
    autofocus: true,
    actionProps: { icon: 'search', content: null },
    uiProps: {
      className: 'ils-searchbar',
      fluid: true,
      size: 'big',
    },
  },
  HOME_SEARCH_BAR_PLACEHOLDER:
    'Search for books, ebooks, series, journals and standards.',
};

export const RECORDS_CONFIG = {
  ACQ_ORDERS: {
    maxShowOrderLines: 3,
    orderedValidStatuses: ['PENDING', 'ORDERED', 'RECEIVED'],
    pendingStatuses: ['PENDING'],
    orderedStatuses: ['ORDERED'],
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
          field: 'vendor.name',
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
      sort: [
        {
          order: 1,
          sortBy: 'created',
          sortOrder: 'desc',
          text: 'Recently added',
        },
        {
          order: 2,
          sortBy: 'bestmatch',
          sortOrder: 'asc',
          text: 'Most relevant',
        },
        {
          order: 3,
          sortBy: 'order_date',
          sortOrder: 'desc',
          text: 'Order date',
        },
        {
          order: 4,
          sortBy: 'expected_delivery_date',
          sortOrder: 'desc',
          text: 'Expected delivery date',
        },
        {
          order: 5,
          sortBy: 'grand_total',
          sortOrder: 'desc',
          text: `Total (${DEFAULT_CURRENCY})`,
        },
      ],
      defaultPage: 1,
      defaultSize: 15,
      defaultLayout: 'list',
    },
  },
  ACQ_VENDORS: {
    search: {
      filters: [],
      sort: [
        {
          order: 1,
          sortBy: 'created',
          sortOrder: 'desc',
          text: 'Recently added',
        },
        {
          order: 2,
          sortBy: 'bestmatch',
          sortOrder: 'asc',
          text: 'Most relevant',
        },
        {
          order: 3,
          sortBy: 'name',
          sortOrder: 'asc',
          text: 'Name [A-Z]',
        },
        {
          order: 4,
          sortBy: 'name',
          sortOrder: 'desc',
          text: 'Name [Z-A]',
        },
      ],
      defaultPage: 1,
      defaultSize: 15,
      defaultLayout: 'list',
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
      {
        value: 'ITEM_RETURNED',
        text: 'Item returned',
      },
      {
        value: 'ITEM_AT_DESK',
        text: 'Item at desk',
      },
      {
        value: 'ITEM_ON_LOAN',
        text: 'Item on loan',
      },
      {
        value: 'ITEM_IN_TRANSIT_FOR_PICKUP',
        text: 'Item in transit for pickup',
      },
      {
        value: 'ITEM_IN_TRANSIT_TO_HOUSE',
        text: 'Item in transit to house',
      },
      {
        value: 'CANCELLED',
        text: 'Cancelled',
      },
      { value: 'PENDING', text: 'Pending' },
    ],
  },
  DOCUMENTS: {
    extensions: {
      label: 'Other',
      fields: {},
    },
    frontsiteMaxLinks: 5, // maximum number of links to show on details page
    types: DOCUMENT_TYPES,
    search: {
      filters: [
        {
          title: 'Literature types',
          field: 'document_type',
          aggName: 'doctype',
          labels: DOCUMENT_TYPES,
        },
        {
          title: 'Availability',
          field: 'circulation.available_items_for_loan_count',
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
          title: 'Related content',
          field: 'relations',
          aggName: 'relation',
          labels: DOCUMENT_RELATIONS,
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
      sort: [
        {
          order: 1,
          sortBy: 'created',
          sortOrder: 'desc',
          text: 'Recently added',
        },
        {
          order: 2,
          sortBy: 'bestmatch',
          sortOrder: 'asc',
          text: 'Most relevant',
        },
        {
          order: 3,
          sortBy: 'available_copies',
          sortOrder: 'desc',
          text: 'Available copies',
        },
        {
          order: 4,
          sortBy: 'mostloaned',
          sortOrder: 'desc',
          text: 'Most loaned',
        },
        {
          order: 5,
          sortBy: 'publication_year',
          sortOrder: 'desc',
          text: 'Publication year [newest]',
        },
        {
          order: 6,
          sortBy: 'publication_year',
          sortOrder: 'asc',
          text: 'Publication year [oldest]',
        },
        {
          order: 7,
          sortBy: 'title',
          sortOrder: 'asc',
          text: 'Title [A-Z]',
        },
        {
          order: 8,
          sortBy: 'title',
          sortOrder: 'desc',
          text: 'Title [Z-A]',
        },
      ],
      defaultPage: 1,
      defaultSize: 15,
      defaultLayout: 'list',
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
          title: 'Decline reason',
          field: 'reject_reason',
          aggName: 'reject_reason',
        },
      ],
      sort: [
        {
          order: 1,
          sortBy: 'created',
          sortOrder: 'desc',
          text: 'Recently added',
        },
        {
          order: 2,
          sortBy: 'bestmatch',
          sortOrder: 'asc',
          text: 'Most relevant',
        },
      ],
      defaultPage: 1,
      defaultSize: 15,
      defaultLayout: 'list',
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
          labels: [
            { value: 0, label: 'No' },
            { value: 1, label: 'Yes' },
          ],
        },
      ],
      sort: [
        {
          order: 1,
          sortBy: 'created',
          sortOrder: 'desc',
          text: 'Recently added',
        },
        {
          order: 2,
          sortBy: 'bestmatch',
          sortOrder: 'asc',
          text: 'Most relevant',
        },
        {
          order: 3,
          sortBy: 'title',
          sortOrder: 'asc',
          text: 'Title [A-Z]',
        },
        {
          order: 4,
          sortBy: 'title',
          sortOrder: 'desc',
          text: 'Title [Z-A]',
        },
      ],
      defaultPage: 1,
      defaultSize: 15,
      defaultLayout: 'list',
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
    loanMaxDuration: 180,
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
          title: 'Loan extension',
          field: 'patron_loan_extension',
          aggName: 'patron_loan_extension',
          labels: ILL_BORROWING_REQUESTS_STATUSES,
        },
        {
          title: 'Library',
          field: 'library.name',
          aggName: 'library',
        },
        {
          title: 'Item type',
          field: 'type',
          aggName: 'type',
        },
        {
          title: 'Payment Mode',
          field: 'payment.mode',
          aggName: 'payment_mode',
        },
      ],
      sort: [
        {
          order: 1,
          sortBy: 'created',
          sortOrder: 'desc',
          text: 'Recently added',
        },
        {
          order: 2,
          sortBy: 'bestmatch',
          sortOrder: 'asc',
          text: 'Most relevant',
        },
        {
          order: 3,
          sortBy: 'request_date',
          sortOrder: 'desc',
          text: 'Request date',
        },
        {
          order: 4,
          sortBy: 'expected_delivery_date',
          sortOrder: 'desc',
          text: 'Expected delivery date',
        },
        {
          order: 5,
          sortBy: 'due_date',
          sortOrder: 'desc',
          text: 'Due date',
        },
      ],
      defaultPage: 1,
      defaultSize: 15,
      defaultLayout: 'list',
    },
  },
  ILL_LIBRARIES: {
    search: {
      filters: [],
      sort: [
        {
          order: 1,
          sortBy: 'created',
          sortOrder: 'desc',
          text: 'Recently added',
        },
        {
          order: 2,
          sortBy: 'bestmatch',
          sortOrder: 'asc',
          text: 'Most relevant',
        },
        {
          order: 3,
          sortBy: 'name',
          sortOrder: 'asc',
          text: 'Name [A-Z]',
        },
        {
          order: 4,
          sortBy: 'name',
          sortOrder: 'desc',
          text: 'Name [Z-A]',
        },
      ],
      defaultPage: 1,
      defaultSize: 15,
      defaultLayout: 'list',
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
      {
        value: 'CAN_CIRCULATE',
        text: 'Can circulate',
      },
      {
        value: 'FOR_REFERENCE_ONLY',
        text: 'For reference only',
      },
      { value: 'MISSING', text: 'Missing' },
      {
        value: 'IN_BINDING',
        text: 'In binding',
      },
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
      sort: [
        {
          order: 1,
          sortBy: 'created',
          sortOrder: 'desc',
          text: 'Recently added',
        },
        {
          order: 2,
          sortBy: 'bestmatch',
          sortOrder: 'asc',
          text: 'Most relevant',
        },
        {
          order: 3,
          sortBy: 'title',
          sortOrder: 'asc',
          text: 'Title [A-Z]',
        },
        {
          order: 4,
          sortBy: 'title',
          sortOrder: 'desc',
          text: 'Title [Z-A]',
        },
      ],
      defaultPage: 1,
      defaultSize: 15,
      defaultLayout: 'list',
    },
    canCirculateStatuses: ['CAN_CIRCULATE'],
    referenceStatuses: ['FOR_REFERENCE_ONLY'],
  },
  LITERATURE: {
    authors: {
      maxDisplay: 5,
    },
    search: {
      filters: [
        {
          title: 'Literature types',
          field: 'document_type',
          aggName: 'doctype',
          labels: DOCUMENT_TYPES,
        },
        {
          title: 'Availability',
          field: 'circulation.available_items_for_loan_count',
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
          title: 'Medium',
          field: 'stock.mediums',
          aggName: 'medium',
        },
      ],
      sort: [
        {
          order: 1,
          sortBy: 'created',
          sortOrder: 'desc',
          text: 'Recently added',
        },
        {
          order: 2,
          sortBy: 'bestmatch',
          sortOrder: 'asc',
          text: 'Most relevant',
        },
        {
          order: 3,
          sortBy: 'available_copies',
          sortOrder: 'desc',
          text: 'Available copies',
        },
        {
          order: 4,
          sortBy: 'mostloaned',
          sortOrder: 'desc',
          text: 'Most loaned',
        },
        {
          order: 5,
          sortBy: 'publication_year',
          sortOrder: 'desc',
          text: 'Publication year [newest]',
        },
        {
          order: 6,
          sortBy: 'publication_year',
          sortOrder: 'asc',
          text: 'Publication year [oldest] ',
        },
        {
          order: 7,
          sortBy: 'title',
          sortOrder: 'asc',
          text: 'Title [A-Z]',
        },
        {
          order: 8,
          sortBy: 'title',
          sortOrder: 'desc',
          text: 'Title [Z-A]',
        },
      ],
      defaultPage: 1,
      defaultSize: 15,
      defaultLayout: 'grid',
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
      sort: [
        {
          order: 1,
          sortBy: 'request_expire_date',
          sortOrder: 'asc',
          text: 'Request expiration date',
        },
        {
          order: 2,
          sortBy: 'request_start_date',
          sortOrder: 'asc',
          text: 'Request start date',
        },
        {
          order: 3,
          sortBy: 'end_date',
          sortOrder: 'asc',
          text: 'Loan end date',
        },
        {
          order: 4,
          sortBy: 'start_date',
          sortOrder: 'asc',
          text: 'Loan start date',
        },
        {
          order: 5,
          sortBy: 'extensions',
          sortOrder: 'desc',
          text: 'Extensions count',
        },
        {
          order: 6,
          sortBy: 'created',
          sortOrder: 'desc',
          text: 'Recently added',
        },
        {
          order: 7,
          sortBy: 'bestmatch',
          sortOrder: 'asc',
          text: 'Most relevant',
        },
      ],
      defaultPage: 1,
      defaultSize: 15,
      defaultLayout: 'list',
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
          title: 'Related content',
          field: 'relations',
          aggName: 'relation',
          labels: DOCUMENT_RELATIONS,
        },
      ],
      sort: [
        {
          order: 1,
          sortBy: 'created',
          sortOrder: 'desc',
          text: 'Recently added',
        },
        {
          order: 2,
          sortBy: 'bestmatch',
          sortOrder: 'asc',
          text: 'Most relevant',
        },
        {
          order: 3,
          sortBy: 'title',
          sortOrder: 'asc',
          text: 'Title [A-Z]',
        },
        {
          order: 4,
          sortBy: 'title',
          sortOrder: 'desc',
          text: 'Title [Z-A]',
        },
      ],
      defaultPage: 1,
      defaultSize: 15,
      defaultLayout: 'list',
    },
  },
  PATRONS: {
    customFields: {},
    search: {
      filters: [],
      sort: [
        {
          order: 1,
          sortBy: 'bestmatch',
          sortOrder: 'asc',
          text: 'Most relevant',
        },
      ],
      defaultPage: 1,
      defaultSize: 15,
      defaultLayout: 'list',
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
    item: {
      mediums: 'item_medium',
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
