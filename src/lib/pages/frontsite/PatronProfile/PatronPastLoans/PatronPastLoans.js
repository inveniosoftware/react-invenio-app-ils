import { Error, Loader, Pagination } from '@components';
import { ILSItemPlaceholder } from '@components/ILSPlaceholder';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Container, Header, Item } from 'semantic-ui-react';
import { InfoMessage } from '@components';
import PastLoanListEntry from './PastLoanListEntry';

export default class PatronPastLoans extends Component {
  constructor(props) {
    super(props);
    this.state = { activePage: 1 };
  }

  componentDidMount() {
    const { fetchPatronPastLoans, patronPid } = this.props;

    fetchPatronPastLoans(patronPid);
  }

  onPageChange = activePage => {
    const { fetchPatronPastLoans, patronPid } = this.props;
    fetchPatronPastLoans(patronPid, { page: activePage });
    this.setState({ activePage: activePage });
  };

  paginationComponent = () => {
    const { activePage } = this.state;
    const { isLoading, data } = this.props;
    return (
      <Pagination
        currentPage={activePage}
        loading={isLoading}
        totalResults={data.total}
        onPageChange={this.onPageChange}
      />
    );
  };

  renderLoader = props => {
    return (
      <>
        <Item.Group>
          <ILSItemPlaceholder fluid {...props} />
          <ILSItemPlaceholder fluid {...props} />
        </Item.Group>
      </>
    );
  };

  renderList = data => {
    if (!isEmpty(data.hits)) {
      return (
        <>
          <Item.Group divided>
            {data.hits.map(entry => (
              <PastLoanListEntry key={entry.metadata.pid} loan={entry} />
            ))}
          </Item.Group>
          <Container textAlign="center">{this.paginationComponent()}</Container>
        </>
      );
    }
    return (
      <InfoMessage
        title="No past loans"
        message="You do not have any past loan."
      />
    );
  };

  render() {
    const { data, isLoading, error } = this.props;
    return (
      <Container className="spaced">
        <Header
          as="h2"
          content="Your past loans"
          className="highlight"
          textAlign="center"
        />
        <Loader isLoading={isLoading} renderElement={this.renderLoader}>
          <Error error={error}>{this.renderList(data)}</Error>
        </Loader>
      </Container>
    );
  }
}

PatronPastLoans.propTypes = {
  patronPid: PropTypes.string.isRequired,
  fetchPatronPastLoans: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.object,
};

PatronPastLoans.defaultProps = {
  error: {},
};
