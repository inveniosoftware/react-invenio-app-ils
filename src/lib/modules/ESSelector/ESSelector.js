import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Overridable from 'react-overridable';
import { List, Container, Icon, Label, Popup } from 'semantic-ui-react';
import _isEmpty from 'lodash/isEmpty';
import { HitsSearch } from './HitsSearch';
import find from 'lodash/find';

class ESSelector extends Component {
  constructor(props) {
    super(props);

    const selections = [];
    for (const selection of props.initialSelections) {
      if (props.onSelectResult) {
        props.onSelectResult(selection, true);
      }
      selections.push(selection);
    }

    this.searchRef = null;
    this.state = {
      selections: selections,
    };
  }

  updateSelections = selections => {
    const { onSelectionsUpdate } = this.props;
    this.setState({ selections });
    onSelectionsUpdate(selections);
  };

  addSingleSelection = selection => {
    const selections = [selection];
    this.updateSelections(selections);
  };

  addMultiSelection = selection => {
    const { selections } = this.state;
    const currentSelections = [...selections];
    let hasMatch = find(currentSelections, sel => sel.id === selection.id);

    if (!hasMatch) {
      currentSelections.push(selection);
      this.updateSelections(currentSelections);
    }
  };

  onSelectResult = result => {
    const { onSelectResult, multiple } = this.props;
    if (onSelectResult) {
      onSelectResult(result);
    }
    return multiple
      ? this.addMultiSelection(result)
      : this.addSingleSelection(result);
  };

  removeSelection = selection => {
    const { selections } = this.state;
    const { onRemoveSelection } = this.props;
    // Remove from state
    const newSelections = selections.filter(
      currentSelection => currentSelection.id !== selection.id
    );
    this.updateSelections(newSelections);
    if (onRemoveSelection) {
      onRemoveSelection(selection);
    }
    // focus back on the input field
    if (this.searchRef) {
      this.searchRef.searchInputRef.focus();
    }
  };

  renderSelection = (selection, removeSelection) => {
    const { renderSelection, icon } = this.props;
    if (renderSelection) return renderSelection;

    const label = (
      <Label>
        {icon}
        {selection.title}
        <Label.Detail>{selection.description}</Label.Detail>
        <Icon name="delete" onClick={() => removeSelection(selection)} />
      </Label>
    );

    return (
      <List.Item key={selection.id}>
        <List.Content>
          {selection.extra ? (
            <Popup content={selection.extra} trigger={label} />
          ) : (
            label
          )}
        </List.Content>
      </List.Item>
    );
  };

  renderSelections = (selections, renderSelection, removeSelection) => {
    const { renderSelections } = this.props;
    if (renderSelections) return renderSelections;

    return (
      <Container className="result-selections">
        <List>
          {selections.map(selection =>
            renderSelection(selection, removeSelection)
          )}
        </List>
      </Container>
    );
  };

  renderSelectionInfoText = () => {
    const { selectionInfoText, emptySelectionInfoText } = this.props;
    const { selections } = this.state;
    if (
      !_isEmpty(selections) &&
      (selectionInfoText || emptySelectionInfoText)
    ) {
      return (
        <p>
          {selections.length > 0 ? selectionInfoText : emptySelectionInfoText}
        </p>
      );
    }
  };

  render() {
    const {
      placeholder,
      disabled,
      id,
      name,
      query,
      delay,
      alwaysWildcard,
      minCharacters,
      focus,
      serializer,
      onSearchChange,
      onResults,
    } = this.props;
    const { selections } = this.state;
    return (
      <div id="es-selector">
        <HitsSearch
          disabled={disabled}
          id={id}
          name={name}
          query={query}
          delay={delay}
          alwaysWildcard={alwaysWildcard}
          minCharacters={minCharacters}
          placeholder={placeholder}
          focus={focus}
          serializer={serializer}
          onResults={onResults}
          onSelect={this.onSelectResult}
          onSearchChange={onSearchChange}
          ref={element => (this.searchRef = element)}
        />
        {this.renderSelectionInfoText()}
        {this.renderSelections(
          selections,
          this.renderSelection,
          this.removeSelection
        )}
      </div>
    );
  }
}

ESSelector.propTypes = {
  alwaysWildcard: PropTypes.bool,
  delay: PropTypes.number,
  disabled: PropTypes.bool,
  initialSelections: PropTypes.array,
  minCharacters: PropTypes.number,
  multiple: PropTypes.bool,
  placeholder: PropTypes.string,
  query: PropTypes.func.isRequired,
  onSearchChange: PropTypes.func,
  onResults: PropTypes.func,
  onSelectResult: PropTypes.func,
  onSelectionsUpdate: PropTypes.func,
  onRemoveSelection: PropTypes.func,
  renderSelections: PropTypes.func,
  renderSelection: PropTypes.func,
  serializer: PropTypes.func,
  id: PropTypes.string,
  name: PropTypes.string,
  icon: PropTypes.any,
  selectionInfoText: PropTypes.string,
  emptySelectionInfoText: PropTypes.string,
  focus: PropTypes.bool,
};

ESSelector.defaultProps = {
  delay: 250,
  initialSelections: [],
  minCharacters: 3,
  icon: null,
  onSelectionsUpdate: () => {},
  emptySelectionInfoText: null,
  selectionInfoText: null,
  onResults: null,
  focus: false,
};

export default Overridable.component('ESSelector', ESSelector);
