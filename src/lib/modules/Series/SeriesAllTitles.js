import React from 'react';
import PropTypes from 'prop-types';
import { Divider, Table } from 'semantic-ui-react';
import { SeriesAlternativeTitles } from './SeriesAlternativeTitles';

export const SeriesAllTitles = ({ title, alternativeTitles }) => {
  return (
    <>
      <Divider horizontal>Titles</Divider>
      <Table definition>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Title</Table.Cell>
            <Table.Cell>{title}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <SeriesAlternativeTitles alternativeTitles={alternativeTitles} />
    </>
  );
};

SeriesAllTitles.propTypes = {
  title: PropTypes.string.isRequired,
  alternativeTitles: PropTypes.array,
};

SeriesAllTitles.defaultProps = {
  alternativeTitles: [],
};
