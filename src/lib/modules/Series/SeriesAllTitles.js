import React from 'react';
import PropTypes from 'prop-types';
import { Divider, Table } from 'semantic-ui-react';
import { SeriesAlternativeTitles } from './SeriesAlternativeTitles';

export const SeriesAllTitles = ({
  title,
  abbreviatedTitle,
  alternativeTitles,
}) => {
  return (
    <>
      <Divider horizontal>Main titles</Divider>
      <Table definition>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Title</Table.Cell>
            <Table.Cell>{title}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Abbreviated title</Table.Cell>
            <Table.Cell>{abbreviatedTitle}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <SeriesAlternativeTitles alternativeTitles={alternativeTitles} />
    </>
  );
};

SeriesAllTitles.propTypes = {
  title: PropTypes.string.isRequired,
  abbreviatedTitle: PropTypes.string,
  alternativeTitles: PropTypes.array,
};

SeriesAllTitles.defaultProps = {
  abbreviatedTitle: '',
  alternativeTitles: [],
};
