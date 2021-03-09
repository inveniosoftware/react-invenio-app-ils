import { invenioConfig } from '@config';

export const schema = {
  definitions: {
    payment: {
      properties: {
        budget_code: {
          title: 'Budget code',
          type: 'string',
        },
        debit_cost: {
          $ref: '#/definitions/price',
          title: 'Total cost',
        },
        debit_cost_main_currency: {
          $ref: '#/definitions/price-default-currency',
          title: 'Total cost (main currency)',
        },
        debit_date: {
          format: 'date',
          title: 'Debit date',
          type: 'string',
        },
        debit_note: {
          title: 'Debit note',
          type: 'string',
        },
        internal_purchase_requisition_id: {
          title: 'Internal purchase requisition ID',
          type: 'string',
        },
        mode: {
          title: 'Payment mode',
          type: 'string',
        },
      },
      type: 'object',
    },
    'price-default-currency': {
      properties: {
        currency: {
          title: 'Currency',
          type: 'string',
          enum: ['', invenioConfig.APP.DEFAULT_CURRENCY],
        },
        value: {
          minimum: 0,
          title: 'Value',
          type: 'number',
        },
      },
      dependencies: {
        value: ['currency'],
        currency: ['value'],
      },
      type: 'object',
    },
    price: {
      properties: {
        currency: {
          title: 'Currency',
          type: 'string',
        },
        value: {
          minimum: 0,
          title: 'Value',
          type: 'number',
        },
      },
      dependencies: {
        value: ['currency'],
        currency: ['value'],
      },
      type: 'object',
    },
  },
  properties: {
    cancel_reason: {
      title: 'Cancel reason',
      type: 'string',
    },
    document_pid: {
      title: 'Document',
      type: 'string',
    },
    due_date: {
      format: 'date',
      title: 'Due date',
      type: 'string',
    },
    expected_delivery_date: {
      format: 'date',
      title: 'Expected delivery date',
      type: 'string',
    },
    provider_pid: {
      title: 'Provider',
      type: 'string',
    },
    notes: {
      title: 'Notes',
      type: 'string',
    },
    patron_pid: {
      title: 'Patron',
      type: 'string',
    },
    payment: {
      $ref: '#/definitions/payment',
      title: 'Payment',
    },
    received_date: {
      format: 'date',
      title: 'Received date',
      type: 'string',
    },
    request_date: {
      format: 'date',
      title: 'Request date',
      type: 'string',
    },
    status: {
      title: 'Status',
      type: 'string',
      enum: Object.values(invenioConfig.ILL_BORROWING_REQUESTS.statuses).map(
        (s) => s.value
      ),
    },
    total: {
      $ref: '#/definitions/price',
      title: 'Order total',
    },
    total_main_currency: {
      $ref: '#/definitions/price-default-currency',
      title: 'Order total (main currency)',
    },
    type: {
      title: 'Type',
      type: 'string',
    },
  },
  required: ['status', 'document_pid', 'patron_pid', 'provider_pid', 'type'],
  type: 'object',
};
