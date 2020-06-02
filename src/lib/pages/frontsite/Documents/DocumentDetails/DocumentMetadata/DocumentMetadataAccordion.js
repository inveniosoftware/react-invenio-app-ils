import LiteratureRelations from '@modules/Literature/LiteratureRelations';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Overridable from 'react-overridable';
import { Accordion, Icon } from 'semantic-ui-react';
import { LiteratureNotes } from '@modules/Literature/LiteratureNotes';
import { DocumentConference } from '@modules/Document/DocumentConference';
import { DocumentTableOfContent } from '@modules/Document/DocumentTableOfContent';
import { DocumentInfo } from '@modules/Document/DocumentInfo';

class DocumentMetadataAccordion extends Component {
  state = { activeIndex: 'details' };

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? '' : index;

    this.setState({ activeIndex: newIndex });
  };

  render() {
    const { activeIndex } = this.state;
    const { metadata } = this.props;
    return (
      <Accordion fluid styled>
        <Accordion.Title
          active={activeIndex === 'details'}
          index="details"
          onClick={this.handleClick}
        >
          <Icon name="dropdown" />
          Details
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 'details'}>
          <LiteratureRelations relations={metadata.relations} />
          <DocumentInfo metadata={metadata} />
        </Accordion.Content>

        <Accordion.Title
          active={activeIndex === 'content'}
          index="content"
          onClick={this.handleClick}
        >
          <Icon name="dropdown" />
          Content
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 'content'}>
          <DocumentTableOfContent
            toc={metadata.table_of_content}
            abstract={metadata.abstract}
          />
          <DocumentInfo metadata={metadata} />
        </Accordion.Content>

        <Accordion.Title
          active={activeIndex === 'publications'}
          index="publications"
          onClick={this.handleClick}
        >
          <Icon name="dropdown" />
          Publications
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 'publications'}>
          TODO
        </Accordion.Content>

        <Accordion.Title
          active={activeIndex === 'conference'}
          index="conference"
          onClick={this.handleClick}
        >
          <Icon name="dropdown" />
          Conference
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 'conference'}>
          <DocumentConference
            conference={metadata.conference_info}
            documentType={metadata.document_type}
          />
        </Accordion.Content>

        <Accordion.Title
          active={activeIndex === 'notes'}
          index="notes"
          onClick={this.handleClick}
        >
          <Icon name="dropdown" />
          Notes
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 'notes'}>
          <LiteratureNotes content={metadata.note} />
        </Accordion.Content>
      </Accordion>
    );
  }
}

DocumentMetadataAccordion.propTypes = {
  metadata: PropTypes.object.isRequired,
};

export default Overridable.component(
  'DocumentMetadataAccordion',
  DocumentMetadataAccordion
);
