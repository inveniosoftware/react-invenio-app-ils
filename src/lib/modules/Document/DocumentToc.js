import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Overridable from 'react-overridable';
import { List } from 'semantic-ui-react';

class DocumentToc extends Component {
  render() {
    const {
      document: {
        metadata: { table_of_content: tableOfContent },
      },
    } = this.props;
    return (
      <Overridable id="DocumentToc.layout" {...this.props}>
        <List ordered>
          {tableOfContent.map(entry => (
            <List.Item key={entry}>{entry}</List.Item>
          ))}
        </List>
      </Overridable>
    );
  }
}

DocumentToc.propTypes = {
  document: PropTypes.object.isRequired,
};

export default Overridable.component('DocumentToc', DocumentToc);
