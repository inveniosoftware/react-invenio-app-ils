import { recordToPidType } from '@api/utils';
import { DocumentCard } from '@modules/Document/DocumentCard';
import { SeriesCard } from '@modules/Series/SeriesCard';
import { findVolume } from '@modules/Series/utils';
import get from 'lodash/get';
import React, { Component } from 'react';
import { ResultsGrid } from 'react-searchkit';
import { Card, Responsive } from 'semantic-ui-react';

export default class LiteratureSearchResultsGrid extends Component {
  renderResultsGrid = results => {
    // TODO: Change to use the pid object's pid_type when it's been implemented
    const cards = results.map(result => {
      const volume = findVolume(result, get(this.props, 'metadata.pid'));
      return recordToPidType(result) === 'docid' ? (
        <DocumentCard key={result.metadata.pid} data={result} volume={volume} />
      ) : (
        <SeriesCard key={result.metadata.pid} data={result} volume={volume} />
      );
    });
    return (
      <>
        <Responsive minWidth={Responsive.onlyLargeScreen.minWidth}>
          <Card.Group doubling stackable itemsPerRow={5}>
            {cards}
          </Card.Group>
        </Responsive>
        <Responsive maxWidth={Responsive.onlyLargeScreen.minWidth - 1}>
          <Card.Group doubling stackable itemsPerRow={3}>
            {cards}
          </Card.Group>
        </Responsive>
      </>
    );
  };

  render() {
    return <ResultsGrid renderElement={this.renderResultsGrid} />;
  }
}
