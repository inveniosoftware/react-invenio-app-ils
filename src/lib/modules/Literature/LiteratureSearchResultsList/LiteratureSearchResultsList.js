import React, { Component } from 'react';

import { Item } from 'semantic-ui-react';
import { DocumentListEntry } from '@modules/Document/DocumentListEntry';
import { SeriesListEntry } from '@modules/Series/SeriesListEntry';
import { ResultsList } from 'react-searchkit';
import { recordToPidType } from '@api/utils';

export default class LiteratureSearchResultsList extends Component {
  renderResultsList = results => {
    return results.length ? (
      <Item.Group>
        {results.map(result => {
          return recordToPidType(result) === 'docid' ? (
            <DocumentListEntry
              key={result.metadata.pid}
              data-test={result.metadata.pid}
              metadata={result.metadata}
            />
          ) : (
            <SeriesListEntry
              key={result.metadata.pid}
              data-test={result.metadata.pid}
              metadata={result.metadata}
            />
          );
        })}
      </Item.Group>
    ) : null;
  };

  render() {
    return <ResultsList renderElement={this.renderResultsList} />;
  }
}
