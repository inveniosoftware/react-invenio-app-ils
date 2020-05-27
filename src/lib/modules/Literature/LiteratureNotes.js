import { InfoMessage } from '@components';
import React from 'react';
import PropTypes from 'prop-types';
import { Divider } from 'semantic-ui-react';
import isEmpty from 'lodash/isEmpty';

export const LiteratureNotes = ({ content }) => {
  return (
    <InfoMessage
      show={!isEmpty(content)}
      message="There is no note from the library."
    >
      <Divider horizontal>Librarian's note</Divider>
      {content}
    </InfoMessage>
  );
};

LiteratureNotes.propTypes = {
  content: PropTypes.string,
};

LiteratureNotes.defaultProps = {
  content: '',
};
