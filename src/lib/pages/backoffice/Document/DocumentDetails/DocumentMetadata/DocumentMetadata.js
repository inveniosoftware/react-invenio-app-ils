import { invenioConfig } from '@config';
import { DocumentExtras } from '@modules/Document/DocumentExtras';
import { LiteratureMetadataExtensions } from '@modules/Literature/LiteratureMetadataExtensions';
import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Overridable from 'react-overridable';
import { Tab } from 'semantic-ui-react';
import { DocumentContents } from './DocumentContents';
import { DocumentCopyrights } from './DocumentCopyrights';
import { DocumentCuration } from './DocumentCuration';
import { DocumentMetadataGeneral } from './DocumentMetadataGeneral';
import { DocumentPublishing } from './DocumentPublishing';
import { DocumentSystemInfo } from './DocumentSystemInfo';

export default class DocumentMetadata extends Component {
  panes = () => {
    const { documentDetails: document } = this.props;

    let panes = [
      {
        menuItem: 'Basic',
        render: () => (
          <Tab.Pane attached="bottom">
            <DocumentMetadataGeneral document={document} />
          </Tab.Pane>
        ),
      },
      {
        menuItem: 'Content',
        render: () => (
          <Tab.Pane>
            <DocumentContents document={document} />
          </Tab.Pane>
        ),
      },
      {
        menuItem: 'Curation & Cataloging',
        render: () => (
          <Tab.Pane>
            <DocumentCuration document={document} />
          </Tab.Pane>
        ),
      },
      {
        menuItem: 'Licenses & Copyrights',
        render: () => (
          <Tab.Pane>
            <DocumentCopyrights metadata={document.metadata} />
          </Tab.Pane>
        ),
      },
      {
        menuItem: 'Publishing',
        render: () => (
          <Tab.Pane>
            <DocumentPublishing document={document} />
          </Tab.Pane>
        ),
      },
      {
        menuItem: 'Other',
        render: () => (
          <Tab.Pane>
            <DocumentExtras metadata={document.metadata} />
          </Tab.Pane>
        ),
      },
      {
        menuItem: 'System',
        render: () => (
          <Tab.Pane>
            <DocumentSystemInfo document={document} />
          </Tab.Pane>
        ),
      },
    ];

    const { extensions = {} } = document.metadata;
    if (
      !_isEmpty(extensions) &&
      !_isEmpty(invenioConfig.DOCUMENTS.extensions.fields)
    ) {
      panes.push({
        menuItem: invenioConfig.DOCUMENTS.extensions.label,
        render: () => (
          <Tab.Pane>
            <Overridable
              id="BackofficeDocumentMetadataTabs.Extensions"
              extensions={extensions}
            >
              <LiteratureMetadataExtensions
                metadataExtensions={extensions}
                configuredExtensions={invenioConfig.DOCUMENTS.extensions}
                showDivider={false}
              />
            </Overridable>
          </Tab.Pane>
        ),
      });
    }
    return panes;
  };

  render() {
    return (
      <Tab
        className="bo-metadata-tab mb-20"
        menu={{ attached: 'top' }}
        panes={this.panes()}
        /* needed for DocumentActionMenu scroll */
        id="metadata"
      />
    );
  }
}

DocumentMetadata.propTypes = {
  documentDetails: PropTypes.object.isRequired,
};
