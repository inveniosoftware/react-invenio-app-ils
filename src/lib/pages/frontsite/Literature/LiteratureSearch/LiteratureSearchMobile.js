import { SearchControlsMobile } from '@modules/SearchControls/SearchControlsMobile';
import SearchEmptyResults from '@modules/SearchControls/SearchEmptyResults';
import SearchFooter from '@modules/SearchControls/SearchFooter';
import SearchPagination from '@modules/SearchControls/SearchPagination';
import React, { Component, createRef } from 'react';
import Overridable from 'react-overridable';
import { Container, Ref, Sticky } from 'semantic-ui-react';
import { ResultsLoader, Error } from 'react-searchkit';
import SearchMessage from './SearchMessage/SearchMessage';
import LiteratureSearchResultsGrid from '@modules/Literature/LiteratureSearchResultsGrid';

class LiteratureSearchMobile extends Component {
  stickyRef = createRef();

  render() {
    return (
      <Overridable
        id="LiteratureSearchMobile.layout"
        stickyRef={this.stickyRef}
      >
        <Container fluid className="grid-documents-search">
          <ResultsLoader>
            <SearchEmptyResults />
            <Error />
            <Ref innerRef={this.stickyRef}>
              <Container fluid>
                <Overridable id="LiteratureSearchMobile.Controls">
                  <>
                    <Sticky context={this.stickyRef} offset={66}>
                      <SearchControlsMobile
                        ref={this.stickyRef}
                        modelName="documents"
                      />
                    </Sticky>
                    <Container textAlign="center">
                      <SearchPagination />
                    </Container>
                  </>
                </Overridable>

                <Overridable id="LiteratureSearchMobile.Body">
                  <Container className="fs-search-body" textAlign="center">
                    <LiteratureSearchResultsGrid />

                    <Overridable id="LiteratureSearchMobile.Footer">
                      <Container fluid className="search-results-footer">
                        <SearchFooter />
                        <Container className="search-results-message">
                          <SearchMessage />
                        </Container>
                      </Container>
                    </Overridable>
                  </Container>
                </Overridable>
              </Container>
            </Ref>
          </ResultsLoader>
        </Container>
      </Overridable>
    );
  }
}

export default Overridable.component(
  'LiteratureSearchMobile',
  LiteratureSearchMobile
);
