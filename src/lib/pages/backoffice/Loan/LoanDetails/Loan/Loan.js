import React, { Component } from 'react';
import { Header, Segment } from 'semantic-ui-react';
import { LoanMetadata } from '../LoanMetadata';

export default class Loan extends Component {
  render() {
    return (
      <>
        <Header as="h3" attached="top">
          Loan
        </Header>
        <Segment attached className="bo-metadata-segment" id="loan-metadata">
          <LoanMetadata />
        </Segment>
      </>
    );
  }
}
