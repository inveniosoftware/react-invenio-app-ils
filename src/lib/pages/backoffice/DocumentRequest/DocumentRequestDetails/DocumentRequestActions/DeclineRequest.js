import { documentApi } from '@api/documents';
import { ESSelectorModal } from '@modules/ESSelector';
import { serializeDocument } from '@modules/ESSelector/serializer';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import React from 'react';
import { Confirm, Dropdown } from 'semantic-ui-react';

export class DeclineRequest extends React.Component {
  state = {
    header: null,
    type: null,
    confirmModalOpened: false,
  };

  onCancel = () => {
    this.setState({ confirmModalOpened: false });
  };

  onConfirm = (type) => {
    const { onDecline } = this.props;
    this.setState({ confirmModalOpened: false });
    onDecline({ decline_reason: type });
  };

  onDeclineWithDocument = (selections) => {
    const { onDecline } = this.props;

    onDecline({
      decline_reason: 'IN_CATALOG',
      document_pid: get(selections, '0.id'),
    });
  };

  onClick = (event, { text, value }) => {
    if (['USER_CANCEL', 'NOT_FOUND', 'OTHER'].includes(value)) {
      this.setState({
        header: text,
        type: value,
        confirmModalOpened: true,
      });
    } else {
      throw new Error(`Invalid decline type: ${value}`);
    }
  };

  renderOptions() {
    const options = [
      {
        key: 'USER_CANCEL',
        text: 'Cancelled by the user',
        value: 'USER_CANCEL',
        icon: 'user cancel',
      },
      {
        key: 'IN_CATALOG',
        text: 'Literature already in catalog',
        value: 'IN_CATALOG',
        icon: 'search',
      },
      {
        key: 'NOT_FOUND',
        text: 'Literature not found in any provider',
        value: 'NOT_FOUND',
        icon: 'minus',
      },
      {
        key: 'OTHER',
        text: 'Other reason',
        value: 'OTHER',
        icon: 'minus',
      },
    ];
    return options.map((option) => {
      const dropdown = <Dropdown.Item {...option} onClick={this.onClick} />;
      if (option.value === 'IN_CATALOG') {
        return (
          <ESSelectorModal
            key={option.value}
            trigger={dropdown}
            query={documentApi.list}
            serializer={serializeDocument}
            title="Decline request: already in the catalog"
            content="Select document already in catalog."
            emptySelectionInfoText="No literature selected"
            onSave={this.onDeclineWithDocument}
            saveButtonContent="Decline request"
          />
        );
      }
      return dropdown;
    });
  }

  render() {
    const { disabled } = this.props;
    const { header, confirmModalOpened, type } = this.state;
    return (
      <Dropdown
        button
        fluid
        labeled
        disabled={disabled}
        text="Decline request"
        icon="cancel"
        className="icon negative"
      >
        <Dropdown.Menu>
          <Confirm
            confirmButton="Decline request"
            content="Are you sure you want to decline this request?"
            header={`Decline: ${header}`}
            open={confirmModalOpened}
            onCancel={this.onCancel}
            onConfirm={() => this.onConfirm(type)}
          />
          <Dropdown.Header content="Specify a reason" />
          {this.renderOptions()}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

DeclineRequest.propTypes = {
  pid: PropTypes.string.isRequired,
  onDecline: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

DeclineRequest.defaultProps = {
  disabled: false,
};
