import { uiConfig } from '@config';
import { DocumentConference } from '@modules/Document/DocumentConference';
import { DocumentInfo } from '@modules/Document/DocumentInfo';
import { DocumentTableOfContent } from '@modules/Document/DocumentTableOfContent';
import { Identifiers } from '@modules/Identifiers';
import { LiteratureNotes } from '@modules/Literature/LiteratureNotes';
import LiteratureRelations from '@modules/Literature/LiteratureRelations';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Overridable from 'react-overridable';
import { Accordion, Icon } from 'semantic-ui-react';
import { DocumentMetadataExtensions } from '@modules/Document/DocumentMetadataExtensions';

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
    const identifiers = _get(metadata, 'identifiers', []);
    const altIdentifiers = _get(metadata, 'alternative_identifiers', []);
    const { extensions = {} } = metadata;
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
          active={activeIndex === 'identifiers'}
          index="identifiers"
          onClick={this.handleClick}
        >
          <Icon name="dropdown" />
          Identifiers
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 'identifiers'}>
          <Identifiers identifiers={identifiers.concat(altIdentifiers)} />
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

        <Accordion.Title
          active={activeIndex === uiConfig.extensions.document.label}
          index={uiConfig.extensions.document.label}
          onClick={this.handleClick}
        >
          <Icon name="dropdown" />
          {uiConfig.extensions.document.label}
        </Accordion.Title>
        {!_isEmpty(extensions) &&
          _isEmpty(uiConfig.extensions.document.fields) && (
            <Accordion.Content
              active={activeIndex === uiConfig.extensions.document.label}
            >
              <Overridable
                id="DocumentMetadataTabs.Extensions.mobile"
                extensions={extensions}
              />
              <DocumentMetadataExtensions extensions={extensions} />
            </Accordion.Content>
          )}
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
