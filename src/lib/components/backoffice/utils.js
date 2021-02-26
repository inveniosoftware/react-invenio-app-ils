import _groupBy from 'lodash/groupBy';
import React from 'react';
import { List } from 'semantic-ui-react';

export function formatPidTypeToName(pidType) {
  switch (pidType) {
    case 'docid':
      return 'Document';
    case 'serid':
      return 'Series';
    default:
      return pidType;
  }
}

export const groupedSchemeValueList = (schemeValueList) => {
  const groupedIDs = _groupBy(schemeValueList, 'scheme');
  let rows = [];
  for (const [scheme, idsList] of Object.entries(groupedIDs)) {
    rows.push({
      name: scheme,
      value: (
        <List bulleted>
          {idsList.map((entry) => (
            <List.Item key={entry.value}>
              <List.Content>
                {entry.value} {entry.material && <>({entry.material})</>}
              </List.Content>
            </List.Item>
          ))}
        </List>
      ),
    });
  }
  return rows;
};
