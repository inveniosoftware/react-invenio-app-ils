import { HitsSearch } from '@modules/ESSelector/HitsSearch';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

export default class RelationSelector extends Component {
  disabledSelectionOption = result => {
    const { existingRelations, referrerRecordPid } = this.props;

    /* if itself, disable it */
    const isReferrer = referrerRecordPid === result.metadata.pid;
    if (isReferrer) {
      return true;
    }

    /* if relation already exists the option gets blocked */
    const hasRelations = !isEmpty(existingRelations);
    if (!hasRelations) {
      return false;
    }
    return existingRelations.find(rel => rel.pid_value === result.metadata.pid);
  };

  isSelected = option => {
    const { selections } = this.props;
    return selections.find(o => o.pid === option.metadata.pid);
  };

  selectResultRender = option => {
    let disabled = false;
    const { resultRenderer } = this.props;

    if (this.disabledSelectionOption(option) || this.isSelected(option)) {
      disabled = true;
    }

    return resultRenderer(option, disabled);
  };

  onSelectResult = result => {
    const { mode, resetSelections, selectOption } = this.props;
    if (mode === 'single') {
      resetSelections();
    }
    if (!this.disabledSelectionOption(result) || this.isSelected(result)) {
      selectOption(result);
    }
  };

  render() {
    const { optionsQuery, currentRecordType } = this.props;
    return (
      <HitsSearch
        key={currentRecordType}
        query={optionsQuery}
        delay={250}
        minCharacters={3}
        placeholder="Type to find a literature..."
        onSelect={this.onSelectResult}
        value=""
        resultRenderer={this.selectResultRender}
        ref={element => (this.searchRef = element)}
      />
    );
  }
}
RelationSelector.propTypes = {
  /* selections got from the current document, reducer */
  selections: PropTypes.array.isRequired,
  existingRelations: PropTypes.array,
  optionsQuery: PropTypes.func.isRequired,
  resultRenderer: PropTypes.func.isRequired,
  referrerRecordPid: PropTypes.string.isRequired,
  mode: PropTypes.oneOf(['single', 'multi']).isRequired,
  currentRecordType: PropTypes.string.isRequired,
  resetSelections: PropTypes.func.isRequired,
  selectOption: PropTypes.func.isRequired,
};

RelationSelector.defaultProps = {
  existingRelations: [],
};
