import { ShowMoreContent } from '@components/ShowMoreContent';
import {
  ILSHeaderPlaceholder,
  ILSParagraphPlaceholder,
} from '@components/ILSPlaceholder';
import LiteratureCover from '@modules/Literature/LiteratureCover';
import { SeriesAccess } from '@modules/Series/SeriesAccess';
import { SeriesAuthors } from '@modules/Series/SeriesAuthors';
import { SeriesTitle } from '@modules/Series/SeriesTitle';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Overridable from 'react-overridable';
import { Grid, Responsive } from 'semantic-ui-react';
import SeriesPanelMobile from './SeriesPanelMobile';
import SeriesSequences from './SeriesSequences';

class SeriesPanel extends Component {
  render() {
    const { isLoading, series } = this.props;
    return (
      <>
        <Responsive minWidth={Responsive.onlyTablet.minWidth}>
          <div
            className="series-panel"
            data-test={series.metadata ? series.metadata.pid : 0}
          >
            <Grid>
              <Grid.Row>
                <Grid.Column width={5}>
                  <LiteratureCover
                    url={_get(series, 'metadata.cover_metadata.urls.large')}
                  />
                </Grid.Column>
                <Grid.Column width={6}>
                  <ILSHeaderPlaceholder isLoading={isLoading}>
                    {!_isEmpty(series.metadata) && (
                      <SeriesTitle
                        title={series.metadata.title}
                        subtitle={
                          !_isEmpty(series.metadata.alternative_titles)
                            ? series.metadata.alternative_titles
                                .filter(e => e.type === 'SUBTITLE')
                                .map(e => e.value)
                                .find(() => true)
                            : null
                        }
                        modeOfIssuance={series.metadata.mode_of_issuance}
                      />
                    )}
                  </ILSHeaderPlaceholder>
                  <ILSParagraphPlaceholder
                    linesNumber={1}
                    isLoading={isLoading}
                  >
                    <SeriesAuthors
                      prefix="by "
                      itemProps={{ as: 'h4' }}
                      authors={series.metadata.authors}
                    />
                  </ILSParagraphPlaceholder>
                  <ILSParagraphPlaceholder
                    linesNumber={20}
                    isLoading={isLoading}
                  >
                    <ShowMoreContent
                      lines={20}
                      content={series.metadata.abstract}
                    />
                  </ILSParagraphPlaceholder>
                </Grid.Column>
                <Grid.Column width={5}>
                  <SeriesAccess urls={series.metadata.access_urls} />
                  {!_isEmpty(series.metadata.relations) && (
                    <SeriesSequences relations={series.metadata.relations} />
                  )}
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>
        </Responsive>
        <Responsive {...Responsive.onlyMobile}>
          <SeriesPanelMobile />
        </Responsive>
      </>
    );
  }
}

SeriesPanel.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  series: PropTypes.object.isRequired,
};

export default Overridable.component('SeriesPanel', SeriesPanel);
