import React, { Component } from 'react';
import {
  Form,
  Grid,
  Header,
  Icon,
  Popup,
  Segment,
  Table,
} from 'semantic-ui-react';
import { DatePicker, Loader, Error } from '@components';
import PropTypes from 'prop-types';
import sumBy from 'lodash/sumBy';

const DEFAULT_TITLE = 'for all time';

export default class DocumentStats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: DEFAULT_TITLE,
      fromDate: '',
      toDate: '',
    };
  }

  componentDidMount() {
    this._fetchDocumentStats();
  }

  renderStats() {
    const { isLoading, error, documentStats, documentDetails } = this.props;
    const renewalCount = sumBy(
      documentStats.hits,
      loan => loan.metadata.extension_count
    );
    const pastLoans = documentStats.total || 0;
    const itemsCount =
      documentDetails.metadata.circulation.can_circulate_items_count;
    const avgLoans = itemsCount ? (pastLoans / itemsCount).toFixed(1) : '-';

    return (
      <Loader isLoading={isLoading}>
        <Error error={error}>
          <Table basic="very" textAlign="right">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>past loans</Table.HeaderCell>
                <Table.HeaderCell>renewals</Table.HeaderCell>
                <Table.HeaderCell>
                  average{' '}
                  <Popup
                    position="top right"
                    content={`This average is computed with the number of past
                    loans on the selected range of dates, and the current number
                    of items (${itemsCount}) of the document.`}
                    trigger={<Icon name="info circle" size="small" />}
                  />
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>{pastLoans}</Table.Cell>
                <Table.Cell>{renewalCount}</Table.Cell>
                <Table.Cell data-test="cell-average">{avgLoans}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Error>
      </Loader>
    );
  }

  _fetchDocumentStats() {
    const { documentDetails, fetchDocumentStats } = this.props;
    const { fromDate, toDate } = this.state;
    this.buildTitle();
    fetchDocumentStats({
      documentPid: documentDetails.pid,
      fromDate: fromDate,
      toDate: toDate,
    });
  }

  handleFromDateChange = value => {
    this.setState({ fromDate: value }, this._fetchDocumentStats);
  };

  handleToDateChange = value => {
    this.setState({ toDate: value }, this._fetchDocumentStats);
  };

  buildTitle() {
    const { fromDate, toDate } = this.state;
    let title = '';
    if (fromDate) {
      title = `from ${fromDate}`;
    }
    if (toDate) {
      title = `${title} up to ${toDate}`;
    }
    if (!fromDate && !toDate) {
      title = DEFAULT_TITLE;
    }
    this.setState({ title: title });
  }

  renderFilters() {
    const { fromDate, toDate } = this.state;
    return (
      <>
        <Header as="h4" textAlign="left">
          Filters
        </Header>
        <Form>
          <Form.Field>
            <DatePicker
              maxDate={toDate}
              placeholder="To date"
              handleDateChange={this.handleFromDateChange}
            />
          </Form.Field>
          <Form.Field>
            <DatePicker
              minDate={fromDate}
              placeholder="From Date"
              handleDateChange={this.handleToDateChange}
            />
          </Form.Field>
        </Form>
      </>
    );
  }

  render() {
    const { title } = this.state;
    return (
      <Segment className="document-stats">
        <Header as="h3">
          Statistics <small>{title}</small>
        </Header>
        <Grid columns={2} divided>
          <Grid.Row stretched>
            <Grid.Column width={4} floated="left">
              {this.renderFilters()}
            </Grid.Column>
            <Grid.Column width={12} textAlign="right" floated="right">
              {this.renderStats()}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}

DocumentStats.propTypes = {
  documentStats: PropTypes.object.isRequired,
  documentDetails: PropTypes.object.isRequired,
  fetchDocumentStats: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  error: PropTypes.object,
};

DocumentStats.defaultProps = {
  isLoading: false,
  error: null,
};
