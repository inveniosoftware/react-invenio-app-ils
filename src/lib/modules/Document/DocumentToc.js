import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Overridable from 'react-overridable';
import { List } from 'semantic-ui-react';

class DocumentToc extends Component {
  render() {
    const { table_of_content } = this.props.document.metadata;
    return (
      <Overridable id="DocumentToc.layout" {...this.props}>
        <List ordered>
          {table_of_content.map((entry, index) => (
            <List.Item key={index}>{entry}</List.Item>
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
