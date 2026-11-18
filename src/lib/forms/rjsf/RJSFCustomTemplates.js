/*
 * SPDX-FileCopyrightText: 2021-2026 CERN.
 * SPDX-License-Identifier: MIT
 */

import { GridRow } from '@forms/rjsf/layout/GridRow';
import { SectionedObjectFieldTemplate } from '@forms/rjsf/layout/SectionedObjectFieldTemplate';
import { ArrayItemContext } from '@forms/rjsf/layout/arrays/ArrayItemContext';
import { TableCells } from '@forms/rjsf/layout/arrays/ArrayItemTemplate';
import {
  hasArrayLayout,
  SectionedArrayTemplate,
} from '@forms/rjsf/layout/arrays/SectionedArrayTemplate';
import { NestedObjectRows } from '@forms/rjsf/layout/NestedObjectRows';
import { isInArray, isInCard, schemaKey } from '@forms/rjsf/layout/rows';
import { hasSections } from '@forms/rjsf/layout/sections';
import { RJSFormWrapper } from '@forms/rjsf/RJSFormWrapper';
import { Templates } from '@rjsf/semantic-ui';
import { titleId } from '@rjsf/utils';

const { ArrayFieldTemplate, ObjectFieldTemplate } = Templates;
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Grid } from 'semantic-ui-react';
import { ignoreRJSFEnterEvent } from './utils';

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
  children: PropTypes.node,
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
 * Custom ObjectFieldTemplate component to wrap each `object` field with <Grid />
 * and render each subfield in Rows/Cols.
 * @param {*} props
 */
function ObjectFieldTemplateGrid(props) {
  const {
    fieldPathId,
    uiSchema,
    schema,
    title,
    required,
    registry,
    hideTitle,
  } = props;
  const { TitleFieldTemplate: TitleField } = registry.templates;
  const fieldTitle = uiSchema['ui:title'] || title;
  return (
    <>
      {fieldTitle && !hideTitle && (
        <TitleField
          id={titleId(fieldPathId)}
          title={fieldTitle}
          schema={schema}
          uiSchema={uiSchema}
          registry={registry}
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
  fieldPathId: PropTypes.object.isRequired,
  uiSchema: PropTypes.object.isRequired,
  schema: PropTypes.object,
  hideTitle: PropTypes.bool,
  title: PropTypes.string.isRequired,
  registry: PropTypes.object.isRequired,
  required: PropTypes.bool,
};

ObjectFieldTemplateGrid.defaultProps = {
  required: false,
  hideTitle: false,
};

/**
 * Wraps the form root component with a custom Wrapper cmp and renders each field
 * in a Grid.
 * @param {*} props
 */
export function ObjectFieldTemplateWrapperGrid(props) {
  const { fieldPathId, uiSchema } = props;
  const itemContext = useContext(ArrayItemContext);
  const isRoot = fieldPathId.$id === 'root';
  if (isRoot && hasSections(uiSchema)) {
    // root of a form rendered in numbered sections with a sticky record bar
    return <SectionedObjectFieldTemplate {...props} />;
  }
  const { registry } = props;
  const isLayoutItem =
    itemContext && itemContext.itemPathKey === schemaKey(fieldPathId.path);
  if (isLayoutItem && itemContext.layout === 'table') {
    // item of a table array: its fields are the cells of the row
    return (
      <TableCells properties={props.properties} columns={itemContext.columns} />
    );
  }
  if (isLayoutItem && itemContext.layout === 'cards') {
    // the title is already in the header of the card; fields one per line
    return <NestedObjectRows {...props} hideTitle />;
  }
  if (
    !isRoot &&
    registry.formContext &&
    registry.formContext.sectioned &&
    (!isInArray(fieldPathId.path) || isInCard(itemContext, fieldPathId.path))
  ) {
    // object inside a sectioned form (or a card): one field per line
    return <NestedObjectRows {...props} />;
  }
  return isRoot ? (
    <Wrapper uiSchema={uiSchema['custom:root'] || {}}>
      {ObjectFieldTemplateGrid(props)}
    </Wrapper>
  ) : (
    ObjectFieldTemplateGrid(props)
  );
}

ObjectFieldTemplateWrapperGrid.propTypes = {
  fieldPathId: PropTypes.object.isRequired,
  properties: PropTypes.array.isRequired,
  uiSchema: PropTypes.object.isRequired,
  registry: PropTypes.object.isRequired,
};

ObjectFieldTemplateWrapperGrid.defaultProps = {};

/**
 * Component to allow wrapping the original RJSF ArrayFieldTemplate
 * @param {*} props
 */
export function ArrayFieldTemplateWithWrapper(props) {
  const { children, uiSchema } = props;
  ignoreRJSFEnterEvent(document);

  if (hasArrayLayout(props)) {
    return <SectionedArrayTemplate {...props} />;
  }

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
