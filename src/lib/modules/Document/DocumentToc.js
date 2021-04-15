import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Overridable from 'react-overridable';
import { List } from 'semantic-ui-react';
import _isEmpty from 'lodash/isEmpty';

class DocumentToc extends Component {
  render() {
    const {
      metadata: { table_of_content: tableOfContent },
    } = this.props;
    if (_isEmpty(tableOfContent)) return 'No table of contents';
    return (
      <Overridable id="DocumentToc.layout" {...this.props}>
        <List ordered>
          {tableOfContent.map((entry) => (
            <List.Item key={entry}>{entry}</List.Item>
          ))}
        </List>
      </Overridable>
    );
  }
}

DocumentToc.propTypes = {
  metadata: PropTypes.object.isRequired,
};

export default Overridable.component('DocumentToc', DocumentToc);
