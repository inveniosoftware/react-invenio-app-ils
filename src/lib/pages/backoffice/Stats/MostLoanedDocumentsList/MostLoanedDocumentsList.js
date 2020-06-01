import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Qs from 'qs';
import { Grid, List, Header } from 'semantic-ui-react';
import { DatePicker, Loader, Error } from '@components';
import { BackOfficeRoutes } from '@routes/urls';
import { circulationStatsApi, loanApi } from '@api';
import { DocumentList } from '@modules/Document/backoffice/DocumentList';
import { ExportSearchResults } from '@components/backoffice';
import { invenioConfig } from '@config/invenioConfig';
import {
  DocumentListEntry,
  DocumentStats,
} from '@modules/Document/backoffice/DocumentList';

export default class MostLoanedDocumentsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fromDate: '',
      toDate: '',
    };
  }

  componentDidMount() {
    this.fetchDocuments();
  }

  get subtitle() {
    const { fromDate, toDate } = this.state;
    const { data } = this.props;
    const total = data.total;
    const msg = `Showing the ${total} most checked-out documents`;

    if (fromDate && toDate) {
      return `${msg} between ${fromDate} and ${toDate}.`;
    } else if (fromDate) {
      return `${msg} starting from ${fromDate}.`;
    } else if (toDate) {
      return `${msg} ending at ${toDate}.`;
    } else {
      return `${msg}.`;
    }
  }

  fetchDocuments() {
    const { fromDate, toDate } = this.state;
    const { fetchMostLoanedDocuments } = this.props;
    fetchMostLoanedDocuments(fromDate, toDate);
  }

  handleFromDateChange = value => {
    this.setState({ fromDate: value }, this.fetchDocuments);
  };

  handleToDateChange = value => {
    this.setState({ toDate: value }, this.fetchDocuments);
  };

  renderDateRangePicker() {
    const { fromDate, toDate } = this.state;

    return (
      <>
        <Header as="h3">
          Pick range of dates
          <Header.Subheader>
            Choose between which dates to search the most loaned documents
          </Header.Subheader>
        </Header>

        <List horizontal>
          <List.Item>
            <List.Content>
              <DatePicker
                maxDate={toDate}
                placeholder="From Date"
                handleDateChange={this.handleFromDateChange}
              />
            </List.Content>
          </List.Item>

          <List.Item>
            <List.Content>
              <DatePicker
                minDate={fromDate}
                placeholder="To Date"
                handleDateChange={this.handleToDateChange}
              />
            </List.Content>
          </List.Item>
        </List>
      </>
    );
  }

  renderHeader = () => {
    const { fromDate, toDate } = this.state;

    return (
      <Grid columns={2}>
        <Grid.Column>
          <Header as="h3">
            Most Loaned Documents
            <Header.Subheader>{this.subtitle}</Header.Subheader>
          </Header>
        </Grid.Column>
        <Grid.Column textAlign="right">
          <ExportSearchResults
            onExportClick={(format, size) => {
              // build params
              const params = circulationStatsApi.getMostLoanedDocumentsParams(
                fromDate,
                toDate,
                size,
                format
              );
              const args = Qs.stringify(params);
              // build final url
              const exportUrl = `${circulationStatsApi.mostLoanedUrl}?${args}`;
              // open in a new tab
              window.open(exportUrl, '_blank');
            }}
          />
        </Grid.Column>
      </Grid>
    );
  };

  createLoansUrl = (hit, fromDate, toDate) => {
    const query = loanApi
      .query()
      .withDocPid(hit.metadata.pid)
      .withStartDate({ fromDate, toDate })
      .withState(
        invenioConfig.circulation.loanActiveStates.concat(
          invenioConfig.circulation.loanCompletedStates
        )
      )
      .qs();
    return BackOfficeRoutes.loansListWithQuery(query);
  };

  renderListEntryElement = document => {
    return (
      <DocumentListEntry
        key={document.metadata.pid}
        document={document}
        renderMiddleColumn={doc => <DocumentStats metadata={doc.metadata} />}
      />
    );
  };

  render() {
    const { data, isLoading, error } = this.props;
    const { fromDate, toDate } = this.state;

    const hitsWithLinks = data.hits.map(hit => {
      hit.metadata.loan_count_url = this.createLoansUrl(hit, fromDate, toDate);
      return hit;
    });
    return (
      <Grid columns={1}>
        <Grid.Column>{this.renderDateRangePicker()}</Grid.Column>
        <Grid.Column>{this.renderHeader()}</Grid.Column>
        <Grid.Column>
          <Loader isLoading={isLoading}>
            <Error error={error}>
              <DocumentList
                hits={hitsWithLinks}
                renderListEntryElement={this.renderListEntryElement}
              />
            </Error>
          </Loader>
        </Grid.Column>
      </Grid>
    );
  }
}

MostLoanedDocumentsList.propTypes = {
  fetchMostLoanedDocuments: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  isLoading: PropTypes.bool,
  error: PropTypes.object,
};

MostLoanedDocumentsList.defaultProps = {
  isLoading: false,
  error: null,
};
