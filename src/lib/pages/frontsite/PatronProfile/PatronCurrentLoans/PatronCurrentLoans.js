import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Loader } from '@components/Loader';
import { Error } from '@components/Error';
import { Pagination } from '@components/Pagination';
import { Container, Header, Item } from 'semantic-ui-react';
import { ILSItemPlaceholder } from '@components/ILSPlaceholder/ILSPlaceholder';
import { InfoMessage } from '@components/InfoMessage';
import { LoanListEntry } from './LoanListEntry';
import _isEmpty from 'lodash/isEmpty';

const PAGE_SIZE = 5;

export default class PatronCurrentLoans extends Component {
  constructor(props) {
    super(props);
    this.state = { activePage: 1 };
  }

  componentDidMount() {
    const { patronPid, fetchPatronCurrentLoans } = this.props;
    const { activePage } = this.state;
    fetchPatronCurrentLoans(patronPid, {
      page: activePage,
      size: PAGE_SIZE,
    });
  }

  onPageChange = activePage => {
    const { patronPid, fetchPatronCurrentLoans } = this.props;
    fetchPatronCurrentLoans(patronPid, {
      page: activePage,
      size: PAGE_SIZE,
    });
    this.setState({ activePage: activePage });
  };

  paginationComponent = () => {
    const { isLoading, data } = this.props;
    const { activePage } = this.state;
    return (
      <Pagination
        currentPage={activePage}
        currentSize={PAGE_SIZE}
        loading={isLoading}
        onPageChange={this.onPageChange}
        totalResults={data.total}
      />
    );
  };

  renderList(data) {
    const { extendLoan, fetchPatronCurrentLoans, patronPid } = this.props;
    const { activePage } = this.state;

    if (!_isEmpty(data.hits)) {
      return (
        <>
          <Item.Group divided>
            {data.hits.map(entry => (
              <LoanListEntry
                key={entry.metadata.pid}
                loan={entry}
                extendLoan={extendLoan}
                onExtendSuccess={() => {
                  fetchPatronCurrentLoans(patronPid, {
                    page: activePage,
                    size: PAGE_SIZE,
                  });
                }}
              />
            ))}
          </Item.Group>
          <Container textAlign="center">{this.paginationComponent()}</Container>
        </>
      );
    }
    return (
      <InfoMessage
        title="No ongoing loans"
        message="You do not currently have any ongoing loan."
      />
    );
  }

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

  render() {
    const { data, isLoading, error } = this.props;
    return (
      <Container className="spaced">
        <Header
          as="h2"
          content="Your current loans"
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

PatronCurrentLoans.propTypes = {
  patronPid: PropTypes.string.isRequired,
  fetchPatronCurrentLoans: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.object.isRequired,
  extendLoan: PropTypes.func.isRequired,
  showMaxRows: PropTypes.number,
};
