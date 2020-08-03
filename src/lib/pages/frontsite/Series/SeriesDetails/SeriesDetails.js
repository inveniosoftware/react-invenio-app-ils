import { AuthenticationGuard } from '@authentication/components/AuthenticationGuard';
import { Breadcrumbs } from '@components/Breadcrumbs';
import { Error } from '@components/Error';
import { ILSParagraphPlaceholder } from '@components/ILSPlaceholder';
import { SearchBar } from '@components/SearchBar';
import { goTo } from '@history';
import { SeriesLiteratureSearch } from '@modules/Series/SeriesLiteratureSearch';
import { BackOfficeRoutes, FrontSiteRoutes } from '@routes/urls';
import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React from 'react';
import Overridable from 'react-overridable';
import { Link } from 'react-router-dom';
import { Container, Grid, Icon, Responsive } from 'semantic-ui-react';
import { SeriesMetadata } from './SeriesMetadata';
import SeriesPanel from './SeriesPanel/SeriesPanel';
import { NotFound } from '@components/NotFound';

const SeriesDetailsLayout = ({ error, isLoading, series }) => {
  const breadcrumbs = () => [
    { to: FrontSiteRoutes.home, label: 'Home' },
    { to: FrontSiteRoutes.documentsList, label: 'Search' },
  ];
  return (
    <Overridable id="SeriesDetails.layout" {...{ error, isLoading, series }}>
      <Error boundary error={error}>
        <Container className="document-details-container default-margin-top">
          <ILSParagraphPlaceholder isLoading={isLoading} linesNumber={1}>
            <Grid columns={2}>
              <Grid.Column width={13}>
                <Breadcrumbs
                  isLoading={isLoading}
                  elements={breadcrumbs()}
                  currentElement={
                    series.metadata ? series.metadata.title : null
                  }
                />
              </Grid.Column>
              <Grid.Column width={3} textAlign="right">
                {!_isEmpty(series.metadata) && (
                  <AuthenticationGuard
                    silent
                    authorizedComponent={() => (
                      <Link
                        to={BackOfficeRoutes.seriesDetailsFor(
                          series.metadata.pid
                        )}
                      >
                        open in backoffice <Icon name="cogs" />
                      </Link>
                    )}
                    roles={['admin', 'librarian']}
                    loginComponent={() => <></>}
                  />
                )}
              </Grid.Column>
            </Grid>
          </ILSParagraphPlaceholder>

          <SeriesPanel isLoading={isLoading} series={series} />
        </Container>
        <Responsive minWidth={Responsive.onlyComputer.minWidth}>
          <Container className="items-locations spaced">
            <ILSParagraphPlaceholder linesNumber={3} isLoading={isLoading}>
              <SeriesLiteratureSearch metadata={series.metadata} />
            </ILSParagraphPlaceholder>
          </Container>
        </Responsive>
        <Responsive maxWidth={Responsive.onlyTablet.maxWidth}>
          <ILSParagraphPlaceholder linesNumber={3} isLoading={isLoading}>
            <SeriesLiteratureSearch metadata={series.metadata} />
          </ILSParagraphPlaceholder>
        </Responsive>
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
  onSearchClick = searchQuery => {
    const query = encodeURIComponent(searchQuery);
    goTo(FrontSiteRoutes.documentsListWithQuery(query));
  };

  render() {
    const { hasError, error, isLoading, series } = this.props;
    if (hasError && error.response.status === 404) {
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
              <SearchBar updateQueryString={this.onSearchClick} />
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
