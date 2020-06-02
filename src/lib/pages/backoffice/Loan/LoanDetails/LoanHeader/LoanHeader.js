import { toShortDate } from '@api/date';
import { CopyButton } from '@components/CopyButton';
import { DocumentAuthors } from '@modules/Document/DocumentTitle';
import { DocumentTitle } from '@modules/Document/DocumentAuthors';
import { getDisplayVal } from '@config/invenioConfig';
import { DetailsHeader } from '@components/backoffice/DetailsHeader';
import { DocumentDetailsLink } from '@components/backoffice/DocumentDetailsLink';
import { LoanIcon } from '@components/backoffice/LoanIcon';
import { PatronIcon } from '@components/backoffice/PatronIcon';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Header, Label } from 'semantic-ui-react';

export default class LoanHeader extends Component {
  render() {
    const { data } = this.props;

    const labels = (
      <div className="bo-details-header-status-labels">
        <Label basic color="blue">
          {getDisplayVal('circulation.statuses', data.metadata.state)}
        </Label>
        {data.metadata.is_overdue && <Label color="red">Overdue</Label>}
        {data.metadata.item_pid && data.metadata.item_pid.type === 'illbid' && (
          <Label basic color="teal">
            ILL
          </Label>
        )}
      </div>
    );

    const recordInfo = (
      <>
        <label className="muted">Loan</label> {data.metadata.pid}{' '}
        <CopyButton text={data.metadata.pid} />
        <br />
        <label className="muted">Created on</label> {toShortDate(data.created)}
      </>
    );
    return (
      <DetailsHeader
        title={
          <>
            <Header.Subheader>
              <PatronIcon />
              {data.metadata.patron.name}
            </Header.Subheader>
            Loan #{data.metadata.pid} {labels}
          </>
        }
        subTitle={
          <>
            on:{' '}
            <DocumentDetailsLink pidValue={data.metadata.document_pid}>
              {' '}
              <DocumentTitle metadata={data.metadata.document} />
            </DocumentDetailsLink>
            <DocumentAuthors
              metadata={data.metadata.document}
              prefix="by: "
              authorsLimit={10}
            />
          </>
        }
        icon={<LoanIcon />}
        recordInfo={recordInfo}
      />
    );
  }
}

LoanHeader.propTypes = {
  data: PropTypes.object.isRequired,
};
