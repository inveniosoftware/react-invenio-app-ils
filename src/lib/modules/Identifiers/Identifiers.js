import { InfoMessage } from '@components/InfoMessage';
import { InfoPopup } from '@components/InfoPopup';
import { SeparatedList } from '@components/SeparatedList';
import capitalize from 'lodash/capitalize';
import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React from 'react';
import { Divider, Table } from 'semantic-ui-react';

export const Identifiers = ({ identifiers }) => {
  return (
    <InfoMessage
      show={!_isEmpty(identifiers)}
      message="There are no identifiers."
    >
      <Divider horizontal>Identifiers</Divider>
      <Table definition>
        <Table.Body>
          <IdentifierRows identifiers={identifiers} />
        </Table.Body>
      </Table>
    </InfoMessage>
  );
};

Identifiers.propTypes = {
  identifiers: PropTypes.array,
};

Identifiers.defaultProps = {
  identifiers: [],
};

export const IdentifierRows = ({ includeSchemes, identifiers }) => {
  const idsByScheme = {};
  for (const id of identifiers) {
    // Only include whitelisted schemes if includeSchemes is set
    if (includeSchemes.length === 0 || includeSchemes.includes(id.scheme)) {
      const value = { value: id.value, material: id.material };
      if (id.scheme in idsByScheme) {
        idsByScheme[id.scheme].push(value);
      } else {
        idsByScheme[id.scheme] = [value];
      }
    }
  }

  return Object.entries(idsByScheme).map(([scheme, ids]) => {
    const values = ids.map(id => (
      <>
        {id.value}
        {id.material && (
          <>
            {' '}
            <InfoPopup message="Material for this identifier">
              ({capitalize(id.material)})
            </InfoPopup>
          </>
        )}
      </>
    ));
    return (
      <Table.Row key={scheme}>
        <Table.Cell>{scheme}</Table.Cell>
        <Table.Cell>
          <SeparatedList items={values} />
        </Table.Cell>
      </Table.Row>
    );
  });
};

IdentifierRows.propTypes = {
  includeSchemes: PropTypes.array,
  identifiers: PropTypes.array,
};

IdentifierRows.defaultProps = {
  includeSchemes: [],
};
