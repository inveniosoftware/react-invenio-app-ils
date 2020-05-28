import React from 'react';
import PropTypes from 'prop-types';
import { fileApi, eItemApi } from '@api';

export const DownloadLink = ({ children, content, eitem, filename }) => (
  <a
    href={fileApi.downloadURL(eitem.bucket_id, filename)}
    onClick={() => eItemApi.fileDownloaded(eitem.pid, filename)}
  >
    {content || children || filename}
  </a>
);

DownloadLink.propTypes = {
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  eitem: PropTypes.object.isRequired,
  filename: PropTypes.string.isRequired,
};

DownloadLink.defaultProps = {
  content: null,
};
