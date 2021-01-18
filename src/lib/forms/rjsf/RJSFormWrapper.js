import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Container, Header, Segment } from 'semantic-ui-react';

export class RJSFormWrapper extends Component {
  render() {
    const { title, children } = this.props;

    return (
      <Container>
        <Header as="h3" attached="top">
          {title}
        </Header>
        <Segment attached>{children}</Segment>
      </Container>
    );
  }
}

RJSFormWrapper.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
};

RJSFormWrapper.defaultProps = {
  children: null,
};
