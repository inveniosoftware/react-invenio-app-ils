import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Header, Divider } from 'semantic-ui-react';
import LiteratureTags from '@modules/Literature/LiteratureTags';
import LiteratureKeywords from '@modules/Literature/LiteratureKeywords';
import _isEmpty from 'lodash/isEmpty';
import { SeriesPhysicalVolumes } from '../SeriesPhysicalVolumes';
import { ShowMoreContent } from '../../../../../components/ShowMoreContent/ShowMoreContent';

export class SeriesContent extends Component {
  render() {
    const { series } = this.props;
    return (
      <>
        <Header as="h3">Abstract </Header>
        {!_isEmpty(series.metadata.abstract) ? (
          <ShowMoreContent content={series.metadata.abstract} lines={10} />
        ) : (
          'There is no abstract'
        )}
        <Divider />
        <Header as="h3">Tags</Header>
        <LiteratureTags size="mini" tags={series.metadata.tags} />

        <Divider />
        <Header as="h3">Keywords</Header>
        <LiteratureKeywords
          keywords={series.metadata.keywords}
          noneMessage="No keywords"
        />

        <Divider />
        <Header as="h3">Volumes description</Header>
        {!_isEmpty(series.metadata.physical_volumes) ? (
          <SeriesPhysicalVolumes
            physicalVolumes={series.metadata.physical_volumes}
          />
        ) : (
          'There is no volumes description'
        )}
      </>
    );
  }
}

SeriesContent.propTypes = {
  series: PropTypes.object.isRequired,
};
