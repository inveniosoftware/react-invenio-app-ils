import { RJSFormWrapper } from '@forms/rjsf/RJSFormWrapper';
import {
  ArrayFieldTemplate,
  FieldTemplate,
  ObjectFieldTemplate,
} from '@rjsf/semantic-ui';
import _find from 'lodash/find';
import PropTypes from 'prop-types';
import React from 'react';
import { Divider, Form, Grid } from 'semantic-ui-react';

/**
 * Wrapper component to wrap the entire form or a specific field with a
 * given component
 * @param {*} props
 */
const Wrapper = ({ uiSchema, children }) => {
  const hasFormWrapper = 'custom:formWrapper' in uiSchema;
  const hasFormTitle = 'custom:formTitle' in uiSchema;
  if (hasFormWrapper && hasFormTitle) {
    throw Error('Cannot have both formWrapper and formTitle at the same time.');
  }

  if (hasFormTitle) {
    const title = uiSchema['custom:formTitle'];
    return <RJSFormWrapper title={title}>{children}</RJSFormWrapper>;
  }

  if (hasFormWrapper) {
    return uiSchema['custom:formWrapper'](children);
  }

  const hasFieldWrapper = 'custom:fieldWrapper' in uiSchema;
  if (hasFieldWrapper) {
    return uiSchema['custom:fieldWrapper'](children);
  }

  return children;
};

Wrapper.propTypes = {
  uiSchema: PropTypes.object.isRequired,
  children: PropTypes.array,
};

/**
 * Component to allow wrapping the original RJSF FieldTemplate
 * @param {*} props
 */
export function FieldTemplateWithWrapper(props) {
  const { children, required, uiSchema, schema } = props;

  // workaround of labels disappearing when specifying format or enum
  // https://github.com/rjsf-team/react-jsonschema-form/issues/1946

  return schema.format || schema.enum ? (
    <Wrapper uiSchema={uiSchema}>
      <Form.Field required={required}>
        <label>{schema.title}</label>
        <FieldTemplate {...props}>{children}</FieldTemplate>
      </Form.Field>
    </Wrapper>
  ) : (
    <Wrapper uiSchema={uiSchema}>
      <FieldTemplate {...props}>{children}</FieldTemplate>
    </Wrapper>
  );
}

FieldTemplateWithWrapper.propTypes = {
  required: PropTypes.bool,
  uiSchema: PropTypes.object.isRequired,
  schema: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

FieldTemplateWithWrapper.defaultProps = {
  required: false,
};

/**
 * Component to allow wrapping the original RJSF ObjectFieldTemplate
 * @param {*} props
 */
export function ObjectFieldTemplateWithWrapper(props) {
  const { children, uiSchema } = props;
  return (
    <Wrapper uiSchema={uiSchema}>
      <ObjectFieldTemplate {...props}>{children}</ObjectFieldTemplate>
    </Wrapper>
  );
}

ObjectFieldTemplateWithWrapper.propTypes = {
  uiSchema: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

/**
 * Grid divider component
 */
function GridDivider(props) {
  const { colWidth } = props;
  return (
    <Grid.Column width={colWidth}>
      <Divider fitted />
    </Grid.Column>
  );
}

GridDivider.propTypes = {
  colWidth: PropTypes.number.isRequired,
};

/**
 * Form field wrapped in a Grid.Col
 */
function GridCol(props) {
  const { field, colWidth } = props;
  return <Grid.Column width={colWidth}>{field.content}</Grid.Column>;
}

GridCol.propTypes = {
  colWidth: PropTypes.number.isRequired,
  field: PropTypes.object.isRequired,
};

/**
 * Form fields wrapped in a Grid.Row
 */
function GridRow(props) {
  const { formProps, row } = props;
  return (
    <Grid.Row>
      {Object.keys(row).map((fieldName, i) => {
        const colWidth = row[fieldName];
        const isDivider = fieldName === 'custom:divider';
        if (isDivider) {
          return <GridDivider colWidth={colWidth} key={i} />;
        } else {
          const field = _find(
            formProps.properties,
            (obj) => obj.name === fieldName
          );
          return field ? (
            <GridCol
              field={field}
              colWidth={colWidth}
              key={field.content.key}
            />
          ) : null;
        }
      })}
    </Grid.Row>
  );
}

GridRow.propTypes = {
  formProps: PropTypes.object.isRequired,
  row: PropTypes.object.isRequired,
};

/**
 * Custom ObjectFieldTemplate component to wrap each `object` field with <Grid />
 * and render each subfield in Rows/Cols.
 * @param {*} props
 */
function ObjectFieldTemplateGrid(props) {
  const { idSchema, uiSchema, title, TitleField, required } = props;
  const fieldTitle = uiSchema['ui:title'] || title;
  return (
    <>
      {fieldTitle && (
        <TitleField
          id={`${idSchema.$id}-title`}
          title={fieldTitle}
          options={uiSchema['ui:options']}
          required={required}
        />
      )}
      <Grid>
        {uiSchema['custom:grid'].map((row, i) => {
          const firstFieldName = Object.keys(row)[0];
          return (
            <GridRow
              formProps={props}
              row={row}
              key={`${firstFieldName}${i}`}
            />
          );
        })}
      </Grid>
    </>
  );
}

ObjectFieldTemplateGrid.propTypes = {
  idSchema: PropTypes.object.isRequired,
  uiSchema: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  TitleField: PropTypes.node.isRequired,
  required: PropTypes.bool,
};

ObjectFieldTemplateGrid.defaultProps = {
  required: false,
};

/**
 * Wraps the form root component with a custom Wrapper cmp and renders each field
 * in a Grid.
 * @param {*} props
 */
export function ObjectFieldTemplateWrapperGrid(props) {
  const { idSchema, uiSchema } = props;
  const isRoot = idSchema.$id === 'root';
  return isRoot ? (
    <Wrapper uiSchema={uiSchema['custom:root'] || {}}>
      {ObjectFieldTemplateGrid(props)}
    </Wrapper>
  ) : (
    ObjectFieldTemplateGrid(props)
  );
}

ObjectFieldTemplateWrapperGrid.propTypes = {
  idSchema: PropTypes.object.isRequired,
  uiSchema: PropTypes.object.isRequired,
};

ObjectFieldTemplateWrapperGrid.defaultProps = {};

/**
 * Component to allow wrapping the original RJSF ArrayFieldTemplate
 * @param {*} props
 */
export function ArrayFieldTemplateWithWrapper(props) {
  const { children, uiSchema } = props;

  return (
    <Wrapper uiSchema={uiSchema}>
      <ArrayFieldTemplate {...props}>{children}</ArrayFieldTemplate>
    </Wrapper>
  );
}

ArrayFieldTemplateWithWrapper.propTypes = {
  uiSchema: PropTypes.object.isRequired,
  children: PropTypes.node,
};

ArrayFieldTemplateWithWrapper.defaultProps = {
  children: null,
};
