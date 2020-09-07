import { MetadataTable } from '@components/backoffice/MetadataTable';
import _groupBy from 'lodash/groupBy';
import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { List } from 'semantic-ui-react';

export class DocumentKeywords extends Component {
  render() {
    const { document } = this.props;

    if (!_isEmpty(document.metadata.keywords)) {
      const groupedSubjects = _groupBy(document.metadata.keywords, 'value');
      let rows = [];
      for (const [scheme, idsList] of Object.entries(groupedSubjects)) {
        rows.push({
          name: scheme,
          value: (
            <List>
              {idsList.map(entry => (
                <List.Item key={entry.value}>
                  <List.Content>{entry.value}</List.Content>
                </List.Item>
              ))}
            </List>
          ),
        });
      }
      return <MetadataTable rows={rows} />;
    }
    return null;
  }
}

DocumentKeywords.propTypes = {
  document: PropTypes.object.isRequired,
};
