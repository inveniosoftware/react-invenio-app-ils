import { orderSerializer } from './serializer';

const stringDateTime = '2018-01-01T11:05:00+01:00';

describe('Order request/response serializers tests', () => {
  const stringDate = '2018-11-22';
  const price = {
    value: 10.5,
    currency: 'CHF',
  };
  const orderLines = [
    {
      budget_code: 'ABC',
      copies_orders: 2,
      copies_received: 1,
      document_pid: '123ABC',
      inter_departmental_transaction_id: 'j354n6',
      is_donation: false,
      is_patron_suggestion: true,
      medium: 'hardcover',
      notes: 'Nice book',
      patron_pid: '3',
      payment_mode: 'Cash',
      purchase_type: 'Normal',
      recipient: 'Patron',
      total_price: price,
      unit_price: price,
    },
  ];
  const payment = {
    debit_cost: price,
    debit_cost_main_currency: price,
    debit_date: stringDate,
    debit_note: 'Some notes',
    internal_purchase_requisition_id: 'kjh4564h',
    mode: 'Credit Card',
  };

  it('should serialize all fields from response', () => {
    const serialized = orderSerializer.fromJSON({
      created: stringDateTime,
      id: 123,
      links: 'test',
      metadata: {
        pid: '123',
        cancel_reason: 'abc',
        created_by: {
          type: 'user_id',
          value: '1',
        },
        received_date: stringDate,
        expected_delivery_date: stringDate,
        funds: ['abc'],
        grand_total: price,
        grand_total_main_currency: price,
        notes: 'abc',
        order_date: stringDate,
        order_lines: orderLines,
        resolved_order_lines: orderLines,
        payment: payment,
        status: 'RECEIVED',
        provider_pid: '1',
      },
      updated: stringDateTime,
    });

    expect(serialized).toEqual({
      created: stringDateTime,
      id: 123,
      links: 'test',
      metadata: {
        pid: '123',
        cancel_reason: 'abc',
        created_by: {
          type: 'user_id',
          value: '1',
        },
        received_date: stringDate,
        expected_delivery_date: stringDate,
        funds: ['abc'],
        grand_total: price,
        grand_total_main_currency: price,
        notes: 'abc',
        order_date: stringDate,
        order_lines: orderLines,
        resolved_order_lines: orderLines,
        payment: {
          ...payment,
          debit_date: stringDate,
        },
        status: 'RECEIVED',
        provider_pid: '1',
      },
      pid: '123',
      updated: stringDateTime,
    });
  });
});
