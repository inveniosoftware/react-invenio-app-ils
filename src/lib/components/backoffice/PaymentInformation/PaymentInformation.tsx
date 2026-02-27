import { Order, Payment } from '@api/types';
import { formatPrice } from '@api/utils';
import { MetadataTable } from '@components/backoffice/MetadataTable';
import { InfoMessage } from '@components/InfoMessage';
import { invenioConfig } from '@config';
import React, { ReactNode } from 'react';
import { Grid, Icon, Popup } from 'semantic-ui-react';
import { max } from 'lodash';

export type { Order, Payment };

interface MetadataRow {
  name: ReactNode;
  value: ReactNode;
}

type OrderType = 'acquisition-order' | 'borrowing-request';

type RenderTableFunction = (order: Order, type: OrderType) => MetadataRow[];

export function leftPaymentTable(
  order: Order,
  type: OrderType = 'acquisition-order'
): MetadataRow[] {
  const { payment } = order;
  if (type === 'borrowing-request') {
    order.grand_total = order.total;
    order.grand_total_main_currency = order.total_main_currency;
  }
  return [
    {
      name: `Total (${invenioConfig.APP.DEFAULT_CURRENCY})`,
      value: formatPrice(order.grand_total_main_currency) || '-',
    },
    {
      name:
        order.grand_total && order.grand_total.currency
          ? `Total (${order.grand_total.currency})`
          : 'Total',
      value: formatPrice(order.grand_total) || '-',
    },
    { name: 'Payment Mode', value: payment.mode },
    {
      name: (
        <>
          IPR ID{' '}
          <Popup
            content="Internal purchase requisition ID"
            trigger={<Icon name="info circle" size="large" />}
          />
        </>
      ),
      value: payment.internal_purchase_requisition_id || '-',
    },
    { name: 'Notes', value: payment.debit_note || '-' },
  ];
}

export function rightPaymentTable(
  order: Order,
  type: OrderType = 'acquisition-order'
): MetadataRow[] {
  const { payment } = order;
  return [
    {
      name: `Debit cost (${invenioConfig.APP.DEFAULT_CURRENCY})`,
      value: formatPrice(payment.debit_cost_main_currency) || '-',
    },
    {
      name:
        payment.debit_cost && payment.debit_cost.currency
          ? `Debit cost (${payment.debit_cost.currency})`
          : 'Debit cost',
      value: formatPrice(payment.debit_cost) || '-',
    },
    {
      name: 'Debit date',
      value: payment.debit_date ? payment.debit_date : '-',
    },
    type === 'borrowing-request'
      ? { name: 'Funds', value: order.funds ? order.funds.join(', ') : '-' }
      : { name: 'Internal budget', value: payment.budget_code },
  ];
}

interface PaymentInformationProps {
  order: Order;
  type: OrderType;
  renderLeftTable?: RenderTableFunction;
  renderRightTable?: RenderTableFunction;
}

export class PaymentInformation extends React.Component<PaymentInformationProps> {
  static defaultProps = {
    renderLeftTable: leftPaymentTable,
    renderRightTable: rightPaymentTable,
  };

  render() {
    const { order, type, renderLeftTable, renderRightTable } = this.props;
    const { payment } = order;
    if (payment === undefined)
      return <InfoMessage title="There is no payment information" message="" />;

    const leftTable = renderLeftTable!(order, type);
    const rightTable = renderRightTable!(order, type);

    const gridLength = max([leftTable.length, rightTable.length]);

    return (
      <Grid columns={2} id="payment-info">
        <Grid.Row>
          <Grid.Column>
            <MetadataTable labelWidth={gridLength as any} rows={leftTable} />
          </Grid.Column>
          <Grid.Column>
            <MetadataTable labelWidth={gridLength as any} rows={rightTable} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
