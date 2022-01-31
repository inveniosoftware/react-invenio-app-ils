import DocumentToc from '@modules/Document/DocumentToc';
import { DocumentSubjects } from './DocumentSubjects';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Divider, Header } from 'semantic-ui-react';
import _isEmpty from 'lodash/isEmpty';
import { ShowMoreContent } from '@components/ShowMoreContent';
import LiteratureTags from '@modules/Literature/LiteratureTags';
import LiteratureKeywords from '@modules/Literature/LiteratureKeywords';
import DocumentAlternativeAbstracts from '@modules/Document/DocumentAlternativeAbstracts';

export class DocumentContents extends Component {
  render() {
    const {
      document: {
        metadata: {
          abstract,
          physical_description: physicalDescription,
          tags,
          keywords,
        },
        metadata,
      },
    } = this.props;

    return (
      <>
        <Header as="h3">Abstract</Header>
        {!_isEmpty(abstract) ? (
          <ShowMoreContent content={abstract} lines={10} />
        ) : (
          'There is no abstract'
        )}

        <Header as="h3">Alternative Abstracts</Header>
        <DocumentAlternativeAbstracts metadata={metadata} />

        <Header as="h3">Physical description</Header>
        {!_isEmpty(physicalDescription) ? (
          <ShowMoreContent content={physicalDescription} lines={10} />
        ) : (
          'There is no physical description'
        )}

        <Divider />
        <Header as="h3">Table of contents</Header>
        <DocumentToc metadata={metadata} />

        <Divider />
        <Header as="h3">Subjects classification</Header>
        <DocumentSubjects metadata={metadata} />

        <Divider />
        <Header as="h3">Tags</Header>
        <LiteratureTags size="mini" tags={tags} />

        <Divider />
        <Header as="h3">Keywords</Header>
        {!_isEmpty(keywords) ? (
          <LiteratureKeywords keywords={keywords} />
        ) : (
          'No keywords.'
        )}
      </>
    );
  }
}

DocumentContents.propTypes = {
  document: PropTypes.object.isRequired,
};
