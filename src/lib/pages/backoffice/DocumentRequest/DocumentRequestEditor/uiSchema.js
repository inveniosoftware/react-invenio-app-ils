import { invenioConfig } from '@config';

export const uiSchema = (title) => ({
  medium: {
    'ui:widget': 'vocabulary',
    'ui:options': {
      vocabularyType:
        invenioConfig.VOCABULARIES.documentRequests.doc_req_medium,
    },
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
      state: 4,
      reject_reason: 4,
      document_pid: 4,
      internal_note: 4,
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
      edition: 4,
      volume: 4,
      issue: 4,
      standard_number: 4,
    },
    {
      page: 8,
      publication_year: 8,
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
