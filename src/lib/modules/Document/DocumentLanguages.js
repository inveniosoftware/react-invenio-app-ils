import React from 'react';
import Overridable from 'react-overridable';
import { List } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';

const DocumentLanguages = ({ metadata, separator, withLabel, listItemAs }) => {
  const languages = _get(metadata, 'languages', []);
  if (!languages.length) {
    return null;
  }

  return (
    <Overridable
      id="DocumentLanguages.layout"
      {...{ metadata, separator, withLabel, listItemAs }}
    >
      <>
        {withLabel && <label>languages </label>}
        <List horizontal className="document-languages-list">
          {languages.map((language, index) => {
            const separatorCmp =
              index < metadata.languages.length - 1 ? separator : null;
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
  metadata: PropTypes.object.isRequired,
  listItemAs: PropTypes.string,
  separator: PropTypes.string,
  withLabel: PropTypes.bool,
};

DocumentLanguages.defaultProps = {
  listItemAs: '',
  separator: ', ',
  withLabel: false,
};

export default Overridable.component('DocumentLanguages', DocumentLanguages);
