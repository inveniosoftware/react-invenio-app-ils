import { RJSFormWrapper } from '@forms/rjsf/RJSFormWrapper';
import {
  FieldTemplate as SUIFieldTemplate,
  ObjectFieldTemplate as SUIObjectFieldTemplate,
} from '@rjsf/semantic-ui';
import _find from 'lodash/find';
import PropTypes from 'prop-types';
import React from 'react';
import { Divider, Grid } from 'semantic-ui-react';

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

  return children;
};

/**
 * Component to allow wrapping the original RJSF FieldTemplate
 * @param {*} props
 */
export function FieldTemplateWithWrapper(props) {
  const { uiSchema } = props;
  return (
    <Wrapper uiSchema={uiSchema}>
      <SUIFieldTemplate {...props} />
    </Wrapper>
  );
}

FieldTemplateWithWrapper.propTypes = {
  uiSchema: PropTypes.object.isRequired,
};

/**
 * Component to allow wrapping the original RJSF ObjectFieldTemplate
 * @param {*} props
 */
export function ObjectFieldTemplateWithWrapper(props) {
  const { uiSchema } = props;
  return (
    <Wrapper uiSchema={uiSchema}>
      <SUIObjectFieldTemplate {...props} />
    </Wrapper>
  );
}

ObjectFieldTemplateWithWrapper.propTypes = {
  uiSchema: PropTypes.object.isRequired,
};

/**
 * Grid divider component
 */
function GridDivider(props) {
  const { colWidth } = props;
  return (
    <Grid.Column width={colWidth}>
      <Divider />
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
          return (
            <GridCol
              field={field}
              colWidth={colWidth}
              key={field.content.key}
            />
          );
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
 * Wraps the entire form and adds a <Grid /> to organize components in Rows/Cols.
 * @param {*} props
 */
export function ObjectFieldTemplateWithGrid(props) {
  const { idSchema, uiSchema, title, description } = props;
  const isRoot = idSchema.$id === 'root';
  return isRoot ? (
    <Wrapper uiSchema={uiSchema['custom:root'] || {}}>
      {title}
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
      {description}
    </Wrapper>
  ) : (
    ObjectFieldTemplateWithWrapper(props)
  );
}

ObjectFieldTemplateWithGrid.propTypes = {
  idSchema: PropTypes.object.isRequired,
  uiSchema: PropTypes.object.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
};

ObjectFieldTemplateWithGrid.defaultProps = {
  title: '',
  description: '',
};

// Commented out because `ArrayFieldTemplate` is not correctly exported from RJSF
// and it causes issues with Jest tests. The code is to be kept like this for reference.
// See: https://github.com/rjsf-team/react-jsonschema-form/pull/2231
//
// import SUIArrayFieldTemplate from '@rjsf/semantic-ui/dist/ArrayFieldTemplate';
//
//  /**
//  * Component to allow wrapping the original RJSF ArrayFieldTemplate
//  * @param {*} props
//  */
// export function ArrayFieldTemplateWithWrapper(props) {
//   const { uiSchema } = props;
//   return (
//     <Wrapper uiSchema={uiSchema}>
//       <SUIArrayFieldTemplate {...props} />
//     </Wrapper>
//   );
// }

// ArrayFieldTemplateWithWrapper.propTypes = {
//   uiSchema: PropTypes.object.isRequired,
// };
