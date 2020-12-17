import React from 'react';
import { Item } from 'semantic-ui-react';
import { DocumentListEntry } from '@modules/Document/DocumentListEntry';
import SeriesListEntry from '@modules/Series/SeriesListEntry';
import { recordToPidType } from '@api/utils';
import PropTypes from 'prop-types';

export const LiteratureSearchResultsList = ({ results, overridableId }) => {
  return results && results.length ? (
    <Item.Group>
      {results.map((result) => {
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

LiteratureSearchResultsList.propTypes = {
  results: PropTypes.array.isRequired,
  overridableId: PropTypes.string,
};

LiteratureSearchResultsList.defaultProps = {
  overridableId: '',
};
