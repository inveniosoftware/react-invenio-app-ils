import { DeleteRecordModal } from '@components/backoffice/DeleteRecordModal';
import { EditButton } from '@components/backoffice/buttons/EditButton';
import {
  ScrollingMenu,
  ScrollingMenuItem,
} from '@components/backoffice/buttons/ScrollingMenu';
import { DeleteButton } from '@components/backoffice/DeleteRecordModal/DeleteButton';
import { UploadButton } from '../File';
import { BackOfficeRoutes } from '@routes/urls';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Divider } from 'semantic-ui-react';

export default class EItemActionMenu extends Component {
  deleteRecordButton = (props) => {
    return (
      <DeleteButton
        fluid
        content="Delete e-item"
        labelPosition="left"
        {...props}
      />
    );
  };

  render() {
    const { eitem, offset, deleteEItem } = this.props;

    return (
      <div className="bo-action-menu">
        <EditButton
          fluid
          to={BackOfficeRoutes.eitemEditFor(eitem.metadata.pid)}
        />
        <DeleteRecordModal
          trigger={this.deleteRecordButton}
          deleteHeader={`Are you sure you want to delete this e-item
            with PID ${eitem.metadata.pid}?`}
          onDelete={() => deleteEItem(eitem.metadata.pid)}
        />
        <Divider horizontal> Files </Divider>
        <UploadButton fluid />

        <Divider horizontal> Navigation </Divider>
        <ScrollingMenu offset={offset}>
          <ScrollingMenuItem label="Metadata" elementId="metadata" />
          <ScrollingMenuItem label="Files" elementId="eitem-files" />
        </ScrollingMenu>
      </div>
    );
  }
}

EItemActionMenu.propTypes = {
  eitem: PropTypes.object.isRequired,
  deleteEItem: PropTypes.func.isRequired,
  offset: PropTypes.number,
};

EItemActionMenu.defaultProps = {
  offset: 0,
};
