import { prettyPrintBooleanValue } from '@components/utils';
import _get from 'lodash/get';
import _isFunction from 'lodash/isFunction';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';

export default class ResultsTableBody extends Component {
  renderCell = (col, row, rowIndex) => {
    if ('formatter' in col && _isFunction(col.formatter)) {
      return col.formatter({ col: col, row: row, rowIndex: rowIndex });
    }
    if (typeof row[col.field] === 'boolean') {
      return prettyPrintBooleanValue(row[col.field]);
    }
    return _get(row, col.field) || '-';
  };

  renderRow = (columns, rows) => {
    return rows.map((row, rowIndex) => {
      const identifier = row.pid ? row.pid : row.id ? row.id : row.pid_value;
      return (
        <Table.Row key={identifier} data-test={identifier}>
          {columns.map((col, idx) => {
            const key = `${idx}-${identifier}`;
            return (
              <Table.Cell key={key} data-test={key} data-label={col.title}>
                {this.renderCell(col, row, rowIndex)}
              </Table.Cell>
            );
          })}
        </Table.Row>
      );
    });
  };

  render() {
    const { columns, rows } = this.props;
    return <Table.Body>{this.renderRow(columns, rows)}</Table.Body>;
  }
}

ResultsTableBody.propTypes = {
  columns: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
};
