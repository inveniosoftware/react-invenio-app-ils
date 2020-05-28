import { groupBy } from 'lodash';
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

export const groupedSchemeValueList = schemeValueList => {
  const groupedIDs = groupBy(schemeValueList, 'scheme');
  let rows = [];
  for (const [scheme, idsList] of Object.entries(groupedIDs)) {
    rows.push({
      name: scheme,
      value: (
        <List bulleted>
          {idsList.map((entry, idx) => (
            <List.Item key={idx}>
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
