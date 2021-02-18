import { invenioConfig } from '@config';

export const schema = {
  properties: {
    authors: {
      title: 'Authors',
      type: 'string',
    },
    document_pid: {
      title: 'Selected document',
      type: 'string',
    },
    edition: {
      title: 'Edition',
      type: 'string',
    },
    internal_note: {
      title: 'Internal notes',
      type: 'string',
    },
    isbn: {
      title: 'ISBN',
      type: 'string',
    },
    issn: {
      title: 'ISSN',
      type: 'string',
    },
    issue: {
      title: 'Issue',
      type: 'string',
    },
    journal_title: {
      title: 'Journal title',
      type: 'string',
    },
    medium: {
      title: 'Medium',
      type: 'string',
    },
    note: {
      title: 'User notes',
      type: 'string',
    },
    page: {
      title: 'Page',
      type: 'string',
    },
    patron_pid: {
      title: 'Patron',
      type: 'string',
    },
    payment_info: {
      title: 'Payment information',
      type: 'string',
    },
    payment_method: {
      title: 'Payment method',
      type: 'string',
    },
    physical_item_provider: {
      properties: {
        pid: {
          title:
            'The pid value of the Acquisition purchase order, or ILL borrow request',
          type: 'string',
        },
        pid_type: {
          title: 'The pid type of Acquisition or Interlibrary',
          type: 'string',
        },
      },
      type: 'object',
    },
    publication_year: {
      title: 'Publication year',
      type: 'integer',
    },
    decline_reason: {
      title: 'Decline reason',
      type: 'string',
      // add empty string in case the value must be reset
      enum: ['', ...invenioConfig.DOCUMENT_REQUESTS.declineTypes],
    },
    request_type: {
      title: 'Request type',
      type: 'string',
    },
    standard_number: {
      title: 'Standard number',
      type: 'string',
    },
    state: {
      title: 'State',
      type: 'string',
      enum: invenioConfig.DOCUMENT_REQUESTS.states,
    },
    title: {
      title: 'Title',
      type: 'string',
    },
    volume: {
      title: 'Volume',
      type: 'string',
    },
  },
  required: ['state', 'patron_pid', 'title', 'request_type', 'medium'],
  type: 'object',
};
