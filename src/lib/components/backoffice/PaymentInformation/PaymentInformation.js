import { formatPrice } from '@api/utils';
import { MetadataTable } from '@components/backoffice/MetadataTable';
import { InfoMessage } from '@components/InfoMessage';
import { invenioConfig } from '@config';
import PropTypes from 'prop-types';
import React from 'react';
import { Grid, Icon, Popup } from 'semantic-ui-react';
import { max } from 'lodash';
// import Overridable from 'react-overridable';

export function leftPaymentTable(order, type = 'acquisition-order') {
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

export function rightPaymentTable(order, type = 'acquisition-order') {
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

export class PaymentInformation extends React.Component {
  render() {
    const { order, type, renderLeftTable, renderRightTable } = this.props;
    const { payment } = order;
    if (payment === undefined)
      return <InfoMessage title="There is no payment information" />;

    const leftTable = renderLeftTable(order, type);
    const rightTable = renderRightTable(order, type);

    const gridLength = max([leftTable.length, rightTable.length]);

    return (
      <Grid columns={2} id="payment-info">
        <Grid.Row>
          <Grid.Column>
            <MetadataTable labelWidth={gridLength} rows={leftTable} />
          </Grid.Column>
          <Grid.Column>
            <MetadataTable labelWidth={gridLength} rows={rightTable} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

PaymentInformation.propTypes = {
  order: PropTypes.object.isRequired,
  type: PropTypes.object.isRequired,
  renderLeftTable: PropTypes.array,
  renderRightTable: PropTypes.array,
};

PaymentInformation.defaultProps = {
  renderLeftTable: leftPaymentTable,
  renderRightTable: rightPaymentTable,
};

// export default Overridable.component(
//   'Acquisition.OrderDetails.PaymentInformation',
//   PaymentInformation
// );
