import { InfoMessage } from '@components/backoffice/InfoMessage';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ShowMore from 'react-show-more';
import { Header, Tab } from 'semantic-ui-react';
import { SeriesIdentifiers } from '../SeriesIdentifiers';
import { SeriesSystemInfo } from '../SeriesSystemInfo';
import { SeriesMetadata } from './';

export default class SeriesMetadataTabs extends Component {
  panes = () => {
    const { series } = this.props;
    return [
      {
        menuItem: 'Metadata',
        render: () => (
          <Tab.Pane attached="bottom">
            <SeriesMetadata seriesDetails={series} />
          </Tab.Pane>
        ),
      },
      {
        menuItem: 'Identifiers',
        render: () => (
          <Tab.Pane>
            <SeriesIdentifiers series={series} />
          </Tab.Pane>
        ),
      },
      {
        menuItem: 'Contents',
        render: () => (
          <Tab.Pane>
            <Header as="h5">Abstract </Header>
            <ShowMore
              lines={10}
              more="Show more"
              less="Show less"
              anchorClass="button-show-more"
            >
              {series.metadata.abstract}
            </ShowMore>
          </Tab.Pane>
        ),
      },
      {
        menuItem: 'Notes',
        render: () => (
          <Tab.Pane>
            <Header as="h3">Public note</Header>
            <p>
              {series.metadata.note ? (
                series.metadata.note
              ) : (
                <InfoMessage
                  header="No public notes."
                  content="Edit document to add a note"
                />
              )}
            </p>
          </Tab.Pane>
        ),
      },
      {
        menuItem: 'System info',
        render: () => (
          <Tab.Pane>
            <SeriesSystemInfo series={series} />
          </Tab.Pane>
        ),
      },
    ];
  };

  render() {
    return (
      <Tab
        className="bo-metadata-tab mb-20"
        menu={{ attached: 'top' }}
        panes={this.panes()}
      />
    );
  }
}

SeriesMetadataTabs.propTypes = {
  series: PropTypes.object.isRequired,
};
