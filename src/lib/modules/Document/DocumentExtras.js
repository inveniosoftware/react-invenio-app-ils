import { MetadataTable } from '@components/backoffice/MetadataTable';
import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Divider, Header, List } from 'semantic-ui-react';

export class DocumentExtras extends Component {
  prepareAlternativeTitle = (element) => {
    let rows = [];
    rows.push({
      name: 'Alternative title',
      value: (
        <List bulleted>
          {element.map((entry) => (
            <List.Item key={entry.value}>
              <List.Content>{entry.value}</List.Content>
            </List.Item>
          ))}
        </List>
      ),
    });
    return rows;
  };

  prepareAlternativeAbstracts = (element) => {
    return [{ name: 'Abstract', value: element }];
  };

  render() {
    const { metadata } = this.props;
    if (
      !_isEmpty(metadata.alternative_titles) ||
      !_isEmpty(metadata.alternative_abstracts)
    ) {
      return (
        <>
          {!_isEmpty(metadata.alternative_titles) && (
            <>
              <Header as="h3">Alternative titles</Header>
              <MetadataTable
                rows={this.prepareAlternativeTitle(metadata.alternative_titles)}
              />
            </>
          )}

          {!_isEmpty(metadata.alternative_abstracts) && (
            <>
              <Divider />
              <Header as="h3">Publication info</Header>
              {metadata.alternative_abstracts.map((element) => (
                <MetadataTable
                  key={element}
                  rows={this.prepareAlternativeAbstracts(element)}
                />
              ))}
            </>
          )}
        </>
      );
    } else {
      return 'No additional information.';
    }
  }
}

DocumentExtras.propTypes = {
  metadata: PropTypes.object.isRequired,
};
