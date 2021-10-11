import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import { getStaticPageByName } from '@config';

export default class SearchGuideLink extends Component {
  render() {
    return (
      <Container textAlign="left">
        <Link to={getStaticPageByName('search-guide').route}>Search guide</Link>
      </Container>
    );
  }
}
