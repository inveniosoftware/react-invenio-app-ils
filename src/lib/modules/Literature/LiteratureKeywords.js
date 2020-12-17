import React from 'react';
import Overridable from 'react-overridable';
import PropTypes from 'prop-types';
import _get from 'lodash/get';

const LiteratureKeywords = ({ keywords, separator, noneMessage }) => {
  function displayKeyword(keywordValue, keywordSource) {
    return keywordValue && keywordSource
      ? `${keywordValue} (${keywordSource})`
      : keywordValue
      ? keywordValue
      : '';
  }

  return (
    <Overridable
      id="LiteratureKeywords.layout"
      {...{ keywords, separator, noneMessage }}
    >
      <>
        {_get(keywords, 'length', 0) > 0
          ? keywords
              .map((keyword) => displayKeyword(keyword.value, keyword.source))
              .join(separator)
          : noneMessage}
      </>
    </Overridable>
  );
};

LiteratureKeywords.propTypes = {
  keywords: PropTypes.array,
  separator: PropTypes.string,
  noneMessage: PropTypes.string,
};

LiteratureKeywords.defaultProps = {
  keywords: [],
  separator: ', ',
  noneMessage: '',
};

export default Overridable.component('LiteratureKeywords', LiteratureKeywords);
