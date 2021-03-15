import { invenioConfig } from '@config';
import _merge from 'lodash/merge';

export const uiSchema = (title) => {
  const _uiSchema = {
    document_pid: {
      'ui:widget': 'referencedDocument',
    },
    provider_pid: {
      'ui:widget': 'referencedProvider',
    },
    notes: {
      'ui:widget': 'textarea',
    },
    patron_pid: {
      'ui:widget': 'referencedPatron',
    },
    payment: {
      mode: {
        'ui:widget': 'vocabulary',
        'ui:options': {
          vocabularyType:
            invenioConfig.VOCABULARIES.illBorrowingRequests.ill_payment_mode,
        },
      },
      debit_cost: {
        currency: {
          'ui:widget': 'vocabulary',
          'ui:options': {
            vocabularyType: invenioConfig.VOCABULARIES.currencies,
          },
        },
        'custom:grid': [
          {
            currency: 6,
            value: 10,
          },
        ],
      },
      debit_cost_main_currency: {
        'custom:grid': [
          {
            currency: 6,
            value: 10,
          },
        ],
      },
      debit_note: {
        'ui:widget': 'textarea',
      },
      'custom:grid': [
        {
          mode: 5,
          debit_date: 5,
          internal_purchase_requisition_id: 6,
        },
        { debit_cost: 6, debit_cost_main_currency: 5, debit_note: 5 },
      ],
    },
    total: {
      currency: {
        'ui:widget': 'vocabulary',
        'ui:options': {
          vocabularyType: invenioConfig.VOCABULARIES.currencies,
        },
      },
      'custom:grid': [
        {
          currency: 6,
          value: 10,
        },
      ],
    },
    total_main_currency: {
      'custom:grid': [
        {
          currency: 6,
          value: 10,
        },
      ],
    },
    type: {
      'ui:widget': 'vocabulary',
      'ui:options': {
        vocabularyType:
          invenioConfig.VOCABULARIES.illBorrowingRequests.ill_item_type,
      },
    },
    'custom:grid': [
      {
        provider_pid: 6,
        status: 3,
        cancel_reason: 7,
      },
      {
        'custom:divider': 16,
      },
      {
        document_pid: 6,
        type: 4,
        patron_pid: 6,
      },
      {
        'custom:divider': 16,
      },
      {
        request_date: 4,
        expected_delivery_date: 4,
        received_date: 4,
        due_date: 4,
      },
      {
        'custom:divider': 16,
      },
      { total: 8, total_main_currency: 8 },
      {
        'custom:divider': 16,
      },
      { payment: 16 },
      {
        'custom:divider': 16,
      },
      {
        notes: 16,
      },
    ],
    'custom:root': {
      'custom:formTitle': title,
    },
  };
  return _merge(_uiSchema, invenioConfig.ILL_BORROWING_REQUESTS.editorUiSchema);
};
