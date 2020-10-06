import { Field, getIn } from 'formik';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Form, Icon, List } from 'semantic-ui-react';
import { ErrorIcon } from './ErrorIcon';

export class ObjectListField extends Component {
  onItemClick = (item, index) => {
    const { onItemChange, activeIndex } = this.props;
    if (index === activeIndex) {
      index = null;
      item = null;
    }
    if (onItemChange) {
      onItemChange(index, item);
    }
  };

  getListItemIcon = (index, errors) => {
    const { fieldPath } = this.props;
    for (const errorPath in errors) {
      if (errorPath.startsWith(`${fieldPath}.${index}`)) {
        return <ErrorIcon />;
      }
    }
    return <Icon name="list" />;
  };

  renderFormField = props => {
    const { fieldPath, keyField, activeIndex } = this.props;
    const {
      form: { errors, values, isSubmitting },
    } = props;
    const items = getIn(values, fieldPath, []);
    return (
      <Form.Field className="object-list-field" required>
        <List horizontal divided relaxed>
          {items.map((item, index) => (
            <List.Item
              key={index}
              as="a"
              active={activeIndex === index}
              disabled={isSubmitting}
              onClick={() => this.onItemClick(item, index)}
            >
              <List.Content>
                {this.getListItemIcon(index, errors)}
                {item[keyField]}
              </List.Content>
            </List.Item>
          ))}

          <List.Item
            as="a"
            active={activeIndex === items.length}
            disabled={isSubmitting}
            onClick={() => this.onItemClick(null, items.length)}
          >
            <List.Content>
              <Icon name="id card" />
              New author
            </List.Content>
          </List.Item>
        </List>
      </Form.Field>
    );
  };

  render() {
    const { fieldPath } = this.props;
    return <Field name={fieldPath} component={this.renderFormField} />;
  }
}

ObjectListField.propTypes = {
  fieldPath: PropTypes.string.isRequired,
  onItemChange: PropTypes.func.isRequired,
  keyField: PropTypes.string.isRequired,
  activeIndex: PropTypes.number,
};

ObjectListField.defaultProps = {
  activeIndex: null,
};
