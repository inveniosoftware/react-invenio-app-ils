import { AuthenticationGuard } from '@authentication/components/AuthenticationGuard';
import { Breadcrumbs } from '@components/Breadcrumbs';
import { Error } from '@components/Error';
import { NotFound } from '@components/HttpErrors';
import { ILSParagraphPlaceholder } from '@components/ILSPlaceholder';
import { Media } from '@components/Media';
import { SearchBarILS } from '@components/SearchBar';
import { invenioConfig } from '@config';
import { goTo } from '@history';
import LiteratureTags from '@modules/Literature/LiteratureTags';
import { SeriesLiteratureSearch } from '@modules/Series/SeriesLiteratureSearch';
import { BackOfficeRoutes, FrontSiteRoutes } from '@routes/urls';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React from 'react';
import Overridable from 'react-overridable';
import { Link } from 'react-router-dom';
import { Container, Grid, Icon, Label } from 'semantic-ui-react';
import { PhysicalVolumes } from './PhysicalVolumes';
import { SeriesMetadata } from './SeriesMetadata';
import SeriesPanel from './SeriesPanel/SeriesPanel';

const SeriesDetailsLayout = ({ error, isLoading, series }) => {
  const breadcrumbs = () => [
    { to: FrontSiteRoutes.home, label: 'Home' },
    { to: FrontSiteRoutes.documentsList, label: 'Search' },
  ];
  console.log(series);
  return (
    <Overridable id="SeriesDetails.layout" {...{ error, isLoading, series }}>
      <Error boundary error={error}>
        <Container className="document-details-container default-margin-top">
          <ILSParagraphPlaceholder isLoading={isLoading} linesNumber={1}>
            <Grid columns={2}>
              <Grid.Column computer={13} tablet={13} mobile={16}>
                <Breadcrumbs
                  isLoading={isLoading}
                  elements={breadcrumbs()}
                  currentElement={
                    series.metadata ? series.metadata.title : null
                  }
                />
              </Grid.Column>
              <Grid.Column
                computer={3}
                tablet={3}
                mobile={16}
                textAlign="right"
              >
                {!_isEmpty(series.metadata) && (
                  <AuthenticationGuard
                    silent
                    authorizedComponent={() => (
                      <Label
                        as={Link}
                        to={BackOfficeRoutes.seriesDetailsFor(
                          series.metadata.pid
                        )}
                        color="grey"
                      >
                        <Icon name="cogs" />
                        Open in Backoffice
                      </Label>
                    )}
                    roles={['admin', 'librarian']}
                    loginComponent={() => null}
                  />
                )}
              </Grid.Column>
            </Grid>
          </ILSParagraphPlaceholder>

          <SeriesPanel isLoading={isLoading} series={series} />
        </Container>
        <Container className="series-tags spaced">
          <Media greaterThanOrEqual="tablet">
            <ILSParagraphPlaceholder linesNumber={1} isLoading={isLoading}>
              <LiteratureTags tags={series.metadata.tags} />
            </ILSParagraphPlaceholder>
          </Media>
        </Container>
        {series.metadata.physical_volumes && (
          <Media greaterThanOrEqual="computer">
            <ILSParagraphPlaceholder linesNumber={1} isLoading={isLoading}>
              <PhysicalVolumes metadata={series.metadata} />
            </ILSParagraphPlaceholder>
          </Media>
        )}
        <Media greaterThanOrEqual="computer">
          <Container className="items-locations spaced">
            <ILSParagraphPlaceholder linesNumber={3} isLoading={isLoading}>
              <SeriesLiteratureSearch metadata={series.metadata} />
            </ILSParagraphPlaceholder>
          </Container>
        </Media>
        <Media lessThan="computer">
          <ILSParagraphPlaceholder linesNumber={3} isLoading={isLoading}>
            <SeriesLiteratureSearch metadata={series.metadata} />
          </ILSParagraphPlaceholder>
        </Media>
        <Container className="section" fluid>
          <Container>
            <ILSParagraphPlaceholder linesNumber={20} isLoading={isLoading}>
              <SeriesMetadata />
            </ILSParagraphPlaceholder>
          </Container>
        </Container>
      </Error>
    </Overridable>
  );
};

SeriesDetailsLayout.propTypes = {
  series: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.object,
};

SeriesDetailsLayout.defaultProps = {
  error: null,
};

class SeriesDetails extends React.Component {
  componentDidMount() {
    const { match } = this.props;
    this.fetchSeriesDetails(match.params.seriesPid);
  }

  componentDidUpdate(prevProps) {
    const {
      match: {
        params: { seriesPid },
      },
    } = this.props;
    const samePidFromRouter = prevProps.match.params.seriesPid === seriesPid;
    if (!samePidFromRouter) {
      this.fetchSeriesDetails(seriesPid);
    }
  }

  fetchSeriesDetails(seriesPid) {
    const { fetchSeriesDetails } = this.props;
    fetchSeriesDetails(seriesPid);
  }

  /**
   * It replaces the updateSearchQuery behaviour of react-searchkit
   * @param searchQuery current search phrase
   */
  onSearchClick = (searchQuery) => {
    const query = encodeURIComponent(searchQuery);
    goTo(FrontSiteRoutes.documentsListWithQuery(query));
  };

  render() {
    const { hasError, error, isLoading, series } = this.props;
    if (hasError && _get(error, 'response.status') === 404) {
      return <NotFound />;
    }
    return (
      <>
        <Container fluid className="literature-search-container">
          <Overridable
            id="SeriesDetails.top"
            executeSearch={this.onSearchClick}
          >
            <Container>
              <SearchBarILS
                onPasteHandler={() => {}}
                onSearchHandler={this.onSearchClick}
                placeholder={invenioConfig.APP.HOME_SEARCH_BAR_PLACEHOLDER}
                className="fs-headline"
                responsiveAutofocus
              />
            </Container>
          </Overridable>
        </Container>
        <SeriesDetailsLayout {...{ series, error, isLoading }} />
      </>
    );
  }
}

SeriesDetails.propTypes = {
  /* redux */
  series: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  fetchSeriesDetails: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      seriesPid: PropTypes.string,
    }),
  }).isRequired,
  hasError: PropTypes.bool.isRequired,
  error: PropTypes.object,
};

SeriesDetails.defaultProps = {
  error: null,
};

export default Overridable.component('SeriesDetails', SeriesDetails);
