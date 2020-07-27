import { Loader } from '@components/Loader';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Header, Segment } from 'semantic-ui-react';
import { ItemList } from './ItemList';
import { PatronList } from './PatronList';

export default class CheckOutResults extends Component {
  componentDidMount() {
    const { clearResults } = this.props;
    clearResults();
  }

  /**
   * NOTE: In case there is only one result in itemList or patronList we will be
   * redirected to the relevant details page. If we have more than one result
   * (exceptional case) we display them so librarian can choose.
   */
  render() {
    const { itemList, isLoading, patronList } = this.props;
    const hasMoreThanOneItem = itemList.length > 1;
    const hasPatrons = patronList.length > 1;
    const hasResults = hasMoreThanOneItem || hasPatrons;

    return (
      <Loader isLoading={isLoading}>
        {hasPatrons && <PatronList patrons={patronList} />}
        {hasMoreThanOneItem && <ItemList items={itemList} />}
        {!hasResults && (
          <Segment placeholder>
            <Header textAlign="center">
              Insert patron id/email or physical copy barcode
            </Header>
          </Segment>
        )}
      </Loader>
    );
  }
}

CheckOutResults.propTypes = {
  clearResults: PropTypes.func.isRequired,
  patronList: PropTypes.arrayOf(PropTypes.object),
  itemList: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool,
};

CheckOutResults.defaultProps = {
  patronList: [],
  itemList: [],
  isLoading: false,
};
