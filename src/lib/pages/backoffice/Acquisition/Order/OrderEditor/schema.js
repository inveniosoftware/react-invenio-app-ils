import { invenioConfig } from '@config';
import _find from 'lodash/find';
import _get from 'lodash/get';
import _merge from 'lodash/merge';

export const schema = () => {
  const _schema = {
    definitions: {
      'order-line': {
        properties: {
          budget_code: {
            title: 'Payment information',
            type: 'string',
          },
          copies_ordered: {
            title: 'Number of ordered copies',
            type: 'integer',
          },
          copies_received: {
            title: 'Number of received copies',
            type: 'integer',
          },
          document_pid: {
            title: 'Ordered document',
            type: 'string',
          },
          inter_departmental_transaction_id: {
            title: 'ID of inter-departmental transaction',
            type: 'string',
          },
          is_donation: {
            title: 'This order line is a donation',
            type: 'boolean',
          },
          is_patron_suggestion: {
            title: 'This order line is a suggestion',
            type: 'boolean',
          },
          medium: {
            title: 'Medium',
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
          payment_mode: {
            title: 'Payment mode',
            type: 'string',
          },
          purchase_type: {
            title: 'Purchase Type',
            type: 'string',
          },
          recipient: {
            title: 'Recipient',
            type: 'string',
          },
          total_price: {
            $ref: '#/definitions/price',
            title: 'Total price',
          },
          unit_price: {
            $ref: '#/definitions/price',
            title: 'Price per unit',
          },
        },
        required: ['document_pid', 'recipient', 'medium', 'copies_ordered'],
        type: 'object',
      },
      payment: {
        properties: {
          debit_cost: {
            $ref: '#/definitions/price',
            title: 'Debit amount',
          },
          debit_cost_main_currency: {
            $ref: '#/definitions/price-default-currency',
            title: 'Debit amount (main currency)',
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
      expected_delivery_date: {
        format: 'date',
        title: 'Expected delivery date',
        type: 'string',
      },
      funds: {
        items: {
          title: 'Description',
          type: 'string',
        },
        title: 'Funds',
        type: 'array',
      },
      grand_total: {
        $ref: '#/definitions/price',
        title: 'Order total',
      },
      grand_total_main_currency: {
        $ref: '#/definitions/price-default-currency',
        title: 'Order total (main currency)',
      },
      notes: {
        title: 'Notes',
        type: 'string',
      },
      order_date: {
        format: 'date',
        title: 'Order date',
        type: 'string',
      },
      order_lines: {
        items: {
          $ref: '#/definitions/order-line',
        },
        minItems: 1,
        title: 'Order lines',
        type: 'array',
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
      status: {
        title: 'Status',
        type: 'string',
        enum: Object.values(invenioConfig.ACQ_ORDERS.statuses)
          .sort((a, b) => a.order - b.order)
          .map((s) => s.value),
        default: _get(
          _find(invenioConfig.ACQ_ORDERS.statuses, { default: true }),
          'value',
          null
        ),
      },
      provider_pid: {
        title: 'Provider',
        type: 'string',
      },
    },
    required: ['order_lines', 'status', 'provider_pid'],
    type: 'object',
  };
  return _merge(_schema, invenioConfig.ACQ_ORDERS.editorSchema);
};
