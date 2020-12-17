import React from 'react';
import { Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

export default class UploadButton extends React.Component {
  constructor(props) {
    super(props);
    this.filesRef = React.createRef();
  }

  onChange = (event) => {
    const file = this.filesRef.current.files[0];
    if (file) {
      this.onSelectFile(file);
    }
  };

  onSelectFile = async (file) => {
    const { uploadFile, files, sendErrorNotification, eitem } = this.props;
    if (files.length >= this.maxFiles) {
      sendErrorNotification(
        'Failed to upload file',
        `An e-item cannot have more than ${this.maxFiles} files.`
      );
    } else {
      const pid = eitem.pid;
      const bucket = eitem.metadata.bucket_id;
      await uploadFile(pid, bucket, file);
    }
  };

  render() {
    const { isFilesLoading, fluid } = this.props;
    return (
      <label htmlFor="upload">
        <Button
          primary
          disabled={isFilesLoading}
          loading={isFilesLoading}
          as="a"
          icon="cloud upload"
          content="Upload file"
          labelPosition="left"
          fluid={fluid}
        />
        <input
          hidden
          ref={this.filesRef}
          id="upload"
          type="file"
          onChange={this.onChange}
        />
      </label>
    );
  }
}

UploadButton.propTypes = {
  files: PropTypes.array,
  sendErrorNotification: PropTypes.func.isRequired,
  eitem: PropTypes.object.isRequired,
  uploadFile: PropTypes.func.isRequired,
  isFilesLoading: PropTypes.bool,
  fluid: PropTypes.bool,
};
