import React from 'react';
import PropTypes from 'prop-types';
import { Item, Grid } from 'semantic-ui-react';
import _isEmpty from 'lodash/isEmpty';

const ReportDetailsLeftColumn = ({ report }) => {
  return (
    <>
      <Item.Description>
        <label>Created: </label>
        {!_isEmpty(report.created) ? 'Yes' : 'No'}
      </Item.Description>
      <Item.Description>
        <label>Updated: </label>
        {!_isEmpty(report.updated) ? 'Yes' : 'No'}
      </Item.Description>
    </>
  );
};

ReportDetailsLeftColumn.propTypes = {
  report: PropTypes.object.isRequired,
};

const ReportDetailsMiddleColumn = ({ report }) => {
  return (
    <>
      <Item.Description>
        <label>Ambiguous: </label>
        {!_isEmpty(report.ambiguous) ? report.ambiguous.map(e => e) : 'No'}
      </Item.Description>
      <Item.Description>
        <label>Fuzzy: </label>
        {!_isEmpty(report.fuzzy) ? report.fuzzy.map(e => e) : 'No'}
      </Item.Description>
    </>
  );
};

ReportDetailsMiddleColumn.propTypes = {
  report: PropTypes.object.isRequired,
};

const ReportDetailsRightColumn = ({ report }) => {
  return (
    <>
      <Item.Description>
        <label>Created eitem: </label>
        {!_isEmpty(report.created_eitem) ? report.created_eitem.pid : 'No'}
      </Item.Description>
      <Item.Description>
        <label>Updated eitem: </label>
        {!_isEmpty(report.updated_eitem) ? report.updated_eitem.pid : 'No'}
      </Item.Description>
      <Item.Description>
        <label>Deleted eitems: </label>
        {!_isEmpty(report.deleted_eitem_list)
          ? report.deleted_eitem_list.map(e => e)
          : 'No'}
      </Item.Description>
    </>
  );
};

ReportDetailsRightColumn.propTypes = {
  report: PropTypes.object.isRequired,
};

export class ReportDetails extends React.Component {
  render() {
    const { report } = this.props;
    return (
      <Item>
        <Item.Content>
          <Grid columns={3}>
            <Grid.Column>
              <ReportDetailsLeftColumn report={report} />
            </Grid.Column>
            <Grid.Column>
              <ReportDetailsMiddleColumn report={report} />
            </Grid.Column>
            <Grid.Column>
              <ReportDetailsRightColumn report={report} />
            </Grid.Column>
          </Grid>
        </Item.Content>
      </Item>
    );
  }
}

ReportDetails.propTypes = {
  report: PropTypes.object.isRequired,
};
