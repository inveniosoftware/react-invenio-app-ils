import { recordToPidType } from '@api/utils';
import { Media } from '@components/Media';
import { DocumentCard } from '@modules/Document/DocumentCard';
import { SeriesCard } from '@modules/Series/SeriesCard';
import PropTypes from 'prop-types';
import React from 'react';
import { Card } from 'semantic-ui-react';

export const DocumentSubjectGrid = ({ results }) => {
  const cards = results.map((result) => {
    return recordToPidType(result) === 'docid' ? (
      <DocumentCard key={result.metadata.pid} data={result} />
    ) : (
      <SeriesCard key={result.metadata.pid} data={result} />
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

DocumentSubjectGrid.propTypes = {
  results: PropTypes.array.isRequired,
};
