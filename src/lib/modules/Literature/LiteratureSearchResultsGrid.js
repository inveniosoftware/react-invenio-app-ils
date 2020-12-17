import { recordToPidType } from '@api/utils';
import { Media } from '@components/Media';
import { DocumentCard } from '@modules/Document/DocumentCard';
import { SeriesCard } from '@modules/Series/SeriesCard';
import { findVolume } from '@modules/Series/utils';
import PropTypes from 'prop-types';
import React from 'react';
import { Card } from 'semantic-ui-react';

export const LiteratureSearchResultsGrid = ({
  results,
  overridableId,
  parentPid,
}) => {
  const cards = results.map((result) => {
    const volume = findVolume(result, parentPid);
    return recordToPidType(result) === 'docid' ? (
      <DocumentCard key={result.metadata.pid} data={result} volume={volume} />
    ) : (
      <SeriesCard key={result.metadata.pid} data={result} volume={volume} />
    );
  });
  return (
    <>
      <Media greaterThanOrEqual="largeScreen">
        <Card.Group doubling stackable itemsPerRow={5}>
          {cards}
        </Card.Group>
      </Media>
      <Media lessThan="largeScreen">
        <Card.Group doubling stackable itemsPerRow={3}>
          {cards}
        </Card.Group>
      </Media>
    </>
  );
};

LiteratureSearchResultsGrid.propTypes = {
  results: PropTypes.array.isRequired,
  overridableId: PropTypes.string,
  parentPid: PropTypes.string,
};

LiteratureSearchResultsGrid.defaultProps = {
  overridableId: '',
  parentPid: '',
};
