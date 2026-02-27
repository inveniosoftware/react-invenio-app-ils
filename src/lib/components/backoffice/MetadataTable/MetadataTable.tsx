import React, { Component, ReactNode } from 'react';
import { Table, SemanticWIDTHS } from 'semantic-ui-react';
import { prettyPrintBooleanValue } from '@components/utils';

interface MetadataRow {
  name: ReactNode;
  value: ReactNode;
  icon?: ReactNode;
}

interface MetadataTableProps {
  rows: MetadataRow[];
  labelWidth?: SemanticWIDTHS;
}

export default class MetadataTable extends Component<MetadataTableProps> {
  static defaultProps = {
    labelWidth: 4 as SemanticWIDTHS,
  };

  renderRows() {
    const { labelWidth, rows } = this.props;
    return rows.map((row, index) => (
      <Table.Row key={typeof row.name === 'string' ? row.name : index}>
        <Table.Cell width={labelWidth}>
          {row.icon} {row.name}
        </Table.Cell>
        <Table.Cell>
          {typeof row.value === 'boolean'
            ? prettyPrintBooleanValue(row.value)
            : row.value}
        </Table.Cell>
      </Table.Row>
    ));
  }

  render() {
    return (
      <Table definition>
        <Table.Body>{this.renderRows()}</Table.Body>
      </Table>
    );
  }
}
