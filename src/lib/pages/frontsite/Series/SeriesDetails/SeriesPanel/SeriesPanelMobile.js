import { ShowMoreContent } from '@components';
import {
  ILSHeaderPlaceholder,
  ILSParagraphPlaceholder,
} from '@components/ILSPlaceholder';
import { LiteratureCover } from '@modules/Literature/LiteratureCover';
import { SeriesAccess } from '@modules/Series/SeriesAccess';
import { SeriesAuthors } from '@modules/Series/SeriesAuthors';
import { SeriesTitle } from '@modules/Series/SeriesTitle';
import _get from 'lodash/get';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Overridable from 'react-overridable';
import { Grid, Header } from 'semantic-ui-react';

class SeriesPanelMobile extends Component {
  render() {
    const { isLoading, series } = this.props;
    return (
      <div
        className="series-panel"
        data-test={series.metadata ? series.metadata.pid : 0}
      >
        <Grid>
          <Grid.Row>
            <Grid.Column mobile={16} textAlign="center">
              <LiteratureCover
                size="medium"
                url={_get(series, 'metadata.cover_metadata.urls.medium')}
              />
              <ILSHeaderPlaceholder isLoading={isLoading} center="true">
                <SeriesTitle
                  title={series.metadata.title}
                  modeOfIssuance={series.metadata.mode_of_issuance}
                />
              </ILSHeaderPlaceholder>
              <ILSParagraphPlaceholder linesNumber={1} isLoading={isLoading}>
                <SeriesAuthors
                  prefix="by "
                  itemProps={{ as: 'h4' }}
                  authors={series.metadata.authors}
                />
              </ILSParagraphPlaceholder>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column mobile={16}>
              <SeriesAccess urls={series.metadata.access_urls} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column mobile={16}>
              <ILSParagraphPlaceholder linesNumber={5} isLoading={isLoading}>
                <Header as="h3" content="Abstract" />
                <ShowMoreContent lines={5} content={series.metadata.abstract} />
              </ILSParagraphPlaceholder>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

SeriesPanelMobile.propTypes = {
  series: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default Overridable.component('SeriesPanelMobile', SeriesPanelMobile);
