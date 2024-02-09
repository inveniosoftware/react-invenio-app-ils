import { InfoPopup } from '@components/InfoPopup';
import capitalize from 'lodash/capitalize';
import _isEmpty from 'lodash/isEmpty';
import _get from 'lodash/get';
import PropTypes from 'prop-types';
import React from 'react';
import { Divider, Table } from 'semantic-ui-react';

export const AlternativeTitle = ({ title }) => {
  const titleType = capitalize(
    _get(title, 'type', 'ALTERNATIVE_TITLE').replace('_', ' ')
  );
  return (
    <Table.Row>
      <Table.Cell width={4}>{titleType}</Table.Cell>
      <Table.Cell>
        {title.value}
        {title.language && (
          <InfoPopup message="Language of the title">
            {' '}
            ({title.language})
          </InfoPopup>
        )}
      </Table.Cell>
    </Table.Row>
  );
};

AlternativeTitle.propTypes = {
  title: PropTypes.shape({
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    language: PropTypes.string,
  }).isRequired,
};

export const SeriesAlternativeTitles = ({ alternativeTitles }) => {
  return (
    !_isEmpty(alternativeTitles) && (
      <>
        <Divider horizontal>Alternative titles</Divider>
        <Table definition>
          <Table.Body>
            {alternativeTitles.map((title) => (
              <AlternativeTitle title={title} key={title.type} />
            ))}
          </Table.Body>
        </Table>
      </>
    )
  );
};

SeriesAlternativeTitles.propTypes = {
  alternativeTitles: PropTypes.array,
};

SeriesAlternativeTitles.defaultProps = {
  alternativeTitles: [],
};
