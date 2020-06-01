import _isEmpty from 'lodash/isEmpty';
import _truncate from 'lodash/truncate';
import PropTypes from 'prop-types';
import React from 'react';
import { List } from 'semantic-ui-react';

const Url = ({ truncate, url }) => {
  const description = url.description || url.value;
  return (
    <a href={url.value}>
      {truncate ? _truncate(description, { length: 35 }) : description}{' '}
    </a>
  );
};

Url.propTypes = {
  truncate: PropTypes.bool,
  url: PropTypes.shape({
    description: PropTypes.string,
    value: PropTypes.string.isRequired,
  }).isRequired,
};

Url.defaultProps = {
  truncate: false,
};

export class SeriesUrls extends React.Component {
  render() {
    const { urls, truncate } = this.props;
    return _isEmpty(urls) ? (
      <p>There are no URLs.</p>
    ) : (
      <List bulleted>
        {urls.map((url, index) => (
          <List.Item key={url}>
            <Url truncate={truncate} url={url} />
          </List.Item>
        ))}
      </List>
    );
  }
}

SeriesUrls.propTypes = {
  urls: PropTypes.array,
  truncate: PropTypes.bool,
};

SeriesUrls.defaultProps = {
  urls: [],
  truncate: false,
};
