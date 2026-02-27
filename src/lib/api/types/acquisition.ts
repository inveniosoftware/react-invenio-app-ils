/* eslint-disable camelcase */
export interface Payment {
  mode?: string;
  internal_purchase_requisition_id?: string;
  debit_note?: string;
  debit_cost_main_currency?: any;
  debit_cost?: {
    currency?: string;
  } & any;
  debit_date?: string;
  budget_code?: string;
}

export interface Order {
  payment: Payment;
  grand_total?: any;
  grand_total_main_currency?: any;
  total?: any;
  total_main_currency?: any;
  funds?: string[];
}
/* eslint-enable camelcase */
