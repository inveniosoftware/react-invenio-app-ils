import { AuthenticationGuard } from '@authentication/components/AuthenticationGuard';
import { Error } from '@components/Error';
import { SearchBar } from '@components/SearchBar';
import { ILSParagraphPlaceholder } from '@components/ILSPlaceholder';
import { goTo } from '@history';
import { Breadcrumbs } from '@components/Breadcrumbs';
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

const SeriesDetailsLayout = ({ error, isLoading, series }) => {
  const breadcrumbs = () => [
    { to: FrontSiteRoutes.home, label: 'Home' },
    { to: FrontSiteRoutes.documentsList, label: 'Search' },
  ];

  return (
    <Overridable id="SeriesDetails.layout" {...{ error, isLoading, series }}>
      <Error boundary error={error}>
        <Container className="document-details-container default-margin-top">
          <ILSParagraphPlaceholder isLoading={isLoading} lines={1}>
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

          <SeriesPanel isLoading={isLoading} seriesDetails={SeriesDetails} />
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
  error: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

class SeriesDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
    };
  }

  componentDidMount() {
    this.fetchSeriesDetails(this.props.match.params.seriesPid);
  }

  componentDidUpdate(prevProps) {
    const seriesPid = this.props.match.params.seriesPid;
    const samePidFromRouter = prevProps.match.params.seriesPid === seriesPid;
    if (!samePidFromRouter) {
      this.fetchSeriesDetails(seriesPid);
    }
  }

  fetchSeriesDetails(seriesPid) {
    const { fetchSeriesDetails } = this.props;
    fetchSeriesDetails(seriesPid);
  }

  onSearchClick = () => {
    const { searchQuery } = this.state;
    const query = encodeURIComponent(searchQuery);
    goTo(FrontSiteRoutes.documentsListWithQuery(query));
  };

  onSearchInputChange = (value, event) => {
    this.setState({ searchQuery: event.target.value });
  };

  render() {
    const { error, isLoading, series } = this.props;
    const { searchQuery } = this.state;
    return (
      <>
        <Container fluid className="document-details-search-container">
          <Overridable id="SeriesDetails.top">
            <Container>
              <SearchBar
                currentQueryString={searchQuery}
                onInputChange={this.onSearchInputChange}
                executeSearch={this.onSearchClick}
                placeholder="Search for books..."
                className="document-details-search-bar"
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
  error: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  fetchSeriesDetails: PropTypes.func.isRequired,
};

export default Overridable.component('SeriesDetails', SeriesDetails);
