import React from 'react';
import PropTypes from 'prop-types';
import { Divider } from 'semantic-ui-react';
import { EmptyMessage } from '@components';
import isEmpty from 'lodash/isEmpty';

export const LiteratureNotes = ({ content }) => {
  return (
    <EmptyMessage
      show={!isEmpty(content)}
      message="There is no note from the library."
    >
      <Divider horizontal>Librarian's note</Divider>
      {content}
    </EmptyMessage>
  );
};

LiteratureNotes.propTypes = {
  content: PropTypes.string,
};

LiteratureNotes.defaultProps = {
  content: '',
};
