import { invenioConfig } from '@config';
import { SeriesMetadataExtensions } from '@modules/Series/SeriesMetadataExtensions';
import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Overridable from 'react-overridable';
import { Tab } from 'semantic-ui-react';
import { SeriesContent } from '../SeriesContent';
import { SeriesNotes } from '../SeriesNotes';
import { SeriesPublication } from '../SeriesPublication';
import { SeriesSystemInfo } from '../SeriesSystemInfo';
import { SeriesUrls } from '../SeriesUrls';
import { SeriesMetadata } from './';

export default class SeriesMetadataTabs extends Component {
  panes = () => {
    const { series } = this.props;
    const panes = [
      {
        menuItem: 'Basic',
        render: () => (
          <Tab.Pane attached="bottom">
            <SeriesMetadata seriesDetails={series} />
          </Tab.Pane>
        ),
      },
      {
        menuItem: 'Publication',
        render: () => (
          <Tab.Pane>
            <SeriesPublication seriesDetails={series} />
          </Tab.Pane>
        ),
      },
      {
        menuItem: 'Urls',
        render: () => (
          <Tab.Pane>
            <SeriesUrls series={series} />
          </Tab.Pane>
        ),
      },
      {
        menuItem: 'Contents',
        render: () => (
          <Tab.Pane>
            <SeriesContent series={series} />
          </Tab.Pane>
        ),
      },
      {
        menuItem: 'Notes',
        render: () => (
          <Tab.Pane>
            <SeriesNotes series={series} />
          </Tab.Pane>
        ),
      },
      {
        menuItem: 'System',
        render: () => (
          <Tab.Pane>
            <SeriesSystemInfo series={series} />
          </Tab.Pane>
        ),
      },
    ];
    const { extensions = {} } = series.metadata;
    if (
      !_isEmpty(extensions) &&
      !_isEmpty(invenioConfig.SERIES.extensions.fields)
    ) {
      panes.push({
        menuItem: invenioConfig.SERIES.extensions.label,
        render: () => (
          <Tab.Pane>
            <Overridable
              id="BackofficeSeriesMetadataTabs.Extensions"
              extensions={extensions}
            >
              <SeriesMetadataExtensions
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
      />
    );
  }
}

SeriesMetadataTabs.propTypes = {
  series: PropTypes.object.isRequired,
};
