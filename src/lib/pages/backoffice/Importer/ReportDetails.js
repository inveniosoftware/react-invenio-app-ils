import React from 'react';
import PropTypes from 'prop-types';
import { Item, Grid } from 'semantic-ui-react';
import _isEmpty from 'lodash/isEmpty';
import { Link } from 'react-router-dom';
import { BackOfficeRoutes } from '@routes/urls';

const displayLinkToDocument = (e, index = 0) => {
  return (
    <Link to={BackOfficeRoutes.documentDetailsFor(e)} target="_blank">
      {index > 0 ? ', ' + e : e}
    </Link>
  );
};

const displayLinkToEitem = (e, index = 0) => {
  return (
    <Link to={BackOfficeRoutes.eitemDetailsFor(e)} target="_blank">
      {index > 0 ? ', ' + e : e}
    </Link>
  );
};

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
      <Item.Description>
        <label>Series: </label>
        {!_isEmpty(report.series)
          ? report.series.map((e, index) => (
              <Link
                key={e.pid}
                to={BackOfficeRoutes.seriesDetailsFor(e.pid)}
                target="_blank"
              >
                {index > 0 ? ', ' + e.title : e.title}
              </Link>
            ))
          : 'No'}
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
        {!_isEmpty(report.ambiguous)
          ? report.ambiguous.map((e, index) => displayLinkToDocument(e, index))
          : 'No'}
      </Item.Description>
      <Item.Description>
        <label>Fuzzy: </label>
        {!_isEmpty(report.fuzzy)
          ? report.fuzzy.map((e, index) => displayLinkToDocument(e, index))
          : 'No'}
      </Item.Description>
      <Item.Description>
        <label>Ambiguous eitems: </label>
        {!_isEmpty(report.ambiguous_eitems_list)
          ? report.ambiguous_eitems_list.map((e, index) =>
              displayLinkToEitem(e, index)
            )
          : 'No'}
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
        {!_isEmpty(report.created_eitem)
          ? displayLinkToEitem(report.created_eitem.pid)
          : 'No'}
      </Item.Description>
      <Item.Description>
        <label>Updated eitem: </label>
        {!_isEmpty(report.updated_eitem)
          ? displayLinkToEitem(report.updated_eitem.pid)
          : 'No'}
      </Item.Description>
      <Item.Description>
        <label>Deleted eitems: </label>
        {!_isEmpty(report.deleted_eitem_list)
          ? report.deleted_eitem_list.map((e, index) =>
              displayLinkToEitem(e, index)
            )
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
