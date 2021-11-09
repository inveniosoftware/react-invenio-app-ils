import { invenioConfig } from '@config';
import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Grid, Header, Message, Table } from 'semantic-ui-react';
import ResultsTableBody from './ResultsTableBody';
import ResultsTableFooter from './ResultsTableFooter';
import ResultsTableHeader from './ResultsTableHeader';

export class ResultsTable extends Component {
  renderTable = () => {
    const {
      columns,
      currentPage,
      data,
      fixed,
      paginationComponent,
      seeAllComponent,
      showAllResults,
      singleLine,
      totalHitsCount,
      headerActionComponent,
      renderEmptyResultsElement,
      showMaxRows,
      showFooterSummary,
      ...tableProps
    } = this.props;

    return (
      <Table
        striped
        compact
        selectable
        unstackable
        fixed={fixed}
        singleLine={singleLine}
        {...tableProps}
      >
        <ResultsTableHeader columns={columns} />
        <ResultsTableBody
          columns={columns}
          rows={
            showAllResults
              ? data
              : data.slice(
                  (currentPage - 1) * showMaxRows,
                  currentPage * showMaxRows
                )
          }
        />
        <ResultsTableFooter
          allRowsNumber={totalHitsCount || data.length}
          showAllResults={showAllResults}
          showMaxRows={showMaxRows}
          seeAllComponent={seeAllComponent}
          currentPage={currentPage}
          paginationComponent={paginationComponent}
          columnsNumber={columns.length}
          showFooterSummary={showFooterSummary}
        />
      </Table>
    );
  };

  renderResultsOrEmpty() {
    const { data, name, renderEmptyResultsElement } = this.props;
    return data.length ? (
      this.renderTable()
    ) : renderEmptyResultsElement ? (
      renderEmptyResultsElement()
    ) : (
      <Message info icon data-test="no-results">
        <Message.Content>
          <Message.Header>No results found</Message.Header>
          There are no {name}.
        </Message.Content>
      </Message>
    );
  }

  renderHeader() {
    const { title, subtitle, headerActionComponent } = this.props;
    const header = title ? (
      <Header as="h3" content={title} subheader={subtitle} />
    ) : null;

    if (!(title || subtitle || !_isEmpty(headerActionComponent))) {
      return null;
    }
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column
            width={headerActionComponent ? 8 : 16}
            verticalAlign="middle"
          >
            {header}
          </Grid.Column>
          <Grid.Column width={8} textAlign="right">
            {headerActionComponent}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  render() {
    return (
      <>
        {this.renderHeader()}
        {this.renderResultsOrEmpty()}
      </>
    );
  }
}

ResultsTable.propTypes = {
  columns: PropTypes.array.isRequired,
  currentPage: PropTypes.number,
  data: PropTypes.array.isRequired,
  headerActionComponent: PropTypes.node,
  name: PropTypes.string,
  paginationComponent: PropTypes.node,
  seeAllComponent: PropTypes.node,
  showAllResults: PropTypes.bool,
  showMaxRows: PropTypes.number,
  singleLine: PropTypes.bool,
  subtitle: PropTypes.string,
  title: PropTypes.string,
  totalHitsCount: PropTypes.number,
  renderEmptyResultsElement: PropTypes.func,
  fixed: PropTypes.bool,
  showFooterSummary: PropTypes.bool,
};

ResultsTable.defaultProps = {
  currentPage: 1,
  headerActionComponent: null,
  paginationComponent: null,
  seeAllComponent: null,
  showAllResults: false,
  singleLine: true,
  subtitle: '',
  title: '',
  fixed: false,
  name: '',
  totalHitsCount: 0,
  showMaxRows: invenioConfig.APP.DEFAULT_RESULTS_SIZE,
  renderEmptyResultsElement: null,
  showFooterSummary: true,
};
