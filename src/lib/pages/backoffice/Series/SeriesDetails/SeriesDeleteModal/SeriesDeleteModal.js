import { DeleteRecordModal } from '@components/backoffice/DeleteRecordModal';
import { DeleteButton } from '@components/backoffice/DeleteRecordModal/DeleteButton';
import { formatPidTypeToName } from '@components/backoffice/utils';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

const deleteButton = props => {
  return (
    <DeleteButton
      fluid
      content="Delete series"
      labelPosition="left"
      {...props}
    />
  );
};

export default class SeriesDeleteModal extends Component {
  async getRelationRefs() {
    const { relations } = this.props;
    const hits = [];
    for (const [relation, records] of Object.entries(relations)) {
      for (const record of records) {
        const type = formatPidTypeToName(record.pid_type);
        hits.push({
          id: `${type} ${record.pid} (${relation})`,
          record: record,
          type: type,
        });
      }
    }
    return {
      data: {
        hits: hits,
        total: hits.length,
      },
    };
  }

  createRefProps() {
    return [
      {
        refType: 'Related',
        onRefClick: () => {},
        getRefData: () => this.getRelationRefs(),
      },
    ];
  }
  render() {
    const { series, deleteSeries } = this.props;
    return (
      <DeleteRecordModal
        deleteHeader={`Are you sure you want to delete the Series record
            with ID ${series.pid}?`}
        refProps={this.createRefProps()}
        onDelete={() => deleteSeries(series.pid)}
        trigger={deleteButton}
      />
    );
  }
}

SeriesDeleteModal.propTypes = {
  series: PropTypes.object.isRequired,
  relations: PropTypes.object.isRequired,
  deleteSeries: PropTypes.func.isRequired,
};
