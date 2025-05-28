import {
  ACQ_ORDER_STATUSES,
  DEFAULT_CURRENCY,
  DEFAULT_LANGUAGE,
  DOCUMENT_RELATIONS,
  DOCUMENT_TYPES,
  SERIES_TYPES,
  EITEM_TYPES,
  ILL_BORROWING_REQUESTS_STATUSES,
  ITEM_MEDIUMS,
} from './common';

export const APP_CONFIG = {
  ENABLE_LOCAL_ACCOUNT_LOGIN: true,
  ENABLE_OAUTH_LOGIN: true,
  SEARCH_READY_DELAY: 2000,
  INVENIO_UI_URL: process.env.REACT_APP_INVENIO_UI_URL,
  LOGO_SRC: process.env.PUBLIC_URL + '/images/logo-invenio-ils.svg',
  MAX_RESULTS_WINDOW: 10000,
  VOCAB_MAX_RESULTS_WINDOW: 500,
  EXPORT_MAX_RESULTS: 4000,
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
  REST_ENDPOINTS_BASE_URL:
    process.env.REACT_APP_INVENIO_REST_ENDPOINTS_BASE_URL,
  SUCCESS_AUTO_DISMISS_SECONDS: 10,
  DEFAULT_CURRENCY: DEFAULT_CURRENCY,
  DEFAULT_LANGUAGE: DEFAULT_LANGUAGE,
  DEFAULT_RESULTS_SIZE: 15,
  i18n: {
    priceLocale: 'fr-CH',
  },
  REST_MIME_TYPE_QUERY_ARG_NAME: 'format',
  STATIC_PAGES: [
    { name: 'about', route: '/about', apiURL: '1' },
    { name: 'contact', route: '/contact', apiURL: '2' },
    { name: 'search-guide', route: '/guide/search', apiURL: '3' },
  ],
  EMAILS_PREFILL: {
    subjectPrefix: 'InvenioILS:',
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
  PATRON_PROFILE_MAX_RESULTS_SIZE: 100,
  ENABLE_SELF_CHECKOUT: false,
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
          title: 'Provider',
          field: 'provider.name',
          aggName: 'provider',
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
  CIRCULATION: {
    deliveryMethods: {
      'NOT-SPECIFIED': {
        text: 'Not Specified',
        iconClass: 'ellipsis horizontal',
      },
      PICKUP: {
        text: 'Pick it up at the library desk',
        iconClass: 'warehouse',
      },
      DELIVERY: {
        text: 'To my office',
        iconClass: 'dolly',
      },
    },
    deliveryMethodSelfCheckout: {
      'SELF-CHECKOUT': {
        text: 'SELF-CHECKOUT',
        iconClass: 'shopping basket',
      },
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
    requestStartOffset: 0,
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
    authors: {
      maxEditable: 10,
    },
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
        {
          title: 'Languages',
          field: 'languages',
          aggName: 'language',
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
        {
          order: 9,
          sortBy: 'loan_requests',
          sortOrder: 'desc',
          text: 'Most requested',
        },
      ],
      defaultPage: 1,
      defaultSize: 15,
      defaultLayout: 'list',
    },
  },
  DOCUMENT_REQUESTS: {
    states: [
      {
        value: 'ACCEPTED',
      },
      {
        value: 'PENDING',
        default: true,
      },
      {
        value: 'DECLINED',
      },
    ],
    physicalItemProviders: {
      acq: { name: 'Acquisition', pid_type: 'acqoid' },
      ill: { name: 'Interlibrary loan', pid_type: 'illbid' },
    },
    declineTypes: ['USER_CANCEL', 'IN_CATALOG', 'NOT_FOUND', 'OTHER'],
    search: {
      filters: [
        {
          title: 'State',
          field: 'state',
          aggName: 'state',
        },
        {
          title: 'Decline reason',
          field: 'decline_reason',
          aggName: 'decline_reason',
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
    types: EITEM_TYPES,
    search: {
      filters: [
        {
          title: 'Medium',
          field: 'eitem_type',
          aggName: 'eitem_type',
          labels: EITEM_TYPES,
        },
        {
          title: 'Open access',
          field: 'open_access',
          aggName: 'access',
          labels: [
            { value: 0, label: 'No' },
            { value: 1, label: 'Yes' },
          ],
        },
        {
          title: 'Has files',
          field: 'files',
          aggName: 'has_files',
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
    defaultType: 'PHYSICAL_COPY',
    fieldOverrides: {
      due_date: 'Due Date',
    },
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
          title: 'Provider',
          field: 'provider.name',
          aggName: 'provider',
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
  ITEMS: {
    circulationRestrictions: [
      { value: 'NO_RESTRICTION', text: 'No restriction (4 weeks)' },
      { value: 'ONE_WEEK', text: '1 week' },
      { value: 'TWO_WEEKS', text: '2 weeks' },
      { value: 'THREE_WEEKS', text: '3 weeks' },
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
          title: 'Document type',
          field: 'document.document_type.keyword',
          aggName: 'document_type',
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
    frontsiteMaxLinks: 5, // maximum number of links to show on details page
    search: {
      filters: [
        {
          title: 'Format',
          field: 'stock.mediums',
          aggName: 'medium',
        },
        {
          title: 'Literature types',
          field: 'document_type',
          aggName: 'doctype',
          labels: DOCUMENT_TYPES + SERIES_TYPES,
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
        {
          title: 'Availability',
          field: 'available_items_for_loan_count',
          aggName: 'availability',
        },
      ],
      sort: [
        {
          order: 1,
          sortBy: 'request_expire_date',
          sortOrder: 'desc',
          text: 'Request expiration date [newest]',
        },
        {
          order: 2,
          sortBy: 'request_expire_date',
          sortOrder: 'asc',
          text: 'Request expiration date [oldest]',
        },
        {
          order: 3,
          sortBy: 'request_start_date',
          sortOrder: 'desc',
          text: 'Request start date [newest]',
        },
        {
          order: 4,
          sortBy: 'request_start_date',
          sortOrder: 'asc',
          text: 'Request start date [oldest]',
        },
        {
          order: 5,
          sortBy: 'end_date',
          sortOrder: 'desc',
          text: 'Loan end date [newest]',
        },
        {
          order: 6,
          sortBy: 'end_date',
          sortOrder: 'asc',
          text: 'Loan end date [oldest]',
        },
        {
          order: 7,
          sortBy: 'start_date',
          sortOrder: 'desc',
          text: 'Loan start date [newest]',
        },
        {
          order: 8,
          sortBy: 'start_date',
          sortOrder: 'asc',
          text: 'Loan start date [oldest]',
        },
        {
          order: 9,
          sortBy: 'extensions',
          sortOrder: 'desc',
          text: 'Extensions count',
        },
        {
          order: 10,
          sortBy: 'created',
          sortOrder: 'desc',
          text: 'Recently added',
        },
        {
          order: 11,
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
    types: SERIES_TYPES,
    search: {
      filters: [
        {
          title: 'Series types',
          field: 'series_type',
          aggName: 'sertype',
          labels: SERIES_TYPES,
        },
        {
          title: 'Mode of Issuance',
          field: 'mode_of_issuance',
          aggName: 'moi',
        },
        {
          title: 'Related content',
          field: 'relations',
          aggName: 'relation',
          labels: DOCUMENT_RELATIONS,
        },
        {
          title: 'Languages',
          field: 'languages',
          aggName: 'language',
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
  PROVIDERS: {
    search: {
      filters: [
        {
          title: 'Type',
          field: 'type',
          aggName: 'type',
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
        identifier: {
          scheme: 'conference_identifier_scheme',
        },
      },
      identifier: {
        scheme: 'identifier_scheme',
      },
      tags: 'tag',
      doc_subjects: 'doc_subjects',
      doc_identifiers_materials: 'doc_identifiers_materials',
    },
    documentRequests: {
      doc_req_type: 'doc_req_type',
      doc_req_payment_method: 'doc_req_payment_method',
      doc_req_medium: 'doc_req_medium',
    },
    eitem: { source: 'eitem_sources' },
    item: {
      mediums: 'item_medium',
      identifier: {
        scheme: 'identifier_scheme',
      },
    },
    series: {
      identifier: {
        scheme: 'series_identifier_scheme',
      },
      access_restrictions: 'series_url_access_restriction',
      ser_identifiers_materials: 'doc_identifiers_materials',
    },
    illBorrowingRequests: {
      ill_item_type: 'ill_item_type',
      ill_payment_mode: 'ill_payment_mode',
    },
    providers: {
      provider_type: 'provider_type',
    },
  },
  // required if config overridden in overlay
  INTERNAL_LOCATIONS: {},
  LOCATIONS: {},
};
