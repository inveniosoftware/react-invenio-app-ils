import { Error as IlsError } from '@components/Error';
import { SearchControlsMobile } from '@modules/SearchControls/SearchControlsMobile';
import SearchFooter from '@modules/SearchControls/SearchFooter';
import SearchPagination from '@modules/SearchControls/SearchPagination';
import React from 'react';
import {
  Error,
  ResultsGrid,
  ResultsLoader,
  EmptyResults,
} from 'react-searchkit';
import { Container, Ref, Sticky } from 'semantic-ui-react';

export class SeriesLiteratureSearchMobile extends React.Component {
  stickyRef = React.createRef();

  renderError = error => {
    return <IlsError error={error} />;
  };

  render() {
    return (
      <Container fluid className="grid-documents-search">
        <ResultsLoader>
          <EmptyResults />
          <Error renderElement={this.renderError} />
          <Ref innerRef={this.stickyRef}>
            <Container fluid>
              <Sticky context={this.stickyRef} offset={66}>
                <SearchControlsMobile
                  ref={this.stickyRef}
                  modelName="LITERATURE"
                />
              </Sticky>
              <Container textAlign="center">
                <SearchPagination />
              </Container>
              <Container className="fs-search-body" textAlign="center">
                <ResultsGrid overridableId="series_mobile" />
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

SeriesLiteratureSearchMobile.propTypes = {};
