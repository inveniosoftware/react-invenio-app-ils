import { LiteratureRelations, LiteratureNotes } from '@modules/Literature';
import _get from 'lodash/get';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Overridable from 'react-overridable';
import { Tab } from 'semantic-ui-react';
import { Identifiers } from '@modules/Identifiers';
import { DocumentConference } from '@modules/Document';
import { DocumentLinks } from '@modules/Document';
import { DocumentTableOfContent } from '@modules/Document';
import { DocumentInfo } from '@modules/Document';

class DocumentMetadataTabs extends Component {
  renderTabPanes = () => {
    const { metadata } = this.props;
    const identifiers = _get(metadata, 'identifiers', []);
    const altIdentifiers = _get(metadata, 'alternative_identifiers', []);
    const panes = [
      {
        menuItem: 'Details',
        render: () => (
          <Tab.Pane attached={false}>
            <LiteratureRelations relations={metadata.relations} />
            <DocumentInfo metadata={metadata} />
          </Tab.Pane>
        ),
      },
      {
        menuItem: 'Identifiers',
        render: () => (
          <Tab.Pane attached={false}>
            <Identifiers identifiers={identifiers.concat(altIdentifiers)} />
          </Tab.Pane>
        ),
      },
      {
        menuItem: 'Content',
        render: () => (
          <Tab.Pane attached={false}>
            <DocumentTableOfContent
              toc={metadata.table_of_content}
              abstract={metadata.abstract}
            />
          </Tab.Pane>
        ),
      },
      {
        menuItem: 'Publications',
        render: () => (
          <Tab.Pane attached={false}>We wait for the schema!</Tab.Pane>
        ),
      },
      {
        menuItem: 'Conference',
        render: () => (
          <Tab.Pane attached={false}>
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
          <Tab.Pane attached={false}>
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
          <Tab.Pane attached={false}>
            <DocumentLinks dividers eitems={eitems} />
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
