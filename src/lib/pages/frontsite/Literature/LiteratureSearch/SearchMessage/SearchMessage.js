import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon, Message } from 'semantic-ui-react';
import Qs from 'qs';
import { FrontSiteRoutes } from '@routes/urls';
import Overridable from 'react-overridable';

export default class SearchMessage extends Component {
  onClickBookRequestLink = () => {
    const params = Qs.parse(window.location.search);
    const queryString = params['?q'];
    return {
      pathname: FrontSiteRoutes.documentRequestForm,
      state: { queryString },
    };
  };

  render() {
    const requestFormLink = (
      <Link className="primary" to={this.onClickBookRequestLink()}>
        request form
      </Link>
    );
    return (
      <Message icon info>
        <Icon name="info circle" />
        <Overridable id="SearchMessage.content">
          <Message.Content>
            <Message.Header>
              Couldn't find the literature you were looking for?
            </Message.Header>
            Please fill in the {requestFormLink} to request new literature from
            the library. (Login required)
          </Message.Content>
        </Overridable>
      </Message>
    );
  }
}
