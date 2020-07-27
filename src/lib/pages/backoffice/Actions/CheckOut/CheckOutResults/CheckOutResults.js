import { Loader } from '@components/Loader';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Icon, Header, Segment } from 'semantic-ui-react';
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
    const { itemList, isLoading, patronList, resultMessage } = this.props;
    const hasMoreThanOneItem = itemList.length > 1;
    const hasMoreThanOnePatrons = patronList.length > 1;

    return (
      <Loader isLoading={isLoading}>
        {hasMoreThanOnePatrons && <PatronList patrons={patronList} />}
        {hasMoreThanOneItem && <ItemList items={itemList} />}
        {!hasMoreThanOneItem && !hasMoreThanOnePatrons && (
          <Segment placeholder textAlign="center">
            <Header icon>
              <Icon name="search" />
              {resultMessage}
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
  resultMessage: PropTypes.string.isRequired,
  itemList: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool,
};

CheckOutResults.defaultProps = {
  patronList: [],
  itemList: [],
  isLoading: false,
};
