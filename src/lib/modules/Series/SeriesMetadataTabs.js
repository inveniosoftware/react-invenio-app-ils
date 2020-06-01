import { LiteratureNotes } from '@modules/Literature/LiteratureNotes';
import { LiteratureRelations } from '@modules/Literature/LiteratureRelations';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Overridable from 'react-overridable';
import { Tab } from 'semantic-ui-react';
import { Identifiers } from '@modules/Identifiers';
import { SeriesAllTitles } from './SeriesAllTitles';
import { SeriesInfo } from './SeriesInfo';
import { SeriesLinks } from './SeriesLinks';

class SeriesMetadataTabs extends Component {
  renderTabPanes = () => {
    const { metadata } = this.props;
    return [
      {
        menuItem: 'Details',
        render: () => (
          <Tab.Pane attached={false}>
            <LiteratureRelations relations={metadata.relations} />
            <SeriesInfo metadata={metadata} />
          </Tab.Pane>
        ),
      },
      {
        menuItem: 'Identifiers',
        render: () => (
          <Tab.Pane attached={false}>
            <Identifiers identifiers={metadata.identifiers} />
          </Tab.Pane>
        ),
      },
      {
        menuItem: 'Titles',
        render: () => (
          <Tab.Pane attached={false}>
            <SeriesAllTitles
              title={metadata.title}
              abbreviatedTitle={metadata.abbreviated_title}
              alternativeTitles={metadata.alternative_titles}
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
      {
        menuItem: 'Links',
        render: () => (
          <Tab.Pane attached={false}>
            <SeriesLinks
              accessUrls={metadata.access_urls}
              urls={metadata.urls}
            />
          </Tab.Pane>
        ),
      },
    ];
  };

  render() {
    return (
      <Tab
        menu={{ secondary: true, pointing: true }}
        panes={this.renderTabPanes()}
        id="series-metadata-tabs"
      />
    );
  }
}

SeriesMetadataTabs.propTypes = {
  metadata: PropTypes.object.isRequired,
};

export default Overridable.component('SeriesMetadataTabs', SeriesMetadataTabs);
