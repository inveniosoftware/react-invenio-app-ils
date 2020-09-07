import { InfoMessage } from '@components/backoffice/InfoMessage';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ShowMore from 'react-show-more';
import { Header, Divider } from 'semantic-ui-react';
import LiteratureTags from '@modules/Literature/LiteratureTags';
import LiteratureKeywords from '@modules/Literature/LiteratureKeywords';
import _isEmpty from 'lodash/isEmpty';

export class SeriesContent extends Component {
  render() {
    const { series } = this.props;

    return series.metadata.abstract ||
      series.metadata.keywords ||
      series.metadata.keywords ? (
      <>
        <Header as="h3">Abstract </Header>
        <ShowMore
          lines={10}
          more="Show more"
          less="Show less"
          anchorClass="button-show-more"
        >
          {series.metadata.abstract}
        </ShowMore>
        {!_isEmpty(series.metadata.tags) && (
          <>
            <Divider />
            <Header as="h3">Tags</Header>
            <LiteratureTags
              isBackOffice
              size="mini"
              tags={series.metadata.tags}
            />
          </>
        )}

        {!_isEmpty(series.metadata.keywords) && (
          <>
            <Divider />
            <Header as="h3">Keywords</Header>
            <br />
            <LiteratureKeywords keywords={series.metadata.keywords} />
          </>
        )}
      </>
    ) : (
      <InfoMessage
        header="No stored content."
        content="Edit series to add content"
      />
    );
  }
}

SeriesContent.propTypes = {
  series: PropTypes.object.isRequired,
};
