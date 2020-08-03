import { recordToPidType } from '@api/utils';
import { DocumentCard } from '@modules/Document/DocumentCard';
import { SeriesCard } from '@modules/Series/SeriesCard';
import { findVolume } from '@modules/Series/utils';
import PropTypes from 'prop-types';
import React from 'react';
import { Card, Responsive } from 'semantic-ui-react';

export const LiteratureSearchResultsGrid = ({
  results,
  overridableId,
  parentPid,
}) => {
  const cards = results.map(result => {
    const volume = findVolume(result, parentPid);
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

LiteratureSearchResultsGrid.propTypes = {
  results: PropTypes.array.isRequired,
  overridableId: PropTypes.string,
  parentPid: PropTypes.string,
};

LiteratureSearchResultsGrid.defaultProps = {
  overridableId: '',
  parentPid: '',
};
