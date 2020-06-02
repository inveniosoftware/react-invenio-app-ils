import { Error as IlsError } from '@components/Error';
import LiteratureSearchResultsGrid from '@modules/Literature/LiteratureSearchResultsGrid';
import { SearchControlsMobile } from '@modules/SearchControls/SearchControlsMobile';
import SearchEmptyResults from '@modules/SearchControls/SearchEmptyResults';
import SearchFooter from '@modules/SearchControls/SearchFooter';
import SearchPagination from '@modules/SearchControls/SearchPagination';
import PropTypes from 'prop-types';
import React from 'react';
import { Error, ResultsLoader } from 'react-searchkit';
import { Container, Ref, Sticky } from 'semantic-ui-react';

export class SeriesLiteratureSearchMobile extends React.Component {
  stickyRef = React.createRef();

  renderError = error => {
    return <IlsError error={error} />;
  };

  render() {
    const { metadata } = this.props;
    return (
      <Container fluid className="grid-documents-search">
        <ResultsLoader>
          <SearchEmptyResults />
          <Error renderElement={this.renderError} />
          <Ref innerRef={this.stickyRef}>
            <Container fluid>
              <Sticky context={this.stickyRef} offset={66}>
                <SearchControlsMobile
                  ref={this.stickyRef}
                  modelName="literature"
                />
              </Sticky>
              <Container textAlign="center">
                <SearchPagination />
              </Container>
              <Container className="fs-search-body" textAlign="center">
                <LiteratureSearchResultsGrid metadata={metadata} />
                <Container fluid className="search-results-footer">
                  <SearchFooter />
                </Container>
              </Container>
            </Container>
          </Ref>
        </ResultsLoader>
      </Container>
    );
  }
}

SeriesLiteratureSearchMobile.propTypes = {
  metadata: PropTypes.object.isRequired,
};
