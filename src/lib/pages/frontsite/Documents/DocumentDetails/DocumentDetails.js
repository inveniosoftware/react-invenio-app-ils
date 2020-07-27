import { documentApi } from '@api/documents';
import { AuthenticationGuard } from '@authentication/components/AuthenticationGuard';
import { Breadcrumbs } from '@components/Breadcrumbs';
import { Error } from '@components/Error';
import { ILSParagraphPlaceholder } from '@components/ILSPlaceholder';
import { SearchBar } from '@components/SearchBar';
import { goTo } from '@history';
import DocumentTags from '@modules/Document/DocumentTags';
import { BackOfficeRoutes, FrontSiteRoutes } from '@routes/urls';
import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Overridable from 'react-overridable';
import { Link } from 'react-router-dom';
import { Container, Grid, Icon, Responsive } from 'semantic-ui-react';
import { DocumentItems } from './DocumentItems';
import { DocumentMetadata } from './DocumentMetadata';
import DocumentPanel from './DocumentPanel/DocumentPanel';
import { NotFound } from '@components/NotFound';

const DocumentDetailsLayout = ({ error, isLoading, documentDetails }) => {
  const breadcrumbs = () => [
    { to: FrontSiteRoutes.home, label: 'Home' },
    { to: FrontSiteRoutes.documentsList, label: 'Search' },
  ];
  return (
    <Overridable
      id="DocumentDetails.layout"
      {...{
        error,
        isLoading,
        documentDetails,
      }}
    >
      <Error boundary error={error}>
        <Container className="document-details-container default-margin-top">
          <Grid columns={2}>
            <Grid.Column computer={13} tablet={13} mobile={16}>
              <ILSParagraphPlaceholder isLoading={isLoading} linesNumber={1}>
                <Breadcrumbs
                  isLoading={isLoading}
                  elements={breadcrumbs()}
                  currentElement={
                    documentDetails.metadata
                      ? documentDetails.metadata.title
                      : null
                  }
                />
              </ILSParagraphPlaceholder>
            </Grid.Column>
            <Grid.Column computer={3} tablet={3} mobile={16} textAlign="right">
              {!_isEmpty(documentDetails.metadata) && (
                <AuthenticationGuard
                  silent
                  authorizedComponent={() => (
                    <Link
                      to={BackOfficeRoutes.documentDetailsFor(
                        documentDetails.metadata.pid
                      )}
                    >
                      open in backoffice <Icon name="cogs" />
                    </Link>
                  )}
                  roles={['admin', 'librarian']}
                  loginComponent={() => null}
                />
              )}
            </Grid.Column>
          </Grid>
          <DocumentPanel
            isLoading={isLoading}
            documentDetails={documentDetails}
          />
        </Container>
        <Container className="document-tags spaced">
          <Responsive minWidth={Responsive.onlyTablet.minWidth}>
            <ILSParagraphPlaceholder linesNumber={1} isLoading={isLoading}>
              <DocumentTags metadata={documentDetails.metadata} />
            </ILSParagraphPlaceholder>
          </Responsive>
        </Container>
        <Container className="items-locations spaced">
          <ILSParagraphPlaceholder linesNumber={3} isLoading={isLoading}>
            <DocumentItems />
          </ILSParagraphPlaceholder>
        </Container>
        <Container className="section" fluid>
          <Container>
            <ILSParagraphPlaceholder linesNumber={20} isLoading={isLoading}>
              <DocumentMetadata />
            </ILSParagraphPlaceholder>
          </Container>
        </Container>
      </Error>
    </Overridable>
  );
};

DocumentDetailsLayout.propTypes = {
  documentDetails: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.object,
};

DocumentDetailsLayout.defaultProps = {
  error: null,
};

class DocumentDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { searchQuery: '' };
  }

  componentDidMount() {
    const { match } = this.props;
    this.fetchDocumentsDetails(match.params.documentPid);
  }

  componentDidUpdate(prevProps) {
    const {
      match: {
        params: { documentPid },
      },
    } = this.props;
    const samePidFromRouter =
      prevProps.match.params.documentPid === documentPid;
    if (!samePidFromRouter) {
      this.fetchDocumentsDetails(documentPid);
    }
  }

  fetchDocumentsDetails(documentPid) {
    const { fetchDocumentsDetails } = this.props;
    fetchDocumentsDetails(documentPid);

    this.documentViewed();
  }

  documentViewed = async () => {
    const { match } = this.props;
    try {
      await documentApi.viewEvent(match.params.documentPid);
    } catch (error) {
      console.warn('Error sending record-view event', error);
    }
  };

  onSearchClick = () => {
    const { searchQuery } = this.state;
    const query = encodeURIComponent(searchQuery);
    goTo(FrontSiteRoutes.documentsListWithQuery(query));
  };

  onSearchInputChange = (value, event) => {
    this.setState({ searchQuery: event.target.value });
  };

  render() {
    const { isLoading, hasError, error, documentDetails } = this.props;
    const { searchQuery } = this.state;
    if (hasError && error.response.status === 404) {
      return <NotFound />;
    }
    return (
      <>
        <Overridable
          id="DocumentDetails.top"
          searchQuery={searchQuery}
          currentQueryString={searchQuery}
          onInputChange={this.onSearchInputChange}
          executeSearch={this.onSearchClick}
        >
          <Container fluid className="literature-search-container">
            <Container>
              <SearchBar
                currentQueryString={searchQuery}
                onInputChange={this.onSearchInputChange}
                executeSearch={this.onSearchClick}
                placeholder="Search for literatures..."
              />
            </Container>
          </Container>
        </Overridable>
        <DocumentDetailsLayout
          {...{
            error,
            isLoading,
            documentDetails,
          }}
        />
      </>
    );
  }
}

DocumentDetails.propTypes = {
  fetchDocumentsDetails: PropTypes.func.isRequired,
  documentDetails: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired,
  error: PropTypes.object,
  match: PropTypes.shape({
    params: PropTypes.shape({
      documentPid: PropTypes.string,
    }),
  }).isRequired,
};

DocumentDetails.defaultProps = {
  error: null,
};

export default Overridable.component('DocumentDetails', DocumentDetails);
