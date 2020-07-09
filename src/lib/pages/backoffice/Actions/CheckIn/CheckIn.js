import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';
import { ItemsSearch } from './ItemsSearch';
import { CheckedInItems } from './CheckedInItems';

export default class CheckIn extends Component {
  render() {
    return (
      <>
        <Header as="h2">Check-in physical copies</Header>
        <ItemsSearch />
        <CheckedInItems />
      </>
    );
  }
}
