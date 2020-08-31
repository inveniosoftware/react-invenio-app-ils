import React from 'react';
import Overridable from 'react-overridable';
import { List } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const DocumentLanguages = ({ languages, separator, withLabel, listItemAs }) => {
  if (!languages || !languages.length) {
    return null;
  }

  return (
    <Overridable
      id="DocumentLanguages.layout"
      {...{ languages, separator, withLabel, listItemAs }}
    >
      <>
        {withLabel && <label>languages </label>}
        <List horizontal className="document-languages-list">
          {languages.map((language, index) => {
            const separatorCmp =
              index < languages.length - 1 ? separator : null;
            return (
              <List.Item as={listItemAs} key={`Key${index}`}>
                {language.toUpperCase()}
                {separatorCmp}
              </List.Item>
            );
          })}
        </List>
      </>
    </Overridable>
  );
};

DocumentLanguages.propTypes = {
  languages: PropTypes.array,
  listItemAs: PropTypes.string,
  separator: PropTypes.string,
  withLabel: PropTypes.bool,
};

DocumentLanguages.defaultProps = {
  languages: [],
  listItemAs: '',
  separator: ', ',
  withLabel: false,
};

export default Overridable.component('DocumentLanguages', DocumentLanguages);
