import { DocumentSubjects } from '@pages/backoffice/Document/DocumentDetails/DocumentMetadata/DocumentSubjects';
import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Divider, List } from 'semantic-ui-react';

export class DocumentContent extends Component {
  render() {
    const {
      metadata,
      metadata: { abstract, toc },
    } = this.props;

    return (
      <>
        <Divider horizontal>Table of Content</Divider>
        {!_isEmpty(toc) ? (
          <List ordered>
            {toc.map((entry) => (
              <List.Item key={entry}>
                <List.Content>{entry}</List.Content>
              </List.Item>
            ))}
          </List>
        ) : (
          'No table of content'
        )}

        <Divider horizontal>Abstract</Divider>
        {abstract ? abstract : 'No abstract'}

        <Divider horizontal>Subject classification</Divider>
        <DocumentSubjects metadata={metadata} />
      </>
    );
  }
}

DocumentContent.propTypes = {
  metadata: PropTypes.object.isRequired,
};
