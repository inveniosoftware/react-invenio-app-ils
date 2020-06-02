import DocumentToc from '@modules/Document/DocumentToc';
import { DocumentSubjects } from './DocumentSubjects';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Divider, Header } from 'semantic-ui-react';
import _isEmpty from 'lodash/isEmpty';
import { ShowMoreContent } from '@components/ShowMoreContent';

export class DocumentContents extends Component {
  render() {
    const { document } = this.props;
    return (
      <>
        <Header as="h3">Abstract</Header>
        <ShowMoreContent content={document.metadata.abstract} lines={10} />

        {!_isEmpty(document.metadata.table_of_content) && (
          <>
            <Divider />
            <Header as="h3">Table of content</Header>
            <DocumentToc document={document} />
          </>
        )}

        {!_isEmpty(document.metadata.subjects) && (
          <>
            <Divider />
            <Header as="h3">Subjects</Header>
            <DocumentSubjects document={document} />
          </>
        )}
      </>
    );
  }
}

DocumentContents.propTypes = {
  document: PropTypes.object.isRequired,
};
