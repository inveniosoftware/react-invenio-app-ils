import { invenioConfig } from '@config';
import Qs from 'qs';
import React, { Component } from 'react';
import {
  InvenioRequestSerializer,
  withState as withSearchState,
} from 'react-searchkit';
import { Button, Dropdown, Icon, Menu, Popup } from 'semantic-ui-react';

interface FormatOption {
  key: string;
  text: string;
  value: string;
}

interface ExportDialogProps {
  onExportClick: (format: string, max: number) => void;
  max?: number;
}

interface ExportDialogState {
  currentFormat: string;
}

class ExportDialog extends Component<ExportDialogProps, ExportDialogState> {
  formatOptions: FormatOption[];

  static defaultProps = {
    max: invenioConfig.APP.EXPORT_MAX_RESULTS,
  };

  constructor(props: ExportDialogProps) {
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
    const { onExportClick, max } = this.props;
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
                    currentFormat: value as string,
                  });
                }}
              />
            </Menu>
          </span>
        </div>
        <br />
        <div>
          <span>Export is limited to the first {max} results.</span>
        </div>
        <br />
        <div style={{ textAlign: 'center' }}>
          <Button
            icon="download"
            primary
            content="Download"
            onClick={() => {
              onExportClick(currentFormat, max!);
            }}
          />
        </div>
      </Popup>
    );
  }
}

interface QueryState {
  [key: string]: any;
}

interface ExportSearchResultsWithStateProps {
  exportBaseUrl: string;
  currentQueryState: QueryState;
}

class ExportSearchResultsWithState extends Component<ExportSearchResultsWithStateProps> {
  onExportClick = (format: string, size: number) => {
    const { currentQueryState, exportBaseUrl } = this.props;
    const newQueryState = {
      ...currentQueryState,
      size: size,
    };

    const requestSerializer = new InvenioRequestSerializer();
    const queryString = requestSerializer.serialize(newQueryState);

    const params = Qs.parse(queryString);
    params['page'] = '1';
    params['format'] = format;
    const args = Qs.stringify(params);

    const exportUrl = `${exportBaseUrl}?${args}`;
    window.open(exportUrl, '_blank');
  };

  render() {
    const ExportDialogWithSearchState = withSearchState(ExportDialog);
    return <ExportDialogWithSearchState onExportClick={this.onExportClick} />;
  }
}

interface ExportReactSearchKitResultsProps {
  exportBaseUrl: string;
}

class ExportReactSearchKitResults extends Component<ExportReactSearchKitResultsProps> {
  render() {
    const { exportBaseUrl } = this.props;
    const CmpWithState = withSearchState(ExportSearchResultsWithState);
    return <CmpWithState exportBaseUrl={exportBaseUrl} />;
  }
}

interface ExportSearchResultsProps {
  onExportClick: (format: string, max: number) => void;
}

class ExportSearchResults extends Component<ExportSearchResultsProps> {
  render() {
    const { onExportClick } = this.props;
    return <ExportDialog onExportClick={onExportClick} />;
  }
}

export { ExportReactSearchKitResults, ExportSearchResults };
