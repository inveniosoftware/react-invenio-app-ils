import SearchEmptyResults from '@modules/SearchControls/SearchEmptyResults';
import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Item } from 'semantic-ui-react';
import { LoanListEntry } from './LoanListEntry';

export default class LoanList extends Component {
  renderListEntry = loan => {
    const { renderListEntryElement, target } = this.props;
    if (renderListEntryElement) {
      return renderListEntryElement(loan);
    }
    return (
      <LoanListEntry target={target} key={loan.metadata.pid} loan={loan} />
    );
  };

  render() {
    const { hits } = this.props;
    return _isEmpty(hits) ? (
      <SearchEmptyResults />
    ) : (
      <Item.Group divided className="bo-loan-search">
        {hits.map(hit => this.renderListEntry(hit))}
      </Item.Group>
    );
  }
}

LoanList.propTypes = {
  hits: PropTypes.arrayOf(PropTypes.object),
  renderListEntryElement: PropTypes.func.isRequired,
  target: PropTypes.string,
};

LoanList.defaultProps = {
  hits: [],
  target: '',
};
