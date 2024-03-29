import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon, Message } from 'semantic-ui-react';
import Qs from 'qs';
import { FrontSiteRoutes } from '@routes/urls';
import Overridable from 'react-overridable';
import { withState } from 'react-searchkit';
import PropTypes from 'prop-types';

class SearchMessage extends Component {
  onClickBookRequestLink = () => {
    const params = Qs.parse(window.location.search);
    const queryString = params['?q'];
    return {
      pathname: FrontSiteRoutes.documentRequestForm,
      state: { queryString },
    };
  };

  render() {
    const { currentResultsState } = this.props;
    const totalResults = currentResultsState.data.total;

    const requestFormLink = (
      <Link
        className={totalResults != 0 ? 'primary' : 'dark'}
        to={this.onClickBookRequestLink()}
      >
        this form
      </Link>
    );

    const EmptyResultOrangeMsg = () => (
      <Message icon color="orange" size="small">
        <Icon name="info circle" />
        <Overridable id="SearchResults.NoResults.extra">
          <Message.Content>
            <h4 className="search-no-results-extra">
              Please fill in {requestFormLink} to request new additions or
              purchases to the catalogue. (Login required)
            </h4>
          </Message.Content>
        </Overridable>
      </Message>
    );
    const ResultBlueMsg = () => (
      <Message icon info>
        <Icon name="info circle" />
        <Overridable id="SearchResults.NoResults.extra">
          <Message.Content>
            <Message.Header>
              Couldn't find the literature you were looking for?
            </Message.Header>
            Please fill in {requestFormLink} to request new additions or
            purchases to the catalogue. (Login required)
          </Message.Content>
        </Overridable>
      </Message>
    );

    return totalResults > 0 ? <ResultBlueMsg /> : <EmptyResultOrangeMsg />;
  }
}

SearchMessage.propTypes = {
  currentResultsState: PropTypes.object.isRequired,
};

export default withState(SearchMessage);
