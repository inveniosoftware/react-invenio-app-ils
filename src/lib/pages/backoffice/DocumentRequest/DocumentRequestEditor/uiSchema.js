import { invenioConfig } from '@config';
import _merge from 'lodash/merge';

export const uiSchema = (title) => {
  const _uiSchema = {
    patron_pid: {
      'ui:widget': 'referencedPatron',
    },
    document_pid: {
      'ui:widget': 'referencedDocument',
    },
    physical_item_provider: {
      'ui:field': 'documentRequestProviderField',
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
        vocabularyType:
          invenioConfig.VOCABULARIES.documentRequests.doc_req_type,
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
        medium: 3,
        patron_pid: 5,
      },
      {
        'custom:divider': 16,
      },
      {
        state: 4,
        request_type: 4,
        decline_reason: 8,
      },
      {
        'custom:divider': 16,
      },
      {
        document_pid: 8,
        physical_item_provider: 8,
      },
      {
        'custom:divider': 16,
      },
      {
        authors: 11,
        edition: 5,
      },
      {
        publisher: 11,
        publication_year: 5,
      },
      {
        isbn: 8,
        issn: 8,
      },
      {
        journal_title: 6,
        volume: 2,
        issue: 2,
        page: 2,
        standard_number: 4,
      },
      {
        'custom:divider': 16,
      },
      {
        payment_method: 4,
        payment_info: 8,
      },
      {
        note: 16,
      },
      {
        internal_note: 16,
      },
    ],
    'custom:root': {
      'custom:formTitle': title,
    },
  };
  return _merge(_uiSchema, invenioConfig.DOCUMENT_REQUESTS.editorUiSchema);
};
