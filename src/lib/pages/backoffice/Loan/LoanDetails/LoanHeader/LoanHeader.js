import { toShortDate } from '@api/date';
import { DocumentDetailsLink } from '@components/backoffice/buttons/ViewDetailsButtons/DocumentDetailsLink';
import { DetailsHeader } from '@components/backoffice/DetailsHeader';
import { LoanIcon, PatronIcon } from '@components/backoffice/icons';
import { CopyButton } from '@components/CopyButton';
import { getDisplayVal } from '@config';
import LiteratureTitle from '@modules/Literature/LiteratureTitle';
import { DateTime } from 'luxon';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Header, Label } from 'semantic-ui-react';

export default class LoanHeader extends Component {
  render() {
    const { data } = this.props;

    const labels = (
      <div className="bo-details-header-status-labels">
        <Label basic color="blue">
          {getDisplayVal('CIRCULATION.statuses', data.metadata.state)}
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
        <label className="muted">Created on</label>{' '}
        {toShortDate(DateTime.fromISO(data.created))}
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
              <LiteratureTitle
                title={data.metadata.document.title}
                edition={data.metadata.document.edition}
                publicationYear={data.metadata.document.publication_year}
              />
            </DocumentDetailsLink>
            by ${data.metadata.document.authors}
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
