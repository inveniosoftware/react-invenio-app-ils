import { DocumentSubjects } from '@pages/backoffice/Document/DocumentDetails/DocumentMetadata/DocumentSubjects';
import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Divider, List } from 'semantic-ui-react';
import { MetadataTable } from '../../components/backoffice/MetadataTable';

export class DocumentContent extends Component {
  prepareAlternativeAbstracts = (element, index) => {
    return [{ name: index, value: element }];
  };

  render() {
    const {
      metadata,
      metadata: { abstract, table_of_content },
    } = this.props;

    return (
      <>
        <Divider horizontal>Table of contents</Divider>
        {!_isEmpty(table_of_content) ? (
          <List ordered>
            {
              // eslint-disable-next-line camelcase
              table_of_content.map((entry) => (
                <List.Item key={entry}>
                  <List.Content>{entry}</List.Content>
                </List.Item>
              ))
            }
          </List>
        ) : (
          'No table of contents'
        )}

        <Divider horizontal>Abstract</Divider>
        {abstract ? abstract : 'No abstract'}

        <Divider horizontal>Subject classification</Divider>
        <DocumentSubjects metadata={metadata} />

        <Divider horizontal>Alternative abstracts</Divider>
        {!_isEmpty(metadata.alternative_abstracts)
          ? metadata.alternative_abstracts.map((element, index) => (
              <MetadataTable
                key={element}
                rows={this.prepareAlternativeAbstracts(element, index + 1)}
              />
            ))
          : 'No alternative abstracts'}
      </>
    );
  }
}

DocumentContent.propTypes = {
  metadata: PropTypes.object.isRequired,
};
