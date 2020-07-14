import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Qs from 'qs';
import { Button, Popup, Dropdown, Menu, Icon } from 'semantic-ui-react';
import {
  InvenioRequestSerializer,
  withState as withSearchState,
} from 'react-searchkit';
import { invenioConfig } from '@config';

/** Simple component rendering a small dialog to choose format of results to export. */
class ExportDialog extends Component {
  constructor(props) {
    super(props);
    this.formatOptions = [
      {
        key: 'csv',
        text: 'CSV',
        value: 'csv',
      },
      {
        key: 'json',
        text: 'JSON',
        value: 'json',
      },
    ];

    this.state = {
      currentFormat: this.formatOptions[0].value,
    };
  }

  render() {
    const {
      onExportClick,
      max = invenioConfig.APP.MAX_RESULTS_WINDOW,
    } = this.props;
    const { currentFormat } = this.state;
    return (
      <Popup
        trigger={
          <Button primary icon size="small" labelPosition="left">
            <Icon name="download" />
            Export results to a file
          </Button>
        }
        flowing
        on="click"
        position="top right"
      >
        <div>
          <span>
            Format{' '}
            <Menu compact>
              <Dropdown
                simple
                item
                options={this.formatOptions}
                defaultValue={this.formatOptions[0].value}
                onChange={(e, { value }) => {
                  this.setState({
                    currentFormat: value,
                  });
                }}
              />
            </Menu>
          </span>
        </div>
        <br />
        <div>
          <span>Only the first {max} results will be exported.</span>
        </div>
        <br />
        <div style={{ textAlign: 'center' }}>
          <Button
            icon="download"
            primary
            content="Download"
            onClick={() => {
              onExportClick(currentFormat, max);
            }}
          />
        </div>
      </Popup>
    );
  }
}

ExportDialog.propTypes = {
  onExportClick: PropTypes.func.isRequired,
  max: PropTypes.number,
};

/** Wrapper component to export search results retrieved using ReactSearchKit */
class ExportSearchResultsWithState extends Component {
  onExportClick = (format, size) => {
    const { currentQueryState, exportBaseUrl } = this.props;
    const newQueryState = {
      ...currentQueryState,
      size: size,
    };

    const requestSerializer = new InvenioRequestSerializer();
    const queryString = requestSerializer.serialize(newQueryState);

    // append the `format` param
    const params = Qs.parse(queryString);
    params['format'] = format;
    const args = Qs.stringify(params);

    // build the final url
    const exportUrl = `${exportBaseUrl}?${args}`;
    // open in a new tab
    window.open(exportUrl, '_blank');
  };

  render() {
    const ExportDialogWithSearchState = withSearchState(ExportDialog);
    return <ExportDialogWithSearchState onExportClick={this.onExportClick} />;
  }
}

ExportSearchResultsWithState.propTypes = {
  exportBaseUrl: PropTypes.string.isRequired,
  currentQueryState: PropTypes.object.isRequired,
};

/** Wrapper component to export search results retrieved using ReactSearchKit and injecting its state */
class ExportReactSearchKitResults extends Component {
  render() {
    const { exportBaseUrl } = this.props;
    const CmpWithState = withSearchState(ExportSearchResultsWithState);
    return <CmpWithState exportBaseUrl={exportBaseUrl} />;
  }
}

ExportReactSearchKitResults.propTypes = {
  exportBaseUrl: PropTypes.string.isRequired,
};

/** Wrapper component to export search results retrieved with custom backend APIs */
class ExportSearchResults extends Component {
  render() {
    const { onExportClick } = this.props;
    return <ExportDialog onExportClick={onExportClick} />;
  }
}

ExportSearchResults.propTypes = {
  onExportClick: PropTypes.func.isRequired,
};

export { ExportReactSearchKitResults, ExportSearchResults };
