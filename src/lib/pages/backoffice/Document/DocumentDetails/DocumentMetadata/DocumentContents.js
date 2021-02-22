import DocumentToc from '@modules/Document/DocumentToc';
import { DocumentSubjects } from './DocumentSubjects';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Divider, Header } from 'semantic-ui-react';
import _isEmpty from 'lodash/isEmpty';
import { ShowMoreContent } from '@components/ShowMoreContent';
import LiteratureTags from '@modules/Literature/LiteratureTags';
import { InfoMessage } from '@components/backoffice/InfoMessage';
import LiteratureKeywords from '@modules/Literature/LiteratureKeywords';

export class DocumentContents extends Component {
  render() {
    const { document } = this.props;
    if (
      !_isEmpty(document.metadata.abstract) ||
      !_isEmpty(document.metadata.table_of_content) ||
      !_isEmpty(document.metadata.subjects) ||
      !_isEmpty(document.metadata.tags) ||
      !_isEmpty(document.metadata.keywords) ||
      !_isEmpty(document.metadata.physical_description)
    ) {
      return (
        <>
          {!_isEmpty(document.metadata.abstract) && (
            <>
              <Header as="h3">Abstract</Header>
              <ShowMoreContent
                content={document.metadata.abstract}
                lines={10}
              />
            </>
          )}

          {!_isEmpty(document.metadata.physical_description) && (
            <>
              <Header as="h3">Physical description</Header>
              <ShowMoreContent
                content={document.metadata.physical_description}
                lines={10}
              />
            </>
          )}

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
              <Header as="h3">Subjects classification</Header>
              <DocumentSubjects document={document} />
            </>
          )}

          {!_isEmpty(document.metadata.tags) && (
            <>
              <Divider />
              <Header as="h3">Tags</Header>
              <LiteratureTags size="mini" tags={document.metadata.tags} />
            </>
          )}

          {!_isEmpty(document.metadata.keywords) && (
            <>
              <Divider />
              <Header as="h3">Keywords</Header>
              <br />
              <LiteratureKeywords keywords={document.metadata.keywords} />
            </>
          )}
        </>
      );
    } else {
      return (
        <InfoMessage
          header="No stored content information."
          content="Edit document to add content information"
        />
      );
    }
  }
}

DocumentContents.propTypes = {
  document: PropTypes.object.isRequired,
};
