import { DeleteActionButton } from '@forms/components/DeleteActionButton';
import PropTypes from 'prop-types';
import React from 'react';
import { AccordionField } from './AccordionField';
import { ArrayField } from './ArrayField';
import { GroupField } from './GroupField';

export class ObjectArrayField extends React.Component {
  renderArrayItem = ({ arrayPath, indexPath, ...arrayHelpers }) => {
    const objectPath = `${arrayPath}.${indexPath}`;
    const { objects } = this.props;
    return (
      <GroupField
        border
        widths="equal"
        action={
          <DeleteActionButton
            size="large"
            onClick={() => arrayHelpers.remove(indexPath)}
          />
        }
      >
        {objects.map(obj => {
          const ObjectField = obj.element;
          const objProps = obj.props || {};
          return (
            <ObjectField
              key={obj.key}
              fieldPath={`${objectPath}.${obj.key}`}
              {...objProps}
            />
          );
        })}
      </GroupField>
    );
  };

  renderArrayField = () => {
    const {
      fieldPath,
      accordion,
      defaultNewValue,
      label,
      addButtonLabel,
    } = this.props;

    return (
      <ArrayField
        fieldPath={fieldPath}
        label={accordion ? undefined : label}
        defaultNewValue={defaultNewValue}
        renderArrayItem={this.renderArrayItem}
        addButtonLabel={addButtonLabel}
      />
    );
  };

  render() {
    const { accordion, label, fieldPath } = this.props;
    if (accordion) {
      return (
        <AccordionField
          label={label}
          fieldPath={fieldPath}
          content={this.renderArrayField()}
        />
      );
    }

    return this.renderArrayField();
  }
}

ObjectArrayField.propTypes = {
  accordion: PropTypes.bool,
  addButtonLabel: PropTypes.string,
  defaultNewValue: PropTypes.object.isRequired,
  fieldPath: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  objects: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      element: PropTypes.any.isRequired,
      props: PropTypes.object,
    })
  ).isRequired,
};

ObjectArrayField.defaultProps = {
  accordion: false,
  addButtonLabel: 'Add',
};
