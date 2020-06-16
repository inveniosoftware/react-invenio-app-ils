import { toShortDate } from '@api/date';
import { DetailsHeader } from '@components/backoffice/DetailsHeader';
import { DocumentIcon, ItemIcon } from '@components/backoffice/icons';
import { CopyButton } from '@components/CopyButton';
import DocumentAuthors from '@modules/Document/DocumentAuthors';
import LiteratureTitle from '@modules/Literature/LiteratureTitle';
import { BackOfficeRoutes } from '@routes/urls';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Header } from 'semantic-ui-react';

export class ItemHeader extends Component {
  render() {
    const { data } = this.props;
    const recordInfo = (
      <>
        <label className="muted">Physical copy</label> {data.metadata.pid}{' '}
        <CopyButton text={data.metadata.pid} />
        <br />
        <label className="muted">Created on</label> {toShortDate(data.created)}
        <br />
        <Link
          to={BackOfficeRoutes.documentDetailsFor(data.metadata.document_pid)}
        >
          see document <DocumentIcon />
        </Link>
      </>
    );
    return (
      <DetailsHeader
        title={
          <>
            <Header.Subheader>Medium: {data.metadata.medium}</Header.Subheader>
            {data.metadata.barcode}:{' '}
            <LiteratureTitle
              title={data.metadata.document.title}
              edition={data.metadata.document.edition}
              publicationYear={data.metadata.document.publication_year}
              showOnlyTitle
              truncate
            />
          </>
        }
        subTitle={
          <DocumentAuthors
            authors={data.metadata.document.authors}
            hasOtherAuthors={data.metadata.document.other_authors}
            prefix="by "
            limit={10}
          />
        }
        pid={data.metadata.pid}
        icon={<ItemIcon />}
        recordInfo={recordInfo}
      />
    );
  }
}

ItemHeader.propTypes = {
  data: PropTypes.object.isRequired,
};
