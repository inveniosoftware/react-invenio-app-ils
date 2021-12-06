import { invenioConfig } from '@config';
import { DocumentConference } from '@modules/Document/DocumentConference';
import { DocumentContent } from '@modules/Document/DocumentContent';
import { DocumentCopyrights } from '@modules/Document/DocumentCopyrights';
import { DocumentEItemUrls } from '@modules/Document/DocumentEItemUrls';
import { DocumentInfo } from '@modules/Document/DocumentInfo';
import { DocumentPublicationInfo } from '@modules/Document/DocumentPublicationInfo';
import { Identifiers } from '@modules/Identifiers';
import { LiteratureMetadataExtensions } from '@modules/Literature/LiteratureMetadataExtensions';
import { LiteratureNotes } from '@modules/Literature/LiteratureNotes';
import LiteratureRelations from '@modules/Literature/LiteratureRelations';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Overridable from 'react-overridable';
import { Tab } from 'semantic-ui-react';

class DocumentMetadataTabs extends Component {
  renderTabPanes = () => {
    const { metadata } = this.props;
    const identifiers = _get(metadata, 'identifiers', []);
    const altIdentifiers = _get(metadata, 'alternative_identifiers', []);
    const panes = [
      {
        menuItem: 'Details',
        render: () => (
          <Tab.Pane>
            <LiteratureRelations relations={metadata.relations} />
            <DocumentInfo metadata={metadata} />
          </Tab.Pane>
        ),
      },
      {
        menuItem: 'Identifiers',
        render: () => (
          <Tab.Pane>
            <Overridable id="DocumentMetadataTabs.Identifiers">
              <Identifiers identifiers={identifiers.concat(altIdentifiers)} />
            </Overridable>
          </Tab.Pane>
        ),
      },
      {
        menuItem: 'Content',
        render: () => (
          <Tab.Pane>
            <DocumentContent metadata={metadata} />
          </Tab.Pane>
        ),
      },
      {
        menuItem: 'Published in',
        render: () => (
          <DocumentPublicationInfo publications={metadata.publication_info} />
        ),
      },
      {
        menuItem: 'Conferences',
        render: () => (
          <Tab.Pane>
            <DocumentConference conference={metadata.conference_info} />
          </Tab.Pane>
        ),
      },
      {
        menuItem: 'Notes',
        render: () => (
          <Tab.Pane>
            <LiteratureNotes content={metadata.note} />
          </Tab.Pane>
        ),
      },
      {
        menuItem: 'Resources',
        render: () => (
          <Tab.Pane>
            <DocumentEItemUrls dividers eitems={metadata.eitems} />
          </Tab.Pane>
        ),
      },
      {
        menuItem: 'Licenses & copyrights',
        render: () => (
          <Tab.Pane>
            <DocumentCopyrights metadata={metadata} />
          </Tab.Pane>
        ),
      },
    ];

    const { extensions = {} } = metadata;
    if (
      !_isEmpty(extensions) &&
      !_isEmpty(invenioConfig.DOCUMENTS.extensions.fields)
    ) {
      panes.push({
        menuItem: invenioConfig.DOCUMENTS.extensions.label,
        render: () => (
          <Tab.Pane>
            <Overridable
              id="DocumentMetadataTabs.Extensions"
              extensions={extensions}
            />

            <LiteratureMetadataExtensions
              metadataExtensions={extensions}
              configuredExtensions={invenioConfig.DOCUMENTS.extensions}
            />
          </Tab.Pane>
        ),
      });
    }
    return panes;
  };

  onTabChange = (event, { activeIndex }) => {
    const { showTab } = this.props;
    showTab(activeIndex);
  };

  render() {
    const { activeTab } = this.props;
    return (
      <Tab
        activeIndex={activeTab}
        menu={{ secondary: true, pointing: true }}
        panes={this.renderTabPanes()}
        onTabChange={this.onTabChange}
        id="document-metadata-section"
        className="document-metadata-tabs"
      />
    );
  }
}

DocumentMetadataTabs.propTypes = {
  activeTab: PropTypes.number,
  metadata: PropTypes.object.isRequired,
  showTab: PropTypes.func.isRequired,
};

DocumentMetadataTabs.defaultProps = {
  activeTab: 0,
};

export default Overridable.component(
  'DocumentMetadataTabs',
  DocumentMetadataTabs
);
