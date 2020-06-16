import { uiConfig } from '@config';
import { DocumentMetadataExtensions } from '@modules/Document/DocumentMetadataExtensions';
import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Overridable from 'react-overridable';
import { Header, Tab } from 'semantic-ui-react';
import { DocumentContents } from './DocumentContents';
import { DocumentCopyrights } from './DocumentCopyrights';
import { DocumentExtras } from './DocumentExtras';
import { DocumentIdentifiers } from './DocumentIdentifiers';
import { DocumentMetadataGeneral } from './DocumentMetadataGeneral';
import { DocumentSystemInfo } from './DocumentSystemInfo';

export default class DocumentMetadata extends Component {
  panes = () => {
    const { documentDetails: document } = this.props;

    let panes = [
      {
        menuItem: 'Metadata',
        render: () => (
          <Tab.Pane attached="bottom">
            <DocumentMetadataGeneral document={document} />
          </Tab.Pane>
        ),
      },
      {
        menuItem: 'Identifiers',
        render: () => (
          <Tab.Pane>
            <DocumentIdentifiers document={document} />
          </Tab.Pane>
        ),
      },
      {
        menuItem: 'Contents',
        render: () => (
          <Tab.Pane>
            <DocumentContents document={document} />
          </Tab.Pane>
        ),
      },
      {
        menuItem: 'Notes',
        render: () => (
          <Tab.Pane>
            <Header as="h3">Public note</Header>
            <p>{document.metadata.note}</p>
          </Tab.Pane>
        ),
      },
      {
        menuItem: 'System info',
        render: () => (
          <Tab.Pane>
            <DocumentSystemInfo document={document} />
          </Tab.Pane>
        ),
      },
    ];
    if (
      !_isEmpty(document.metadata.copyrights) ||
      !_isEmpty(document.metadata.licenses)
    ) {
      panes.push({
        menuItem: 'Copyrights & licenses',
        render: () => (
          <Tab.Pane>
            <DocumentCopyrights document={document} />
          </Tab.Pane>
        ),
      });
    }

    if (
      !_isEmpty(document.metadata.publication_info) ||
      !_isEmpty(document.metadata.conference_info)
    ) {
      panes.push({
        menuItem: 'Other',
        render: () => (
          <Tab.Pane>
            <DocumentExtras document={document} />
          </Tab.Pane>
        ),
      });
    }
    const { extensions = {} } = document.metadata;
    if (
      !_isEmpty(extensions) &&
      !_isEmpty(uiConfig.extensions.document.fields)
    ) {
      panes.push({
        menuItem: uiConfig.extensions.document.label,
        render: () => (
          <Tab.Pane>
            <Overridable
              id="BackofficeDocumentMetadataTabs.Extensions"
              extensions={extensions}
            >
              <DocumentMetadataExtensions
                extensions={extensions}
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
