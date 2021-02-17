import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React from 'react';
import { Divider } from 'semantic-ui-react';

export const LiteratureNotes = ({ content }) => {
  return (
    <>
      <Divider horizontal>Extra notes</Divider>
      {_isEmpty(content) ? `No extra notes` : content}
    </>
  );
};

LiteratureNotes.propTypes = {
  content: PropTypes.string,
};

LiteratureNotes.defaultProps = {
  content: '',
};
