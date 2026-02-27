import _groupBy from 'lodash/groupBy';
import React from 'react';
import { List } from 'semantic-ui-react';

export function formatPidTypeToName(pidType: string): string {
  switch (pidType) {
    case 'docid':
      return 'Document';
    case 'serid':
      return 'Series';
    default:
      return pidType;
  }
}

interface SchemeValueEntry {
  scheme: string;
  value: string;
  material?: string;
}

interface MetadataRow {
  name: string;
  value: React.ReactNode;
}

export const groupedSchemeValueList = (
  schemeValueList: SchemeValueEntry[]
): MetadataRow[] => {
  const groupedIDs = _groupBy(schemeValueList, 'scheme');
  let rows: MetadataRow[] = [];
  for (const [scheme, idsList] of Object.entries(groupedIDs)) {
    const entries = idsList as SchemeValueEntry[];
    rows.push({
      name: scheme,
      value: React.createElement(
        List,
        { bulleted: true },
        entries.map((entry) =>
          React.createElement(
            List.Item,
            { key: entry.value },
            React.createElement(
              List.Content,
              null,
              entry.value,
              entry.material &&
                React.createElement(
                  React.Fragment,
                  null,
                  ' (',
                  entry.material,
                  ')'
                )
            )
          )
        )
      ),
    });
  }
  return rows;
};
