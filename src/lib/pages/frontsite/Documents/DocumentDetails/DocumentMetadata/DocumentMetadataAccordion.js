import { invenioConfig } from '@config';
import { DocumentConference } from '@modules/Document/DocumentConference';
import { DocumentInfo } from '@modules/Document/DocumentInfo';
import { DocumentLinks } from '@modules/Document/DocumentLinks';
import { DocumentMetadataExtensions } from '@modules/Document/DocumentMetadataExtensions';
import { DocumentPublicationInfo } from '@modules/Document/DocumentPublicationInfo';
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
          <DocumentPublicationInfo publications={metadata.publication_info} />
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
          <DocumentConference conference={metadata.conference_info} />
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
          active={activeIndex === 'resources'}
          index="resources"
          onClick={this.handleClick}
        >
          <Icon name="dropdown" />
          Resources
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 'resources'}>
          <DocumentLinks dividers eitems={metadata.eitems} />
        </Accordion.Content>

        {!_isEmpty(extensions) &&
          _isEmpty(invenioConfig.DOCUMENTS.extensions.fields) && (
            <>
              <Accordion.Title
                active={
                  activeIndex === invenioConfig.DOCUMENTS.extensions.label
                }
                index={invenioConfig.DOCUMENTS.extensions.label}
                onClick={this.handleClick}
              >
                <Icon name="dropdown" />
                {invenioConfig.DOCUMENTS.extensions.label}
              </Accordion.Title>
              <Accordion.Content
                active={
                  activeIndex === invenioConfig.DOCUMENTS.extensions.label
                }
              >
                <Overridable
                  id="DocumentMetadataTabs.Extensions.mobile"
                  extensions={extensions}
                />
                <DocumentMetadataExtensions extensions={extensions} />
              </Accordion.Content>
            </>
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
