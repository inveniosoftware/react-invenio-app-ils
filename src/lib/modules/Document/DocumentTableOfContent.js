import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Divider, List } from 'semantic-ui-react';

export class DocumentTableOfContent extends Component {
  render() {
    const { abstract, toc } = this.props;

    return (
      <>
        <Divider horizontal>Table of Content</Divider>
        {!_isEmpty(toc) ? (
          <List ordered>
            {toc.map((entry) => (
              <List.Item key={entry}>
                <List.Content>{entry}</List.Content>
              </List.Item>
            ))}
          </List>
        ) : (
          'No table of content'
        )}
        <Divider horizontal>Abstract</Divider>
        {abstract ? abstract : 'No abstract'}
      </>
    );
  }
}

DocumentTableOfContent.propTypes = {
  toc: PropTypes.array,
  abstract: PropTypes.string,
};

DocumentTableOfContent.defaultProps = {
  toc: [],
  abstract: '',
};
