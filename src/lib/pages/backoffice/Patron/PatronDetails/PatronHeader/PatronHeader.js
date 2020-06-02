import { CopyButton } from '@components/CopyButton';
import { DetailsHeader } from '@components/backoffice';
import { PatronIcon } from '@components/backoffice/icons';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Header } from 'semantic-ui-react';

export default class PatronHeader extends Component {
  render() {
    const { data } = this.props;
    const recordInfo = (
      <>
        <label className="muted">Patron</label> {data.metadata.pid}{' '}
        <CopyButton text={data.metadata.id} />
        <br />
      </>
    );

    return (
      <DetailsHeader
        title={
          <>
            <Header.Subheader>{data.metadata.email}</Header.Subheader>
            {data.metadata.name}
          </>
        }
        subTitle=""
        pid={data.metadata.id}
        icon={<PatronIcon />}
        recordInfo={recordInfo}
      />
    );
  }
}

PatronHeader.propTypes = {
  data: PropTypes.object.isRequired,
};
