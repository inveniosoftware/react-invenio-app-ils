import { RemoveItemButton } from '@components/backoffice/buttons/RemoveItemButton';
import { RelationCard } from '@modules/Relations/backoffice/components/RelationCard';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class SingleSelection extends Component {
  render() {
    const { selections, removeSelection } = this.props;
    return (
      <RelationCard
        data={selections[0]}
        actions={
          <RemoveItemButton
            onClick={removeSelection}
            dataPid={selections[0].metadata.pid}
            popup="Removes this selection"
          />
        }
      />
    );
  }
}

SingleSelection.propTypes = {
  selections: PropTypes.array.isRequired,
  removeSelection: PropTypes.func.isRequired,
};
