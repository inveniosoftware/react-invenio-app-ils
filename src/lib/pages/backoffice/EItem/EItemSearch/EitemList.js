import { SearchEmptyResults } from '@modules/SearchControls';
import EItemListEntry from './EItemListEntry';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Item } from 'semantic-ui-react';

export default class EItemList extends Component {
  renderListEntry = eitem => {
    const { renderListEntryElement } = this.props;
    if (renderListEntryElement) {
      return renderListEntryElement(document);
    }
    return <EItemListEntry key={eitem.metadata.pid} eitem={eitem} />;
  };

  render() {
    const { hits } = this.props;

    if (!hits.length) return <SearchEmptyResults data-test="no-results" />;

    return (
      <Item.Group divided className={'bo-eitem-search'}>
        {hits.map(hit => {
          return this.renderListEntry(hit);
        })}
      </Item.Group>
    );
  }
}

EItemList.propTypes = {
  hits: PropTypes.array.isRequired,
  renderListEntryElement: PropTypes.func,
};

EItemList.defaultProps = {
  renderListEntryElement: null,
};
