import DocumentLanguages from '@modules/Document/DocumentLanguages';
import { RemoveItemButton } from '@components/backoffice/buttons/RemoveItemButton';
import { RelationListEntry } from '@modules/Relations/backoffice/components/RelationListEntry';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Label, Item } from 'semantic-ui-react';

export default class MultipleSelections extends Component {
  render() {
    const { selections, removeSelection } = this.props;
    return (
      <Item.Group divided>
        {selections.map((selection) => (
          <RelationListEntry
            record={selection}
            key={selection.metadata.pid}
            extra={
              <>
                <Icon size="big" name="language" />
                <Label className="ml-10">
                  <DocumentLanguages languages={selection.metadata.languages} />
                </Label>
              </>
            }
            actions={
              <RemoveItemButton
                onClick={removeSelection}
                dataPid={selection.metadata.pid}
                popup="Removes this selection"
              />
            }
          />
        ))}
      </Item.Group>
    );
  }
}

MultipleSelections.propTypes = {
  selections: PropTypes.array.isRequired,
  removeSelection: PropTypes.func.isRequired,
};
