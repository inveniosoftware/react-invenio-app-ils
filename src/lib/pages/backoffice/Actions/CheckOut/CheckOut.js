import React, { Component } from 'react';
import { CheckOutSearch } from './CheckOutSearch';
import { CheckOutResults } from './CheckOutResults';
import { Header } from 'semantic-ui-react';

export class CheckOut extends Component {
  render() {
    return (
      <>
        <Header as="h2">Check-out physical copies</Header>
        <CheckOutSearch />
        <CheckOutResults />
      </>
    );
  }
}
