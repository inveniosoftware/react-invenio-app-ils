import LiteratureRelations from '@modules/Literature/LiteratureRelations';
import { LiteratureNotes } from '@modules/Literature/LiteratureNotes';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Overridable from 'react-overridable';
import { Tab } from 'semantic-ui-react';
import { Identifiers } from '@modules/Identifiers';
import { DocumentConference } from '@modules/Document/DocumentConference';
import { DocumentLinks } from '@modules/Document/DocumentLinks';
import { DocumentTableOfContent } from '@modules/Document/DocumentTableOfContent';
import { DocumentInfo } from '@modules/Document/DocumentInfo';

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
            <Identifiers identifiers={identifiers.concat(altIdentifiers)} />
          </Tab.Pane>
        ),
      },
      {
        menuItem: 'Content',
        render: () => (
          <Tab.Pane>
            <DocumentTableOfContent
              toc={metadata.table_of_content}
              abstract={metadata.abstract}
            />
          </Tab.Pane>
        ),
      },
      {
        menuItem: 'Publications',
        render: () => <Tab.Pane>We wait for the schema!</Tab.Pane>,
      },
      {
        menuItem: 'Conference',
        render: () => (
          <Tab.Pane>
            <DocumentConference
              conference={metadata.conference_info}
              documentType={metadata.document_type}
            />
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
    ];

    const { eitems = {} } = metadata;
    if (_get(eitems, 'total', 0) > 0) {
      panes.push({
        menuItem: 'Files',
        render: () => (
          <Tab.Pane>
            <DocumentLinks dividers eitems={eitems} />
          </Tab.Pane>
        ),
      });
    }

    const extensions = _get(metadata, 'extensions', {});
    if (!_isEmpty(extensions)) {
      panes.push({
        menuItem: 'Extensions',
        render: () => (
          <Tab.Pane>
            <Overridable
              id="DocumentMetadata.extensions.layout"
              extensions={extensions}
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
        id="document-metadata-tabs"
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
