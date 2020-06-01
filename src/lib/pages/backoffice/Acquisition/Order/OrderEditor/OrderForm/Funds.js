import { DeleteActionButton } from '@forms/components/DeleteActionButton';
import { ArrayField } from '@forms/core/ArrayField';
import { GroupField } from '@forms/core/GroupField';
import { StringField } from '@forms/core/StringField';
import React, { Component } from 'react';

export class Funds extends Component {
  renderArrayItem({ arrayPath, indexPath, ...arrayHelpers }) {
    return (
      <GroupField basic>
        <StringField
          fieldPath={`${arrayPath}.${indexPath}`}
          optimized
          action={
            <DeleteActionButton
              icon="trash"
              onClick={() => arrayHelpers.remove(indexPath)}
            />
          }
        />
      </GroupField>
    );
  }

  render() {
    return (
      <ArrayField
        fieldPath="funds"
        label="Funds"
        defaultNewValue=""
        renderArrayItem={this.renderArrayItem}
        addButtonLabel="Add new fund"
      />
    );
  }
}
