import { invenioConfig } from '@config';

export const uiSchema = (title) => ({
  vendor_pid: {
    'ui:widget': 'referencedAcqVendor',
  },
  notes: {
    'ui:widget': 'textarea',
  },
  grand_total: {
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
  grand_total_main_currency: {
    'custom:grid': [
      {
        currency: 6,
        value: 10,
      },
    ],
  },
  funds: {
    'ui:options': {
      orderable: false,
    },
  },
  payment: {
    mode: {
      'ui:widget': 'vocabulary',
      'ui:options': {
        vocabularyType: invenioConfig.VOCABULARIES.acqOrders.acq_payment_mode,
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
  order_lines: {
    'ui:options': {
      orderable: false,
      semantic: {
        wrapItem: true,
      },
    },
    items: {
      document_pid: {
        'ui:widget': 'referencedDocument',
      },
      medium: {
        'ui:widget': 'vocabulary',
        'ui:options': {
          vocabularyType: invenioConfig.VOCABULARIES.acqOrders.acq_medium,
        },
      },
      patron_pid: {
        'ui:widget': 'referencedPatron',
      },
      payment_mode: {
        'ui:widget': 'vocabulary',
        'ui:options': {
          vocabularyType:
            invenioConfig.VOCABULARIES.acqOrders.acq_order_line_payment_mode,
        },
      },
      purchase_type: {
        'ui:widget': 'vocabulary',
        'ui:options': {
          vocabularyType:
            invenioConfig.VOCABULARIES.acqOrders.acq_order_line_purchase_type,
        },
      },
      recipient: {
        'ui:widget': 'vocabulary',
        'ui:options': {
          vocabularyType: invenioConfig.VOCABULARIES.acqOrders.acq_recipient,
        },
      },
      unit_price: {
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
      total_price: {
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
      notes: {
        'ui:widget': 'textarea',
      },
      is_donation: {
        'ui:options': {
          semantic: {
            toggle: true,
          },
        },
      },
      is_patron_suggestion: {
        'ui:options': {
          semantic: {
            toggle: true,
          },
        },
      },
      'custom:grid': [
        {
          document_pid: 8,
          copies_ordered: 4,
          copies_received: 4,
        },
        {
          recipient: 3,
          patron_pid: 5,
          medium: 4,
          purchase_type: 4,
        },
        {
          unit_price: 5,
          total_price: 5,
          payment_mode: 3,
          budget_code: 3,
        },
        {
          inter_departmental_transaction_id: 4,
          is_donation: 6,
          is_patron_suggestion: 6,
        },
        {
          notes: 16,
        },
      ],
    },
  },
  'custom:grid': [
    {
      vendor_pid: 6,
      status: 3,
      cancel_reason: 7,
    },
    {
      'custom:divider': 16,
    },
    {
      order_date: 5,
      expected_delivery_date: 5,
      received_date: 5,
    },
    {
      'custom:divider': 16,
    },
    { grand_total: 6, grand_total_main_currency: 5, funds: 5 },
    {
      'custom:divider': 16,
    },
    { payment: 16 },
    {
      notes: 16,
    },
    {
      order_lines: 16,
    },
  ],
  'custom:root': {
    'custom:formTitle': title,
  },
});
