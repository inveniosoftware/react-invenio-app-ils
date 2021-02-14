import { invenioConfig } from '@config';

export const uiSchema = (title) => ({
  patron_pid: {
    'ui:widget': 'referencedPatron',
  },
  document_pid: {
    'ui:widget': 'referencedDocument',
  },
  medium: {
    'ui:widget': 'vocabulary',
    'ui:options': {
      vocabularyType:
        invenioConfig.VOCABULARIES.documentRequests.doc_req_medium,
    },
  },
  internal_note: {
    'ui:widget': 'textarea',
  },
  request_type: {
    'ui:widget': 'vocabulary',
    'ui:options': {
      vocabularyType: invenioConfig.VOCABULARIES.documentRequests.doc_req_type,
    },
  },
  payment_method: {
    'ui:widget': 'vocabulary',
    'ui:options': {
      vocabularyType:
        invenioConfig.VOCABULARIES.documentRequests.doc_req_payment_method,
    },
  },
  note: {
    'ui:widget': 'textarea',
  },
  'custom:grid': [
    {
      title: 8,
      medium: 4,
      patron_pid: 4,
    },
    {
      'custom:divider': 16,
    },
    {
      state: 8,
      decline_reason: 7,
    },
    {
      'custom:divider': 16,
    },
    {
      document_pid: 6,
      internal_note: 10,
    },
    {
      'custom:divider': 16,
    },
    {
      journal_title: 8,
      authors: 8,
    },
    {
      isbn: 8,
      issn: 8,
    },
    {
      edition: 3,
      publication_year: 2,
      volume: 3,
      issue: 3,
      page: 2,
      standard_number: 3,
    },
    {
      request_type: 4,
      payment_method: 4,
      payment_info: 8,
    },
    {
      note: 16,
    },
  ],
  'custom:root': {
    'custom:formTitle': title,
  },
});
