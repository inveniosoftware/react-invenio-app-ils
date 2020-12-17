import { withCancel } from '@api/utils';
import { Error } from '@components/Error';
import { Loader } from '@components/Loader';
import { DocumentCard } from '@modules/Document/DocumentCard';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Overridable from 'react-overridable';
import { Link } from 'react-router-dom';
import { Card, Divider, Header, Icon } from 'semantic-ui-react';

class DocumentCardGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      data: { hits: [] },
      error: {},
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  componentWillUnmount() {
    this.cancellableFetchStats && this.cancellableFetchStats.cancel();
  }

  fetchData = async () => {
    const { fetchDataMethod, fetchDataQuery } = this.props;
    this.setState({ isLoading: true });

    this.cancellableFetchStats = withCancel(fetchDataMethod(fetchDataQuery));
    try {
      const response = await this.cancellableFetchStats.promise;
      this.setState({ data: response.data, isLoading: false });
    } catch (error) {
      if (error !== 'UNMOUNTED') {
        this.setState({ error: error, isLoading: false });
      }
    }
  };

  renderCards() {
    const { data } = this.state;
    if (!data) return null;
    return data.hits.map((book) => {
      return <DocumentCard key={book.metadata.pid} data={book} />;
    });
  }

  render() {
    const { title, viewAllUrl, headerClass } = this.props;
    const { isLoading, error } = this.state;
    return (
      <Overridable id="DocumentCardGroup.layout" {...this.props}>
        <>
          <Header as="h2" className={headerClass}>
            {title}
          </Header>
          <Header.Subheader>
            <Link to={viewAllUrl}>
              VIEW ALL <Icon name="caret right" />
            </Link>
          </Header.Subheader>
          <Divider hidden />
          <Loader isLoading={isLoading}>
            <Error error={error}>
              <Card.Group stackable doubling centered itemsPerRow={5}>
                {this.renderCards()}
              </Card.Group>
            </Error>
          </Loader>
        </>
      </Overridable>
    );
  }
}

DocumentCardGroup.propTypes = {
  fetchDataMethod: PropTypes.func.isRequired,
  fetchDataQuery: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  viewAllUrl: PropTypes.string.isRequired,
  headerClass: PropTypes.string,
};

DocumentCardGroup.defaultProps = {
  headerClass: '',
};

export default Overridable.component('DocumentCardGroup', DocumentCardGroup);
